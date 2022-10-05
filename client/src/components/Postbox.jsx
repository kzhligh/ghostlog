import React from "react";
import { useState, useEffect } from "react";

export default function Postbox() {
  const [newPost, setNewPost] = useState({
    username: "",
    content: "",
  });

  function apiPost() {
    fetch("/posts", {
      method: "POST",
      body: JSON.stringify({
        username: newPost.username,
        content: newPost.content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data);
    // });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewPost((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleClick(event) {
    event.preventDefault();
    console.log("NEW POST IS HERE ", newPost);
    apiPost();
    setNewPost({
      username: "",
      content: "",
    });
  }

  return (
    <div style={{ borderStyle: "solid", borderColor: "black" }}>
      <form>
        <input
          value={newPost.username}
          name="username"
          type="text"
          placeholder="username"
          onChange={handleChange}
        />
        <textarea
          value={newPost.content}
          name="content"
          type="text"
          placeholder="content"
          onChange={handleChange}
        />
        <button
          onClick={handleClick}
          style={{ marginTop: "20px" }}
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}
