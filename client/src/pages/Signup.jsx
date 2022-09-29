import React from "react";
import { useState } from "react";
import Input from "../components/Input";
import Warning from "../components/Warning";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  let navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    repassword: "",
  });

  const [warning, setWarning] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setNewUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    // console.log(newUser.username, newUser.password);
    event.preventDefault();
    if (newUser.password !== newUser.repassword) {
      console.log("password not matching");
      setWarning(true);
    } else {
      fetch("/signup", {
        method: "POST",
        body: JSON.stringify({
          username: newUser.username,
          password: newUser.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate("/");
        });
    }
  }

  function closeWarning() {
    setWarning(false);
  }

  return (
    <form className="form">
      <Input
        type="text"
        placeholder="Username"
        name="username"
        onChange={handleChange}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <Input
        type="password"
        placeholder="Re-enter password"
        name="repassword"
        onChange={handleChange}
      />
      {warning ? (
        <Warning
          phrase="Password mismatch, try again!"
          onClose={closeWarning}
        />
      ) : null}

      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}
