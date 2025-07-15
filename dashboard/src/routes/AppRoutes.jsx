import React from "react";
import { Routes, Route } from "react-router-dom";

// Main Pages
import Editor from "../pages/Editor";
import Upload from "../pages/Upload";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import Page404 from "../pages/Page404";
import Summarizer from "../pages/Summarizer";
import Plagiarism from "../pages/Plagiarism";

// Auth Pages

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard/editor/*" element={<Editor />} />
      <Route path="/dashboard/upload/*" element={<Upload />} />
      <Route path="/dashboard/summarizer" element={<Summarizer/>} />
      <Route path="/dashboard/plagiarism" element={<Plagiarism />} />
      <Route path="*" element={<Page404/>} />
    </Routes>
  );
};

export default AppRoutes;
