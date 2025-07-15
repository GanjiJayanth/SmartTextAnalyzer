import React, { useState } from "react";

function Summarizer() {
  const [inputText, setInputText] = useState("");
  const [summaryLength, setSummaryLength] = useState(25);
  const [summarizedText, setSummarizedText] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleSummarize = () => {
    const trimmed = inputText.trim();
    setSummarizedText(trimmed || "Your summarized text will appear here...");
    setWordCount(trimmed ? trimmed.split(/\s+/).length : 0);
  };

  const handleRangeChange = (e) => {
    const val = e.target.value;
    setSummaryLength(val);
    e.target.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${val}%, var(--secondary-color) ${val}%, var(--secondary-color) 100%)`;
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen p-6">
      

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-200 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-4 w-full">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Summary Length:</span>
              <span className="text-sm text-gray-500">Short</span>
              <div className="flex-grow sm:w-32">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={summaryLength}
                  onChange={handleRangeChange}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb slider-track"
                  style={{
                    background: `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${summaryLength}%, var(--secondary-color) ${summaryLength}%, var(--secondary-color) 100%)`
                  }}
                />
              </div>
              <span className="text-sm text-gray-500">Long</span>
            </div>
          </header>

          <main className="mt-6 flex-1 flex flex-col">
            <p className="text-sm text-gray-500 mb-2">Enter or paste your text below:</p>
            <textarea
              className="w-full flex-1 border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent resize-none min-h-[200px] sm:min-h-[300px]"
              placeholder="Paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <button
                className="bg-[var(--primary-color)] hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md text-sm w-full sm:w-auto"
                onClick={handleSummarize}
              >
                Summarize
              </button>
              <button
                className="border-2 border-[var(--primary-color)] text-[var(--primary-color)] px-4 py-2 rounded-md flex items-center justify-center hover:bg-green-50 transition text-sm w-full sm:w-auto"
                onClick={() => navigator.clipboard.readText().then(setInputText)}
              >
                <span className="material-icons text-lg mr-1">note_add</span>
                Paste Text
              </button>
            </div>
          </main>
        </div>

        {/* Output Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Summarized Text</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{wordCount} words</span>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => navigator.clipboard.writeText(summarizedText)}
              >
                <span className="material-icons">content_copy</span>
              </button>
            </div>
          </div>
          <div className="mt-6 flex-1 overflow-y-auto p-4 border border-gray-200 rounded-lg bg-gray-50 min-h-[200px] sm:min-h-[300px]">
            <p className="text-gray-700 leading-relaxed">{summarizedText || "Your summarized text will appear here..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summarizer;
