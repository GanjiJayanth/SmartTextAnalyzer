import React, { useState } from "react";
import axios from "axios";

function AISidebar() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "Hey there! This write-up breaks down smart cities and infrastructure, focusing on how technology like AI, IoT, and data analytics is shaping urban living.",
    },
  ]);

  const handleSend = async () => {
    if (chatInput.trim() === "") return;

    // Add user's message
    const userMessage = { sender: "user", text: chatInput };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Send POST request to Flask backend
      const response = await axios.post("http://127.0.0.1:4000/query", {
        query: chatInput,
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "AIzaSyByicleeKHnDKL6iaHdnkEUh10w0wSvfUs", // Replace with real API key if needed
        },
      });
      console.log(response)
      // Add AI's reply
      const aiMessage = {
        sender: "ai",
        text: response.data.response || "Sorry, I couldn't generate a response.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Query error:", error);
      const errorMessage = {
        sender: "ai",
        text: "❌ Failed to get a response from the server.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setChatInput(""); // Clear input
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="w-full md:w-1/3 flex flex-col bg-white border-l border-gray-200">
      {/* Header */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
        <span className="text-lg font-semibold text-gray-800">Chat</span>
        <div className="flex items-center space-x-1">
          {["tune", "fullscreen", "push_pin", "history", "more_horiz"].map((icon) => (
            <button key={icon} className="p-2 rounded hover:bg-gray-100 text-gray-600">
              <span className="material-icons text-xl">{icon}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-start space-x-3">
            <div
              className={`p-2 rounded-full text-white ${
                msg.sender === "ai" ? "bg-purple-600" : "bg-gray-400"
              }`}
            >
              <span className="material-icons text-xl">
                {msg.sender === "ai" ? "smart_toy" : "person"}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Suggestions */}
        <div className="space-y-3">
          <SidebarButton icon="summarize" text="Summarize this paper" />
          <SidebarButton
            icon="help_outline"
            text="How do Integrated Command and Control Centres improve city operations?"
          />
          <SidebarButton
            icon="help_outline"
            text="What technologies are primarily used to enhance solid waste management in smart cities?"
          />
        </div>

        {/* Footer action icons */}
        <div className="flex items-center space-x-2 text-gray-500">
          {["thumb_up_off_alt", "thumb_down_off_alt", "content_copy", "refresh"].map((icon) => (
            <button key={icon} className="p-1 rounded hover:bg-gray-100">
              <span className="material-icons text-lg">{icon}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-end mb-2">
          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
            <button className="px-3 py-1 text-sm rounded-md text-gray-700 hover:bg-gray-200">
              Fast
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-white shadow text-purple-600 font-medium">
              High Quality
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
            placeholder="Ask any question..."
            type="text"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-shadow shadow"
          >
            <span className="material-icons">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarButton({ icon, text }) {
  return (
    <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
      <span className="material-icons text-purple-600">{icon}</span>
      <span className="text-sm text-gray-700">{text}</span>
    </button>
  );
}

export default AISidebar;
