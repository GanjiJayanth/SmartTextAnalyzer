import React, { useEffect, useState } from "react";

function DocumentReview({ pdfFile }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (pdfFile) {
      const url = URL.createObjectURL(pdfFile);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [pdfFile]);

  if (!pdfFile) return <div className="p-4">Please upload a PDF to review.</div>;

  return (
    <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-4 h-full">
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            title="PDF Viewer"
            className="w-full min-h-[600px] rounded-md"
            style={{ border: "none" }}
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}

export default DocumentReview;