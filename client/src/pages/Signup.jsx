import React from "react";
import Input from "../components/Input";

export default function Signup() {
  return (
    <form className="form">
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <Input type="password" placeholder="Re-enter password" />
      <button type="submit">Submit</button>
    </form>
  );
}
