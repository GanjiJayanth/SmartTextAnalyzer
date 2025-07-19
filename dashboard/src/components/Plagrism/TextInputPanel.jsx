import { useState } from "react";
import "./Plagiarism.css"

function TextInputPanel({ count, setTextArea }) {
  const [text, setText] = useState("");

  const changeText = (e) => {
    const newText = e.target.value;
    setText(newText);
    setTextArea(newText);
    console.log(newText);
  };

  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <textarea
          className="w-full h-64 p-3 border border-gray-300 rounded-md resize-none focus:ring-blue-500 focus:border-blue-500 custom-scrollbar"
          value={text}
          onChange={changeText}
        />
        <div className="text-right text-sm text-gray-500 mt-1">{count} / 10000</div>
      </div>
    </div>
  );
}

export default TextInputPanel;
