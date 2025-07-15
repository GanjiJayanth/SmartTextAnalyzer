import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadFileSide.css";

function UploadFileSide() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleContinue = () => {
    if (!fileName) {
      alert("Please select a file first.");
      return;
    }
    // Redirect to another screen
    navigate("document");
  };

  return (
    <div className="upload-container">
      <div className="layout-content-container">
        <div className="header-section">
          <div className="header-text">
            <p className="title">Upload a file</p>
            <p className="subtitle">
              Upload a file to start reading and interacting with it.
            </p>
          </div>
        </div>
        <div className="upload-section">
          <div className="upload-box">
            <div className="upload-info">
              <p className="upload-title">Drag and drop a file here</p>
              <p className="upload-subtitle">
                Or, you can select a file from your computer
              </p>
            </div>

            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />

            <button onClick={handleButtonClick} className="upload-button">
              <span className="truncate">Select a file</span>
            </button>

            {fileName && (
              <p className="file-selected">{fileName} selected</p>
            )}

            <button onClick={handleContinue} className="upload-button btn-primary">
              Upload & Continue
            </button>
          </div>
        </div>
        <p className="file-types">
          Supported file types: PDF, DOCX, TXT
        </p>
      </div>
    </div>
  );
}

export default UploadFileSide;
