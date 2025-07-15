import "./Editor.css";
import RichTextEditor from "../components/Editor/RichTextEditor";
import SuggestionsSidebar from "../components/Editor/SuggestionsSidebar";

function Editor() {
  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="editor-section">
          <RichTextEditor />
        </div>
        <div className="sidebar-section">
          <SuggestionsSidebar />
        </div>
      </div>
    </div>
  );
}

export default Editor;