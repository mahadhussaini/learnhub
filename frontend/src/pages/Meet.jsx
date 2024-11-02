import React, { useState } from "react";
import Gmeet from "../components/Gmeet";
import Layout from "../components/Layout/Layout";

const Meet = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
  };

  const handleVideoToggle = () => {
    setIsVideoOn((prev) => !prev);
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setChatMessages((prev) => [...prev, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-200">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-center text-blue-600 py-4 border-b">
            Virtual Meeting Room
          </h1>
          <div className="p-4">
            <Gmeet />
          </div>
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <button
                onClick={handleMuteToggle}
                disabled
                className={`py-2 px-4 rounded-lg ${
                  isMuted ? "bg-red-500" : "bg-green-500"
                } text-white opacity-50 cursor-not-allowed`}
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
              <button
                onClick={handleVideoToggle}
                disabled
                className={`py-2 px-4 rounded-lg ${
                  isVideoOn ? "bg-red-500" : "bg-green-500"
                } text-white opacity-50 cursor-not-allowed`}
              >
                {isVideoOn ? "Stop Video" : "Start Video"}
              </button>
            </div>
            <div className="mb-4">
              <h2 className="font-bold">Participants</h2>
              <ul className="list-disc pl-5">
                {participants.map((participant, index) => (
                  <li key={index}>{participant}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h2 className="font-bold">Chat</h2>
              <div className="border p-2 rounded h-32 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <p key={index}>{msg}</p>
                ))}
              </div>
              <form onSubmit={handleChatSend} className="flex mt-2">
                <input
                  type="text"
                  className="border rounded p-2 flex-1"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="ml-2 bg-blue-600 text-white rounded p-2"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Meet;
