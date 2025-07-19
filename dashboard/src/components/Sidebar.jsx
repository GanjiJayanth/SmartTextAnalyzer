import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [minimized, setMinimized] = useState(false);

  return (
    <aside
      className={`relative bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        minimized ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <button
        className="sidebar-toggle-btn"
        style={{
          position: "absolute",
          top: "1.3rem",
          right: "24px",
          zIndex: 10,
          background: "#e5e7eb",
          borderRadius: "9999px",
          padding: "0.25rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setMinimized((m) => !m)}
        title={minimized ? "Expand sidebar" : "Collapse sidebar"}
      >
        <span className="material-icons text-gray-700">menu</span>
      </button>

      <div
        className={`p-4 border-b border-gray-200 ${
          minimized ? "justify-center" : ""
        }`}
      >
        <div className="flex items-center">
          {!minimized && (
            <>
              <span className="text-base font-semibold text-gray-800">
                Smart Text Analyzer
              </span>
            </>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-grow pt-4">
        <ul>
          <li>
            <Link
              className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700  hover:bg-gray-50 ${
                minimized ? "justify-center" : ""
              }`}
              to="/"
            >
              <span className="material-icons mr-3 text-gray-500">description</span>
              {!minimized && "Documents"}
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                minimized ? "justify-center" : ""
              }`}
              to="/dashboard/upload"
            >
              <span className="material-icons mr-3 text-gray-500">cloud_upload</span>
              {!minimized && "Upload"}
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                minimized ? "justify-center" : ""
              }`}
              to="/dashboard/summarizer"
            >
              <span className="material-icons mr-3 text-gray-500">auto_awesome</span>
              {!minimized && "Summarizer"}
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                minimized ? "justify-center" : ""
              }`}
              to="/dashboard/plagiarism"
            >
              <span className="material-symbols-outlined mr-3 text-gray-500">plagiarism</span>
              {!minimized && "Plagiarism"}
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                minimized ? "justify-center" : ""
              }`}
              to="/dashboard/settings"
            >
              <span className="material-icons mr-3 text-gray-500">account_circle</span>
              {!minimized && "Account"}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <ul>
          <li>
            <Link
              className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                minimized ? "justify-center" : ""
              }`}
              to="/support"
            >
              <span className="material-icons mr-3 text-gray-500">help_outline</span>
              {!minimized && "Support"}
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                minimized ? "justify-center" : ""
              }`}
              to="/logout"
            >
              <span className="material-icons mr-3 text-gray-500">logout</span>
              {!minimized && "Sign out"}
            </Link>
          </li>
        </ul>
        {!minimized && (
          <p className="text-xs text-gray-500 mt-2">karthikeysharma88@g...</p>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
