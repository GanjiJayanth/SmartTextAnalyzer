import React from "react";

function DocumentReview() {
  const fileId = "1I85CWC65eTPQ77_tioORUeJjVSVs0xaC";
  const viewerUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
      {/* PDF Viewer */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-4 h-full">
          <iframe
            src={viewerUrl}
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
