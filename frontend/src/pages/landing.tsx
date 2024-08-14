import { useState } from "react";
import { Button } from "../components/ui/button";
import { JoinForm, HostForm } from "../components/ui/formcards";
//import Peer from "peerjs"; 
import "../App.css";

export default function LandingPage() {
  const [joinFormVisible, setJoinFormVisible] = useState(false);
  const [hostFormVisible, setHostFormVisible] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen bg-[url('./assets/mountains.svg')] bg-100 bg-bottom bg-no-repeat">
      <div>
        {joinFormVisible && (
          <JoinForm onQuit={() => setJoinFormVisible(false)} />
        )}
      </div>

      <div>
        {hostFormVisible && (
          <HostForm onQuit={() => setHostFormVisible(false)} />
        )}
      </div>

      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-white text-5xl font-bold">Simply</h1>
        <p className="text-white text-pretty text-center w-2/3">
          No sign up, no download, simply host or join video calls in your web
          browser
        </p>
        <Button
          className="bg-customBlue hover:bg-customBlueHover shadow-md rounded-md w-1/4"
          onClick={() => {
            setJoinFormVisible(true);
            setHostFormVisible(false);
          }}
        >
          Join Room
        </Button>

        <Button
          className="bg-customBlue hover:bg-customBlueHover shadow-md rounded-md w-1/4"
          onClick={() => {
            setHostFormVisible(true);
            setJoinFormVisible(false);
          }}
        >
          Host Room
        </Button>
      </div>
    </div>
  );
}

