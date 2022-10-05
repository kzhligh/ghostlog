import React from "react";
import { useState, useEffect } from "react";

import Postbox from "./Postbox";
import CommentReplyBox from "./CommentReplyBox";

export default function Comment(props) {
  const [showReplyCommentbox, setShowReplyCommentbox] = useState(false);
  const [buttonName, setButtonName] = useState("reply");

  //we need an API get here that recursively gets ALL the children of comments...
  //and somehow renders them

  function handleReplyClick(event) {
    event.preventDefault();
    if (buttonName === "reply") {
      setShowReplyCommentbox(true);
      setButtonName("close");
    } else if (buttonName === "close") {
      setShowReplyCommentbox(false);
      setButtonName("reply");
    }

    //call the route
  }

  //   function handleCommentClick(event) {
  //     event.preventDefault();
  //     if (buttonName === "reply") {
  //       setShowReplyPostbox(true);
  //       setButtonName("close");
  //     } else if (buttonName === "close") {
  //       setShowReplyPostbox(false);
  //       setButtonName("reply");
  //     }
  //   }

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
      <h3>comment: {props.username} said:</h3>
      <p>{props.comment}</p>
      <button style={{ marginBottom: "5px" }} onClick={handleReplyClick}>
        {buttonName}
      </button>
      {showReplyCommentbox ? <CommentReplyBox id={props.id} /> : null}

      {/* somehow, we need to recurvisely call the displays the rest of the comments here...
      perhaps it should be using  */}
    </div>
  );
}
