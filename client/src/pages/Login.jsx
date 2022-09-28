import React from "react";
import Input from "../components/Input";

export default function Login() {
  function login() {}

  return (
    <form className="form">
      <Input type="text" placeholder="Username" name="username" />
      <Input type="password" placeholder="Password" name="password" />
      <button onClick={login}>Login</button>
    </form>
  );
}
