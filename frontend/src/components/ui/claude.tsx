import React, { useState, useEffect, useRef } from 'react';
import { Peer, PeerOptions } from 'peerjs';
import { socket } from '@/socket';

export default function VideoComponentClaude() {
  const [peers, setPeers] = useState<string[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const peerRef = useRef<Peer | null>(null);
  const streamsRef = useRef<{ [key: string]: MediaStream }>({});

  const opts: PeerOptions = {
    host: 'localhost',
    port: 9000,
    path: '/peerserver'
  };

  useEffect(() => {
    const initializePeer = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);

        const peer = new Peer(opts);
        peerRef.current = peer;

        peer.on('open', (id) => {
          console.log('My peer ID is: ' + id);
          socket.emit('peerJoin', id);
        });

        peer.on('call', handleIncomingCall);

        socket.on('existingPeers', (existingPeers: string[]) => {
          setPeers(existingPeers);
          existingPeers.forEach((peerId) => {
            connectToPeer(peerId, stream);
          });
        });

        socket.on('newPeer', (newPeerId: string) => {
          setPeers((prevPeers) => [...prevPeers, newPeerId]);
          connectToPeer(newPeerId, stream);
        });

        return () => {
          stream.getTracks().forEach(track => track.stop());
          peer.destroy();
        };
      } catch (error) {
        console.error('Error setting up peer connection:', error);
      }
    };

    initializePeer();
  }, []);

  const handleIncomingCall = (call: any) => {
    if (localStream) {
      call.answer(localStream);
      call.on('stream', (remoteStream: MediaStream) => {
        streamsRef.current[call.peer] = remoteStream;
        setPeers((prevPeers) => [...prevPeers]);
      });
    }
  };

  const connectToPeer = (peerId: string, stream: MediaStream) => {
    if (peerRef.current) {
      const call = peerRef.current.call(peerId, stream);
      call.on('stream', (remoteStream: MediaStream) => {
        streamsRef.current[peerId] = remoteStream;
        setPeers((prevPeers) => [...prevPeers]);
      });
    }
  };

  return (
    <div>
      <video autoPlay muted ref={(video) => {
        if (video && localStream) video.srcObject = localStream;
      }} />
      {peers.map((peerId) => (
        <video key={peerId} autoPlay ref={(video) => {
          if (video && streamsRef.current[peerId]) video.srcObject = streamsRef.current[peerId];
        }} />
      ))}
    </div>
  );
}
