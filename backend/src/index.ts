import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PeerServer } from "peer";
import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Schemas for DB, defining the structure of stored data

const messageSchema = new Schema({
  userName: String,
  message: String,
  timeStamp: Date,
})

const roomSchema = new Schema({
  roomName: String,
  roomPass: Number,
  connections: [String], //this will be a list of peer ids
  messages: [messageSchema],
  users: [String],
  createdAt: Date,
});

// Express app for handling non-PeerServer requests
const app: Express = express();
const http = createServer(app);
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

// Socket.IO server for real-time communication
const io = new Server(http, {
  connectionStateRecovery: {},
  cors: {
    origin: process.env.FRONTEND_ORIGIN as string,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// PeerServer for handling video feed and possibly chat messages
const peerPort: number = parseInt(process.env.PEER_PORT as string, 10) || 9000;
const peerServer = PeerServer({
  port: peerPort,
  path: "/peerserver",
});

const SimplyRoom = model("Room", roomSchema);

app.use(
  cors({
    origin: [process.env.FRONTEND_ORIGIN as string],
    credentials: true,
  })
);

// Initialize the app and connect to the database
async function init() {
  try {
    await mongoose.connect(process.env.MONGO_DB as string);
    console.log("Database connected");

    http.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

// Route for creating a room
app.get("/createroom", async (req: Request, res: Response) => {
  const rname = req.query.roomName as string;
  const uname = req.query.displayName as string;

  if (!rname || !uname) {
    return res.status(400).json({
      success: false,
      message: "Username and room name must be provided",
    });
  }

  const roomExists = await SimplyRoom.exists({ roomName: rname });

  if (roomExists) {
    return res
      .status(400)
      .json({ success: false, message: "Room with name already exists" });
  } else {
    const rpass: number = Math.floor(1000 + Math.random() * 9000);
    const newRoom = new SimplyRoom({
      roomName: rname,
      roomPass: rpass,
      connections: [],
      messages: [],
      users: [uname],
      createdAt: new Date(),
    });

    await newRoom.save();
    return res
      .status(201)
      .json({ success: true, message: "Room created", roomName: rname, roomPass: rpass });
  }
});

app.get("/joinroom", async (req: Request, res: Response) => {
  const rname: string = req.query.roomName as string;
  const rpass: number = parseInt(req.query.roomPass as string);
  const uname: string = req.query.displayName as string;

  //if one of the fields is missing
  if (!rname || !rpass || !uname) {
    return res.status(400).json({
      success: false,
      message: "One of the required fields is missing or is incorrect!",
    });
  }

  const room = await SimplyRoom.findOne({ roomName: rname, roomPass: rpass });

  //if the room doesn't exist
  if (!room) {
    return res.status(404).json({
      sucess: false,
      message: "Incorrect room name or password",
    });
  }

  //check if the username is already in the room. 
  if (room.users.find((i) => i.toLowerCase() === uname.toLowerCase())) {
    return res.status(418).json({
      success: false,
      message: "Username already used, please choose a different username",
    });
  }

  //add the username to the room and update the associated mongodb doc
  room.users.push(uname);
  await room.save();

  return res.status(200).json({
    success: true,
    message: "joined roomed succesfully!",
  });
});

//io can be thought of as starting the 'server', whilst anyocket.on can be thought of as making a get request
//i found this analogy really useful when first starting out

//also this only gets called after joinroom hence no need for validation 
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  // Listen for the client emitting 'joinRoom' event after successful room join
  socket.on("joinRoom", async (roomName: string) => {
    socket.join(roomName);

    const room = await SimplyRoom.findOne({ roomName: roomName });

    const updateRoom = async (update: any) => {
      SimplyRoom.findOneAndUpdate({ roomName }, update, { new: true });
    }; //function to make db operations easier  

    io.to(roomName).emit("userJoined", socket.id); // Notify room members

    socket.on("peerJoin", async (peerId: String) => {
      await updateRoom({ $push: { connections: peerId } });
      io.to(roomName).emit('peerJoin', peerId);
    });

    socket.on("chat message", async (userName: string, msg: string) => {
      const tstamp: Date = new Date();

      const msgObj = { //note order of this matters because it will be interperted by mongoose db
        userName: userName,
        message: msg,
        timeStamp: tstamp,
      };
      await updateRoom({ $push: { messages: msgObj } });
      io.to(roomName).emit("chat message", msgObj); // Broadcast message to room 
    });

    socket.emit("existingPeers", room!.connections);

  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

init();
