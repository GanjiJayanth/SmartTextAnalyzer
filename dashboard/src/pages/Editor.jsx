import "./Editor.css";
import RichTextEditor from "../components/Editor/RichTextEditor";
import SuggestionsSidebar from "../components/Editor/SuggestionsSidebar";
import { useState } from "react";


function Editor() {
  const [inputText,setInputText]=useState("");
  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="editor-section">
          <RichTextEditor inputText={inputText} setInputText={setInputText} />
        </div>
        <div className="sidebar-section">
          <SuggestionsSidebar inputText={inputText} setInputText={setInputText} />
        </div>
      </div>
    </div>
  );
}

export default Editor;