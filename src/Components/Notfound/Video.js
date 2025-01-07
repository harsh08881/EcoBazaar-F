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
    const socket = io("https://vodeo-b-production.up.railway.app/"); // Replace with your backend URL
    setSocket(socket);

    // Listen for ICE candidates
    socket.on("ice-candidate", async ({ candidate }) => {
      if (candidate && peerConnection) {
        try {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (error) {
          console.error("Error adding received ICE candidate", error);
        }
      }
    });

    return () => {
      socket.disconnect();
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, [peerConnection]);

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

    // Handle answer from remote user
    socket.on("answer", async ({ answer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
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

    // Handle offer from the caller
    socket.on("offer", async ({ offer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // Send answer back to the server
      socket.emit("answer", { answer });
    });
  };

  return (
    <div>
      <div>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          style={{ width: "300px", border: "1px solid black" }}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          style={{ width: "300px", border: "1px solid black" }}
        />
      </div>
      {!callActive ? (
        <div>
          <button onClick={startCall}>Start Call</button>
          <button onClick={joinCall}>Join Call</button>
        </div>
      ) : (
        <p>Call in progress...</p>
      )}
    </div>
  );
};

export default VideoCall;
