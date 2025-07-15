import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import UploadFileSide from "../components/Upload/UploadFileSide";
import DocumentScanner from "../components/Upload/DocumentScanner";

function Upload() {
  const [pdfFile, setPdfFile] = useState(null);
  return (
   <Routes>
      <Route index element={<UploadFileSide setPdfFile={setPdfFile} />} />
      <Route path="document" element={<DocumentScanner pdfFile={pdfFile} />} />
    </Routes>
  );
}

export default Upload;