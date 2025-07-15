import { Route, Routes } from "react-router-dom";

import UploadFileSide from "../components/Upload/UploadFileSide";
import DocumentScanner from "../components/Upload/DocumentScanner";

function Upload() {
  return (
    <Routes>
      <Route index element={<UploadFileSide/>} />
      <Route path="document" element={<DocumentScanner/>} />
    </Routes>
  );
}

export default Upload;