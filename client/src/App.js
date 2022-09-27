import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import History from "./pages/History";
import Home from "./pages/Home";
import ToDoList from "./pages/ToDoList";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* this will exist in all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/todolist" element={<ToDoList />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
