import { useState } from "react";
import "./Editor.css";
import { Link } from "react-router-dom";
import axios from "axios";
function PlagiarismSidebar({text}) {
  const [AI,setAI]=useState(0)
  const [Plagiarism ,setPlagiarism ]=useState(0)
  const onCheck=()=>{
    
    setAI(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
    setPlagiarism(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
  }
  return (
    <aside
      className="w-full sm:w-96 bg-white border-l border-gray-200 flex flex-col"
      role="complementary"
      aria-label="AI & Plagiarism Sidebar"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-around">
          <Link className="flex flex-col items-center text-gray-500 hover:text-gray-700 py-2 px-3"  to="/dashboard/editor">
            <span className="material-icons text-xl">edit_note</span>
            <span className="text-xs mt-1">Detecting grammar issues</span>
          </Link>
          <Link className="flex flex-col items-center text-gray-500 hover:text-gray-700 py-2 px-3"  to="/dashboard/editor/generativeAI">
            <span className="material-icons text-xl">auto_awesome</span>
            <span className="text-xs mt-1">Write with generative AI</span>
          </Link>
          <Link className="flex flex-col items-center items-center text-purple-600 border-b-2 border-purple-600 py-2 px-3"  to="/dashboard/editor/plagiarism">
            <span className="material-icons text-xl">plagiarism</span>
            <span className="text-xs mt-1">Check for AI text &amp; plagiarism</span>
          </Link>
        </div>
      </div>
      <div className="p-4 flex-grow overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-medium text-gray-800">
            Check for AI text &amp; plagiarism
          </h2>
          <button className="text-gray-500 hover:text-gray-700">
            <span className="material-icons text-base">help_outline</span>
          </button>
        </div>

        {/* Check Now Button */}
        <div className="mb-6">
          <button className="w-full bg-blue-600 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center" onClick={onCheck}>
            <span className="material-icons text-base mr-2">plagiarism</span>
            Check Now
          </button>
        </div>

        {/* AI Detection Result */}
        <div className="border border-gray-200 rounded-lg p-3 mb-4">
          <div className="flex items-center text-xs text-gray-600 mb-2">
            <span className="material-icons text-base mr-1 text-blue-500">travel_explore</span>
            <span>AI Text Detection</span>
            <button className="text-gray-400 hover:text-gray-600 ml-auto">
              <span className="material-icons text-base">more_vert</span>
            </button>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-orange-500">{AI}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div
                className="bg-orange-500 h-1.5 rounded-full"
                style={{width: AI.toString()+"%"}}
              ></div>
            </div>
            <p className="text-xs text-gray-500">
              This text shares characteristics commonly found in AI-generated content. Consider revising for originality.
            </p>
          </div>
        </div>

        {/* Plagiarism Result */}
        <div className="border border-gray-200 rounded-lg p-3">
          <div className="flex items-center text-xs text-gray-600 mb-2">
            <span className="material-icons text-base mr-1 text-red-500">find_in_page</span>
            <span>Plagiarism Check</span>
            <button className="text-gray-400 hover:text-gray-600 ml-auto">
              <span className="material-icons text-base">more_vert</span>
            </button>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-red-600">{Plagiarism}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div
                className="bg-red-600 h-1.5 rounded-full"
                style={{ width: Plagiarism.toString()+"%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default PlagiarismSidebar;
