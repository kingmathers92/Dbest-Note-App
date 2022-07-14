import React from "react";
import { Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Editor from "./components/Editor";
import Home from "./components/Home";
import Header from "./components/Header";
import Notes from "./components/Notes";
import Contact from "./components/Contact";

export default function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:noteId" element={<Notes />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </main>
  );
}
