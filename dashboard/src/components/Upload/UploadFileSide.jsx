import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UploadFileSide.css";
import SmartTextAnalyzerLoading from "../../assets/Loding";

<<<<<<< HEAD

=======
>>>>>>> f4effe2260fcd82a1c32f4723c9e7cc35fa492f9
function UploadFileSide({ setPdfFile }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
<<<<<<< HEAD
  const [loading, setLoading] = useState(false); // Loading state
=======
>>>>>>> f4effe2260fcd82a1c32f4723c9e7cc35fa492f9
  const navigate = useNavigate();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
<<<<<<< HEAD
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
=======
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
>>>>>>> f4effe2260fcd82a1c32f4723c9e7cc35fa492f9
      if (fileExtension !== "pdf") {
        alert("Only PDF files are allowed.");
        return;
      }

      setFileName(selectedFile.name);
      setFile(selectedFile);
      setPdfFile(selectedFile); // Optional: pass file to parent
    }
  };

  const handleContinue = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
<<<<<<< HEAD
      setLoading(true); // Show loader
=======
>>>>>>> f4effe2260fcd82a1c32f4723c9e7cc35fa492f9
      const response = await axios.post("http://127.0.0.1:4000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success:", response.data);
      navigate("document");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
<<<<<<< HEAD
    } finally {
      setLoading(false); // Hide loader
=======
>>>>>>> f4effe2260fcd82a1c32f4723c9e7cc35fa492f9
    }
  };

  return (
    <div className="upload-container">
      {/* Loader */}
      <SmartTextAnalyzerLoading isLoading={loading} />

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
              accept=".pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />

            <button onClick={handleButtonClick} className="upload-button">
              <span className="truncate">Select a PDF file</span>
            </button>

            {fileName && <p className="file-selected">{fileName} selected</p>}

            <button
              onClick={handleContinue}
              className="upload-button btn-primary"
            >
              Upload & Continue
            </button>
          </div>
        </div>

        <p className="file-types">Supported file types: PDF only</p>
      </div>
    </div>
  );
}

export default UploadFileSide;
