import React from "react";
import Input from "../components/Input";

export default function Login() {
  return (
    <form className="form">
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <button>Login</button>
    </form>
  );
}
