import React from "react";
import DocumentReview from "./DocumentReview";
import AISidebar from "./AISidebar";

function DocumentScanner() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <DocumentReview />
      <AISidebar />
    </div>
  );
}

export default DocumentScanner;
