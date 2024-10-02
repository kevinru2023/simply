import { Peer, PeerOptions } from 'peerjs';
import { useEffect } from 'react';

export default function VideoComponent() {

  const opts: PeerOptions = {
    host: 'localhost',
    port: 9000,
    path: '/peerserver'
  };

  let peer = new Peer(opts);

  useEffect(() => {

    peer.on('open', function (id) {
      console.log('my peer ID is: ' + id);
    });

    // peer.on('disconnected', function(){
    //   console.log('dissonnected'); 
    // });
    //
  }, []);

  return (
    <h1>VideoComponent</h1>
  );
}
