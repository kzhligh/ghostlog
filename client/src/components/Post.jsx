import React from "react";
import { useState, useEffect } from "react";

import Comment from "./Comment";
import CommentReplyBox from "./CommentReplyBox";

export default function Post(props) {
  const [showReplyPostbox, setShowReplyPostbox] = useState(false);
  const [buttonName, setButtonName] = useState("reply");
  const [commentArray, setCommentArray] = useState([]);

  //   render all the comments at the beginning...
  useEffect(() => {
    apiGetComments();
  }, []);

  function apiGetComments() {
    fetch(`/post/${props.id}/comments`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // if (data !== undefined)
        //currently printing way too many data points...
        console.log("hey", data);
        const newArray = [];
        data.forEach((comment) => {
          newArray.push({
            id: comment._id,
            username: comment.username,
            comment: comment.comment,
          });
        });
        setCommentArray(newArray);
      });
  }

  function handleReplyClick(event) {
    event.preventDefault();
    if (buttonName === "reply") {
      setShowReplyPostbox(true);
      setButtonName("close");
    } else if (buttonName === "close") {
      setShowReplyPostbox(false);
      setButtonName("reply");
    }

    //call the route
  }

  return (
    <div
      //   onClick={handleCommentClick}
      style={{
        borderStyle: "solid",
        borderColor: "black",
        marginTop: "5px",
        marginBottom: "5px",
        marginLeft: "5px",
        marginRight: "5px",
      }}
    >
      <h3>post: {props.username} said:</h3>
      <p>{props.content}</p>
      <button style={{ marginBottom: "5px" }} onClick={handleReplyClick}>
        {buttonName}
      </button>
      {showReplyPostbox ? <CommentReplyBox id={props.id} /> : null}

      {/* display comments of each post under it */}
      {commentArray.map((comment) => {
        return (
          <Comment
            key={comment.id}
            username={comment.username}
            comment={comment.comment}
            id={comment.id}
          />
        );
      })}
    </div>
  );
}
