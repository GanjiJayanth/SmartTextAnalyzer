import "./Editor.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import GrammerSidebar from "./GrammerSidebar";
import WriteAISidebar from "./WriteAISidebar";
import PlagirarismSidebar from "./PlagirarismSidebar";

function SuggestionsSidebar() {
  return (
    <Routes>
      <Route index element={<GrammerSidebar />} />
      <Route path="generativeAI" element={<WriteAISidebar />} />
      <Route path="plagiarism" element={<PlagirarismSidebar />} />
    </Routes>
  );
}

export default SuggestionsSidebar;