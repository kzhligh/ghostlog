import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function History() {
  return (
    <div>
      <h1>History</h1>
      <Link to="/todolist">Back to To-Do list</Link>
    </div>
  );
}
