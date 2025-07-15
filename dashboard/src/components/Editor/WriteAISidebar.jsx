import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function WriteAISidebar({inputText,setInputText}) {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerateText = () => {
    const data = {
      user: "1241",
      text: text,
      tone: tone,
    };
    axios.post("http://127.0.0.1:4000/generative", data).then((res) => {
      const result = res.data;
      setOutput(result.output);
    });
  };

  const insert=()=>{
    const currData = inputText+"\n"+output
    setInputText(currData)
  }

  return (
    <aside className="w-96 bg-white border-l border-gray-200 flex flex-col">
      {/* Top Navigation */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-around">
          <Link
            to="/dashboard/editor"
            className="flex flex-col items-center text-gray-500 hover:text-gray-700 py-2 px-3"
          >
            <span className="material-icons text-xl">edit_note</span>
            <span className="text-xs mt-1">Detecting grammar issues</span>
          </Link>
          <Link
            to="/dashboard/editor/generativeAI"
            className="flex flex-col items-center text-purple-600 border-b-2 border-purple-600 py-2 px-3"
          >
            <span className="material-icons text-xl">auto_awesome</span>
            <span className="text-xs mt-1">Write with generative AI</span>
          </Link>
          <Link
            to="/dashboard/editor/plagiarism"
            className="flex flex-col items-center text-gray-500 hover:text-gray-700 py-2 px-3"
          >
            <span className="material-icons text-xl">plagiarism</span>
            <span className="text-xs mt-1">Check for AI text & plagiarism</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 flex-grow overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-medium text-gray-800">
            Write with generative AI
          </h2>
          <button className="text-gray-500 hover:text-gray-700">
            <span className="material-icons text-base">help_outline</span>
          </button>
        </div>

        {/* Prompt Input */}
        <div className="mb-4">
          <label
            htmlFor="prompt"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            Prompt
          </label>
          <textarea
            id="prompt"
            name="prompt"
            rows="3"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="e.g., Write a paragraph about the future of AI"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        {/* Tone Input */}
        <div className="mb-4">
          <label
            htmlFor="tone"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            Tone
          </label>
          <select
            id="tone"
            name="tone"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-purple-500 focus:border-purple-500"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="">Select Tone</option>
            <option>Casual</option>
            <option>Formal</option>
            <option>Professional</option>
            <option>Enthusiastic</option>
            <option>Skeptical</option>
          </select>
        </div>

        {/* Generate Button */}
        <div className="mb-6">
          <button
            onClick={handleGenerateText}
            className="w-full bg-purple-600 text-white text-sm py-2 px-4 rounded-md hover:bg-purple-700 flex items-center justify-center"
          >
            <span className="material-icons text-base mr-2">auto_awesome</span>
            Generate text
          </button>
        </div>

        {/* Output Section */}
        {(
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center text-xs text-gray-600 mb-2">
              <span className="material-icons text-base mr-1 text-purple-500">
                lightbulb
              </span>
              <span>Generated Text</span>
              <button className="text-gray-400 hover:text-gray-600 ml-auto">
                <span className="material-icons text-base">more_vert</span>
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-3 bg-gray-50 p-2 rounded-md">
              {output}
            </p>
            <div className="flex items-center space-x-2">
              <button className="bg-teal-500 text-white text-xs px-3 py-1.5 rounded-md hover:bg-teal-600" onClick={insert}>
                Insert
              </button>
              <button className="text-gray-500 text-xs hover:text-gray-700" onClick={handleGenerateText}>
                Regenerate
              </button>
              <button className="text-gray-400 hover:text-gray-600 ml-auto">
                <span className="material-icons text-base">content_copy</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default WriteAISidebar;
