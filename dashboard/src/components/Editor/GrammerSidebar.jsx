import React from "react";
import "./Editor.css";
import { Link } from "react-router-dom";
function GrammarSidebar() {
  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      {/* Top Navigation Tabs */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-around">
          <Link
            className="flex flex-col items-center text-purple-600 border-b-2 border-purple-600 py-2 px-3"
            to="/dashboard/editor"
            >
            <span className="material-icons text-xl">edit_note</span>
            <span className="text-xs mt-1">Review suggestions</span>
          </Link>
          <Link
            className="flex flex-col items-center  text-gray-500 hover:text-gray-700 py-2 px-3"
            to="/dashboard/editor/generativeAI"
          >
            <span className="material-icons text-xl">auto_awesome</span>
            <span className="text-xs mt-1">Write with generative AI</span>
          </Link>
          <Link
            className="flex flex-col items-center text-gray-500 hover:text-gray-700 py-2 px-3"
            to="/dashboard/editor/plagiarism"
          >
            <span className="material-icons text-xl">plagiarism</span>
            <span className="text-xs mt-1">
              Check for AI text &amp; plagiarism
            </span>
          </Link>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="p-4 flex-grow overflow-y-auto">
        {/* Section Title */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-medium text-gray-800">
            Review suggestions
          </h2>
          <button className="text-gray-500 hover:text-gray-700">
            <span className="material-icons text-base">help_outline</span>
          </button>
        </div>

        {/* Suggestion Categories */}
        <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
          <div className="flex items-center">
            <span className="material-icons text-red-500 text-base mr-1">
              cancel
            </span>
            Correctness
          </div>
          <div className="flex items-center">
            <span className="material-icons text-blue-500 text-base mr-1">
              check_circle
            </span>
            Clarity
          </div>
          <div className="flex items-center">
            <span className="material-icons text-green-500 text-base mr-1">
              cancel
            </span>
            Engagement
          </div>
          <div className="flex items-center">
            <span className="material-icons text-purple-500 text-base mr-1">
              check_circle
            </span>
            Delivery
          </div>
        </div>

        {/* Readability Analysis */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="material-icons text-blue-500 text-base mr-1">
                visibility
              </span>
              <h3 className="text-xs font-medium text-gray-800">
                Readability Analysis
              </h3>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <span className="material-icons text-sm">expand_more</span>
            </button>
          </div>
          <p className="text-xs text-gray-600 mb-2">
            Your text is easy to read. Aim for a score of 80+ for most
            audiences.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
            <div
              className="bg-green-500 h-1.5 rounded-full"
              style={{ width: "85%" }}
            ></div>
          </div>
          <span className="text-xs font-medium text-green-600">85/100</span>
        </div>

        {/* Tone Change */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="material-icons text-yellow-500 text-base mr-1">
                campaign
              </span>
              <h3 className="text-xs font-medium text-gray-800">Tone Change</h3>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <span className="material-icons text-sm">expand_more</span>
            </button>
          </div>
          <p className="text-xs text-gray-600 mb-2">
            Current tone:{" "}
            <span className="font-medium text-gray-800">Neutral</span>. Select a
            new tone:
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
              Formal
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
              Confident
            </button>
            <button className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md border border-purple-300">
              Friendly
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
              Persuasive
            </button>
          </div>
        </div>

        {/* Improve Your Text Section */}
        <div className="border border-gray-200 rounded-lg p-3">
          <div className="flex items-center text-xs text-blue-600 mb-2">
            <span className="material-icons text-base mr-1">lightbulb</span>
            <span>Improve your text</span>
            <button className="text-gray-400 hover:text-gray-600 ml-auto">
              <span className="material-icons text-base">more_vert</span>
            </button>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            We're{" "}
            <span className="bg-purple-100 text-purple-700 rounded px-1">
              We
            </span>{" "}
            sorry{" "}
            <span className="bg-red-100 text-red-700 rounded px-1">
              apologize
            </span>
            , but an unexpected error{" "}
            <span className="bg-green-100 text-green-700 rounded px-1">
              has
            </span>{" "}
            occurred while processing your request.
          </p>
          <div className="flex items-center space-x-2">
            <button className="bg-teal-500 text-white text-xs px-3 py-1.5 rounded-md hover:bg-teal-600">
              Use this version
            </button>
            <button className="text-gray-500 text-xs hover:text-gray-700">
              Dismiss
            </button>
            <button className="text-gray-400 hover:text-gray-600 ml-auto">
              <span className="material-icons text-base">more_horiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-4 border-t border-gray-200">
        <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-md w-full flex items-center justify-center">
          <span className="material-icons mr-2 text-base">done</span>
          Apply All Suggestions
        </button>
      </div>
    </div>
  );
}

export default GrammarSidebar;
