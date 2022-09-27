import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import History from "./pages/History";
import Home from "./pages/Home";
import ToDoList from "./pages/ToDoList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Macros from "./pages/Macros";
import Calculator from "./pages/Calculator";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* this will exist in all pages */}
        <Routes>
          {/* eventually only allow logged in users to see the other pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/todolist" element={<ToDoList />} />
          <Route path="/macros" element={<Macros />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
