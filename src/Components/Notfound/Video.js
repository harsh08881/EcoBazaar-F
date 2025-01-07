import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [socket, setSocket] = useState(null);
  const [callActive, setCallActive] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const socket = io("https://vodeo-b.vercel.app"); // Replace with your backend URL
    setSocket(socket);

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, []);

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate });
      }
    };

    // Handle remote stream
    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    setPeerConnection(pc);
    return pc;
  };

  const startCall = async () => {
    const pc = createPeerConnection();

    // Get local media stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = stream;

    // Add local tracks to peer connection
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    // Create offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Send offer to the server
    socket.emit("offer", { offer });
    setCallActive(true);

    // Handle incoming messages
    socket.on("answer", async ({ answer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });
  };

  const joinCall = async () => {
    const pc = createPeerConnection();

    // Get local media stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = stream;

    // Add local tracks to peer connection
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    setCallActive(true);

    // Handle incoming messages
    socket.on("offer", async ({ offer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // Send answer back to the server
      socket.emit("answer", { answer });
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted style={{ width: "300px" }} />
      <video ref={remoteVideoRef} autoPlay style={{ width: "300px" }} />
      {!callActive ? (
        <>
          <button onClick={startCall}>Start Call</button>
          <button onClick={joinCall}>Join Call</button>
        </>
      ) : (
        <p>Call in progress...</p>
      )}
    </div>
  );
};

export default VideoCall;
