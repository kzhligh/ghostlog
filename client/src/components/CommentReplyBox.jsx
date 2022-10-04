import React from "react";
import { useState, useEffect } from "react";

//could simply re-use the postbox component and pass some props
export default function CommentReplyBox(props) {
  const [newComment, setNewComment] = useState({
    username: "",
    comment: "",
  });

  //   function getCurrentTimestamp () {
  //     return Date.now()
  //   }

  function apiPost() {
    console.log("THE ID IS ", props.id);
    fetch(`/post/${props.id}/comments`, {
      method: "POST",
      body: JSON.stringify({
        username: newComment.username,
        comment: newComment.comment,
        // timestamp: getCurrentTimestamp()
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewComment((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleClick(event) {
    event.preventDefault();
    apiPost();
    setNewComment({
      username: "",
      comment: "",
    });
  }

  return (
    <div
      style={{
        borderStyle: "solid",
        borderColor: "black",
        marginTop: "5px",
        marginBottom: "5px",
        marginLeft: "5px",
        marginRight: "5px",
      }}
    >
      <form>
        reply to above comment
        <input
          value={newComment.username}
          name="username"
          type="text"
          placeholder="username"
          onChange={handleChange}
        />
        <textarea
          value={newComment.comment}
          name="comment"
          type="text"
          placeholder="comment"
          onChange={handleChange}
        />
        <button
          onClick={handleClick}
          style={{ marginTop: "20px" }}
          type="submit"
        >
          comment
        </button>
      </form>
    </div>
  );
}
