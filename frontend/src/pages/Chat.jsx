import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout/Layout";
import { io } from "socket.io-client";
import { useAuthContext } from "../hooks/useAuthContext";

const socket = io.connect("http://localhost:4000");

function Chat() {
  const [prevMessages, setPrevMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]); // Store online users
  const [isTyping, setIsTyping] = useState(false); // Typing indicator
  const [typingTimeout, setTypingTimeout] = useState(null); // Timeout for typing indication
  const { user } = useAuthContext();
  const messageRef = useRef();

  const sendChat = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const payload = { message, sender: user?.name, timestamp: Date.now() };
      socket.emit("chat", payload);
      setMessage("");
      setIsTyping(false); // Reset typing state
      socket.emit("stop typing", user?.name); // Notify others that user stopped typing
    }
  };

  const resetChat = async () => {
    // Clear local state
    setPrevMessages([]);
    setChat([]);

    // Send a request to delete messages from the server
    try {
      const response = await fetch("http://localhost:4000/api/user/messages", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`, // If auth is needed
        },
      });

      if (response.ok) {
        console.log("Chat cleared successfully");
      } else {
        console.error("Failed to delete messages");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat((prevChat) => [...prevChat, payload]);
      setIsTyping(false); // Reset typing indicator on new message
    });

    socket.on("userList", (userList) => {
      setUsers(userList); // Update user list
    });

    socket.on("typing", (username) => {
      setIsTyping(true); // Set typing indicator
      if (typingTimeout) {
        clearTimeout(typingTimeout); // Clear existing timeout
      }
      setTypingTimeout(setTimeout(() => setIsTyping(false), 2000)); // Reset typing indicator after 2 seconds
    });

    socket.on("stop typing", () => {
      setIsTyping(false); // Stop typing indicator when user stops typing
    });

    fetchAllMessages();

    return () => {
      socket.off("chat");
      socket.off("userList");
      socket.off("typing");
      socket.off("stop typing");
    };
  }, []);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [prevMessages, chat]);

  const fetchAllMessages = async () => {
    const response = await fetch("http://localhost:4000/api/user/messages", {
      method: "GET",
    });

    if (response.ok) {
      const result = await response.json();
      setPrevMessages(result);
    } else {
      console.error("Failed to fetch messages");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full mx-4 md:mx-10 md:w-[80%] xl:w-[70%]">
        <h1 className="text-3xl font-bold text-center text-indigo-600 py-4">
          Chat
        </h1>

        <div className="flex flex-row">
          {/* User list */}
          <div className="w-1/4 bg-slate-200 rounded-lg p-4">
            <h2 className="font-bold">Online Users</h2>
            <ul>
              {users.map((u, index) => (
                <li key={index} className="py-1 text-indigo-700">
                  {u}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto h-[70vh] rounded-lg bg-slate-100 shadow-md p-4 mx-2">
            <div ref={messageRef} className="flex-1">
              {prevMessages.concat(chat).map((payload, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    user?.name === payload.sender
                      ? "flex justify-end"
                      : "flex justify-start"
                  }`}
                >
                  <p
                    className={`p-3 rounded-lg text-white ${
                      user?.name === payload.sender
                        ? "bg-indigo-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {user?.name !== payload.sender ? (
                      <strong>{payload.sender}: </strong>
                    ) : null}
                    {payload.message}
                    <span className="text-gray-300 text-xs ml-2">
                      {new Date(payload.timestamp).toLocaleTimeString()}
                    </span>
                  </p>
                </div>
              ))}
              {isTyping && (
                <p className="italic text-gray-500">Someone is typing...</p>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={sendChat} className="flex mt-4">
          <input
            className="w-full p-3 rounded-l-lg border border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-500"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              socket.emit("typing", user?.name); // Notify others that user is typing
            }}
          />
          <button
            className="bg-indigo-600 text-white rounded-r-lg p-3 hover:bg-indigo-700 transition duration-300"
            type="submit"
          >
            Send
          </button>
        </form>

        <button
          onClick={resetChat}
          className="bg-red-600 text-white rounded-lg mt-4 p-3 hover:bg-red-700 transition duration-300"
        >
          Clear Chat
        </button>
      </div>
    </Layout>
  );
}

export default Chat;
