import React from "react";

function AISidebar() {
  return (
    <div className="w-full md:w-1/3 flex flex-col bg-white border-l border-gray-200">
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

      <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-6">
        <div className="flex items-start space-x-3">
          <div className="bg-purple-600 p-2 rounded-full text-white">
            <span className="material-icons text-xl">smart_toy</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Hey there!</p>
            <p className="text-sm text-gray-600 mt-1">
              This write-up breaks down smart cities and infrastructure, focusing on how
              technology like AI, IoT, and data analytics is shaping urban living. It
              covers big steps like command centers that helped during COVID, tons of
              CCTV cameras boosting safety, smart water supply monitoring, and
              tech-driven waste management systems.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              I've gone through all 53 pages and am ready to chat about it!
            </p>
          </div>
        </div>

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

        <div className="flex items-center space-x-2 text-gray-500">
          {["thumb_up_off_alt", "thumb_down_off_alt", "content_copy", "refresh"].map((icon) => (
            <button key={icon} className="p-1 rounded hover:bg-gray-100">
              <span className="material-icons text-lg">{icon}</span>
            </button>
          ))}
        </div>
      </div>

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
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
            placeholder="Ask any question..."
            type="text"
          />
          <button className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-shadow shadow">
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
