import React from "react";
import DocumentReview from "./DocumentReview";
import AISidebar from "./AISidebar";

function DocumentScanner({ pdfFile }) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <DocumentReview pdfFile={pdfFile} />
      <AISidebar />
    </div>
  );
}

export default DocumentScanner;
