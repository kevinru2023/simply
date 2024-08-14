import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, ChangeEvent } from "react";
import { socket } from "@/socket";
import { useNavigate } from "react-router-dom";

//im going to be honest this was my first go at creating a form to submit into a backend.
//this could have been way more simplifyed just using a form component, but naw im complicated like that and most of this shit was gpt

// Types for the props
interface FormCardProps {
  onQuit: () => void;
}

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface NumInputFieldProps {
  label: string;
  placeholder: string;
  value: number | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Functions for the components
function InputField({ label, placeholder, value, onChange }: InputFieldProps) {
  return (
    <div className="pb-4">
      <h6 className="flex justify-start text-white text-lg pb-2">{label}</h6>
      <input
        placeholder={placeholder}
        name={label}
        className="flex grow rounded-md w-full text-black indent-4 py-2 text-lg focus:outline-none focus:ring focus:ring-customLightGray"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function NumInputField({
  label,
  placeholder,
  value,
  onChange,
}: NumInputFieldProps) {
  return (
    <div className="pb-4">
      <h6 className="flex justify-start text-white text-lg pb-2">{label}</h6>
      <input
        type="password"
        placeholder={placeholder}
        name={label}
        className="flex grow rounded-md w-full text-black indent-4 py-2 text-lg focus:outline-none focus:ring focus:ring-customLightGray"
        value={value !== null ? value : ""}
        onChange={onChange}
      />
    </div>
  );
}

export function JoinForm({ onQuit }: FormCardProps) {
  //want to keep track of the changes for these for handling submissions of forms. <-- this was before I had more experience with react, most of these usestates are pointless but fuuckit.
  const [displayName, setdisplayName] = useState<string>("");
  const [roomName, setroomName] = useState<string>("");
  const [roomPass, setroomPass] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleRoomPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setroomPass(value === "" ? null : Number(value));
  };

  const handleJoin = () => {
    const queryParams = new URLSearchParams({
      displayName: displayName,
      roomName: roomName,
      roomPass: roomPass !== null ? roomPass.toString() : "",
    }).toString();

    fetch(`http://localhost:3000/joinroom?${queryParams}`).then((res) =>{
      if(!res.ok){
        res.text().then((text) => {
          console.log(text); // Log the response text
        });
      }else{
        socket.emit("joinRoom", roomName); 
        navigate('/room'); 
        sessionStorage.setItem('userName', displayName); 
        sessionStorage.setItem('roomName', roomName); 
      }
    })
  };

  return (
    <div className="flex-auto flex justify-center items-center animate-slide-and-fade-in absolute inset-0 p-4">
      <Card className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl rounded-lg bg-formBlue border-formBlue shadow-lg p-6">
        <CardHeader>
          <CardTitle className="flex justify-start text-white text-2xl">
            Join Room
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-col justify-start grow">
          <InputField
            placeholder="Display Name"
            label="Display Name"
            value={displayName}
            onChange={(e) => setdisplayName(e.target.value)}
          />
          <InputField
            placeholder="Room Name"
            label="Room Name"
            value={roomName}
            onChange={(e) => setroomName(e.target.value)}
          />
          <NumInputField
            placeholder="Join Code"
            label="Room Code"
            value={roomPass}
            onChange={handleRoomPassChange}
          />
        </CardContent>
        <CardFooter className="space-x-4 justify-end">
          <Button
            className="bg-customRed hover:bg-customRedHover text-lg shadow-lg px-6 py-2"
            onClick={onQuit}
          >
            Cancel
          </Button>
          <Button className="bg-customBlueButton hover:bg-customBlueButtonHover text-lg shadow-lg px-6 py-2"
          onClick={handleJoin}
          >
            Join Room
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function HostForm({ onQuit }: FormCardProps) {
  const [displayName, setdisplayName] = useState<string>("");
  const [roomName, setroomName] = useState<string>("");
  const navigate = useNavigate(); 

  const hostRoom = () => { 
    const qParams = new URLSearchParams({
      displayName: displayName, 
      roomName: roomName 
    }).toString(); 

    fetch(`http://localhost:3000/createroom?${qParams}`).then((res) => { //this could probably get refactored at some point
      if(!res.ok){
        res.text().then((text) => {
          console.log(text); 
        })
      }else{
        socket.emit("joinRoom", roomName); 
        navigate('/room'); 
        sessionStorage.setItem('userName', displayName); 
        sessionStorage.setItem('roomName', roomName); 
      }
    })
  }; 

  return (
    <div className="flex-auto flex justify-center items-center animate-slide-and-fade-in absolute inset-0 p-4">
      <Card className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl rounded-lg bg-formBlue border-formBlue shadow-lg p-6">
        <CardHeader>
          <CardTitle className="flex justify-start text-white text-2xl">
            Host Room
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-col justify-start grow">
          <InputField
            placeholder="Display Name"
            label="Display Name"
            value={displayName}
            onChange={(e) => setdisplayName(e.target.value)}
          />
          <InputField
            placeholder="Room Name"
            label="Room Name"
            value={roomName}
            onChange={(e) => setroomName(e.target.value)}
          />
        </CardContent>
        <CardFooter className="space-x-4 justify-end">
          <Button
            className="bg-customRed hover:bg-customRedHover text-lg shadow-lg px-6 py-2"
            onClick={onQuit}
          >
            Cancel
          </Button>
          <Button className="bg-customBlueButton hover:bg-customBlueButtonHover text-lg shadow-lg px-6 py-2"
            onClick={hostRoom}
          >
            Host Room
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
