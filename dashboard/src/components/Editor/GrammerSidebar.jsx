import React, { useState, useEffect } from "react";
import "./Editor.css";
import { Link } from "react-router-dom";
import axios from "axios";

function GrammarSidebar({ inputText, setInputText }) {
  const [readability, setReadability] = useState({
    readability_percentage: 0,
    level: "",
  });

  const [errorTypes, setErrorTypes] = useState([]);
  const [grammarMistakes, setGrammarMistakes] = useState([]);
  const [tone, setTone] = useState("");
  const [level, setLevel] = useState("");
<<<<<<< HEAD
  const [correctedText, setCorrectedText] = useState("");
=======
>>>>>>> f4effe2260fcd82a1c32f4723c9e7cc35fa492f9
  const [documentTone, setDocumentTone] = useState({});

  useEffect(() => {
    const handler = setTimeout(() => {
      const data = {
        user: "12341",
        text: inputText,
      };
      if (inputText.length !== 0) {
        axios
          .post("http://127.0.0.1:4000/posttext", data)
          .then((response) => {
            const result = response.data;
            const analysis = result.results && result.results[0] ? result.results[0] : {};
<<<<<<< HEAD
            console.log(analysis+"wefwe");
            setCorrectedText(analysis.corrected_text || "");
            setReadability(analysis.readability || { readability_percentage: 0, level: "" });
            setErrorTypes(analysis.analysis_summary?.error_types || []);
            setGrammarMistakes(analysis.errors || []);
            setLevel(analysis.readability?.level || "");
            setDocumentTone(analysis.tone_suggestions || {});
=======
            console.log(result)

            setReadability(result.readability || { readability_percentage: 0, level: "" });
            setErrorTypes(result.analysis_summary?.error_types || []);
            setGrammarMistakes(result.errors || []);
            setLevel(result.readability?.level || "");
            setDocumentTone(result.tone_suggestions || {});
>>>>>>> f4effe2260fcd82a1c32f4723c9e7cc35fa492f9
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }, 100);

    return () => clearTimeout(handler);
  }, [inputText]);

  const changeTone = () => {
    const selectedTone = tone.trim().toLowerCase();
    if (!selectedTone) {
      alert("Please select a tone first.");
      return;
    }

    const suggestion = documentTone[selectedTone];
    if (suggestion) {
      console.log("Applying tone:", selectedTone);
      setInputText(suggestion);
    } else {
      console.warn("No tone suggestion found for:", selectedTone);
      alert("No suggestion available for the selected tone.");
    }
  };

<<<<<<< HEAD
  const correct = () => {
  if (correctedText && correctedText.trim() !== "") {
    console.log("Applying corrected grammar text");
    setInputText(correctedText);
  } else {
    alert("No grammar correction suggestion available.");
  }
};

=======
>>>>>>> f4effe2260fcd82a1c32f4723c9e7cc35fa492f9
  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      {/* Navigation */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-around">
          <Link
            to="/dashboard/editor"
            className="flex flex-col items-center text-purple-600 border-b-2 border-purple-600 py-2 px-3"
          >
            <span className="material-icons text-xl">edit_note</span>
            <span className="text-xs mt-1">Detecting grammar issues</span>
          </Link>
          <Link
            to="/dashboard/editor/generativeAI"
            className="flex flex-col items-center text-gray-500 hover:text-gray-700 py-2 px-3"
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

      <div className="p-4 flex-grow overflow-y-auto">
        {/* Readability */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="material-icons text-blue-500 text-base mr-1">visibility</span>
              <h3 className="text-xs font-medium text-gray-800">Readability Analysis</h3>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-2">
            Your text is{" "}
            {readability.readability_percentage < 80
              ? "fairly difficult to read. Try improving clarity and grammar."
              : "easy to read. Great job!"}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
            <div
              className="bg-green-500 h-1.5 rounded-full"
              style={{ width: `${readability.readability_percentage.toFixed()}%` }}
            ></div>
          </div>
          <span
            className={`text-xs font-medium ${
              readability.readability_percentage < 80 ? "text-red-600" : "text-green-600"
            }`}
          >
            {readability.readability_percentage.toFixed()}/100
          </span>
        </div>

        {/* Tone Selection */}
        <div className="mb-4">
          <label htmlFor="tone" className="block text-xs font-medium text-gray-700 mb-1">
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
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="persuasive">Persuasive</option>
          </select>
<<<<<<< HEAD
=======

          {/* Optional: Preview selected tone (uncomment below to use preview feature) */}
          {/* {tone && documentTone[tone.toLowerCase()] && (
            <div className="mt-2 p-2 bg-gray-100 border rounded text-xs text-gray-700">
              <strong>Preview:</strong> {documentTone[tone.toLowerCase()]}
            </div>
          )} */}
>>>>>>> f4effe2260fcd82a1c32f4723c9e7cc35fa492f9
        </div>

        {/* Analysis Summary */}
        <div className="mb-4 text-sm text-gray-700">
          <p className="mb-1">
            <strong>Level:</strong>{" "}
            <span className="font-medium text-green-600">{level}</span>
          </p>
          <p className="mb-1">
            <strong>Error Types:</strong> {errorTypes.join(", ")}
          </p>
          <p className="mb-1">
            <strong>Grammar Issues:</strong> {grammarMistakes.length}
          </p>
          {grammarMistakes.length > 0 && (
            <ul className="list-disc pl-5 text-xs mt-1 text-red-600">
              {grammarMistakes.slice(0, 5).map((err, index) => (
                <li key={index}>
                  <strong>Error:</strong> "{err.error}" — {err.message}
                </li>
              ))}
              {grammarMistakes.length > 5 && (
                <li className="text-gray-500">...and more</li>
              )}
            </ul>
          )}
        </div>
      </div>

<<<<<<< HEAD
      {/* Apply All Suggestions */}
=======
      {/* Apply Button */}
>>>>>>> f4effe2260fcd82a1c32f4723c9e7cc35fa492f9
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={changeTone}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-md w-full flex items-center justify-center"
        >
          <span className="material-icons mr-2 text-base">done</span>
          Apply All Suggestions
        </button>
      </div>

      {/* Correct Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={correct}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-md w-full flex items-center justify-center"
        >
          <span className="material-icons mr-2 text-base">done</span>
          Correct It
        </button>
      </div>
    </div>
  );
}

export default GrammarSidebar;
