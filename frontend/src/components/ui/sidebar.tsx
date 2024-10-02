import { Button } from "./button";
import { useState, useEffect } from "react";
import { socket } from "@/socket";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

type Message = {
  userName: string;
  message: string;
  timeStamp: Date;
};

//props are weird man 
const TextBubble = ({ messages }: { messages: Message[] }) => {
  const getAvatarUrl = (avatar_username: string) => `https://ui-avatars.com/api/?name=${avatar_username}&background=random`;

  return (
    <>
      {messages.map((message, index) => (
        <li className="flex flex-row gap-6 pb-2" key={index}>
          <Avatar>
            <AvatarImage src={getAvatarUrl(message.userName)}></AvatarImage>
          </Avatar>
          <Card className="grow-0 basis-7/12 bg-customChatBubbleBack border-customChatBubbleBack">
            <CardHeader className="pb-0 pt-1">
              <CardDescription>{message.userName}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-1 text-white">
              <p>{message.message}</p>
            </CardContent>
          </Card>
          <em className="text-gray-500 text-xs">{new Date(message.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</em>
        </li>
      ))}
    </>
  );
};



export default function SideBar() {
  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]); //this should be useEffect or otherwise we get constant rerender 
  const username: string = sessionStorage.getItem("userName")!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (msg) {
      socket.emit("chat message", username, msg);
      setMsg("");
    }
  };

  useEffect(() => {
    //pushes messages to an array for mapping 
    const handleMessage = (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("chat message", handleMessage);

    //event listener cleanup 
    return () => {
      socket.off("chat message", handleMessage);
    };
  }, []);

  return (
    <div className="flex flex-col text-white">
      <Accordion className="pb-2" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Chat</AccordionTrigger>
          <AccordionContent className="pb-1">
            <h1>Pin: {sessionStorage.getItem('roomPass')}</h1>
            <ScrollArea className="bg-customChatBack h-96 w-96">
              <div className="w-96 inline-block text-wrap break-words">
                <ul>{TextBubble({ messages })}</ul>
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center textarea-container">
          <textarea
            className="bg-customDarkGray shadow-md text-left resize-none rounded-full w-96 h-12 pl-6 pt-3 pb-3 overflow-x-hidden overflow-y-hidden focus:outline-none focus:ring focus:ring-customDarkGraySelect textarea-with-button"
            rows={2}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type Something..."
            required={true}
          ></textarea>
          <Button
            type="submit"
            className="absolute top-0 right-0 h-full w-12 rounded-full bg-customBlueButton hover:bg-customBlueButtonHover"
          >
            <svg
              viewBox="0 0 203 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="scale(1.5)"
            >
              <path
                d="M61.6667 51.5808L132.417 28.4837C164.167 18.1185 181.417 35.0945 170.917 66.1899L147.333 135.481C131.5 182.083 105.5 182.083 89.6667 135.481L82.6667 114.914L61.6667 108.058C14.0833 92.5515 14.0833 67.1692 61.6667 51.5808Z"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M84.25 111.405L114.083 82.1048"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </form>
      <button></button>
    </div>
  );
}
