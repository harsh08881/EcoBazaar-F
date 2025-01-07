import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Initialize the socket connection
    const socketInstance = io("https://vodeo-b-production.up.railway.app"); // Replace with your backend URL
    setSocket(socketInstance);

    // Listen for incoming messages
    socketInstance.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup on component unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && username.trim()) {
      const data = { username, message };
      socket.emit("send-message", data); // Send message to server
      setMessages((prev) => [...prev, data]); // Update local message list
      setMessage(""); // Clear input field
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      {!username ? (
        <div>
          <h3>Enter your username</h3>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button
            onClick={() => setUsername(username.trim())}
            style={{ width: "100%", padding: "10px" }}
          >
            Set Username
          </button>
        </div>
      ) : (
        <div>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              height: "300px",
              overflowY: "scroll",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <strong>{msg.username}:</strong> {msg.message}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button
            onClick={handleSendMessage}
            style={{ width: "100%", padding: "10px" }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
