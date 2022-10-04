import React from "react";
import { useState, useEffect } from "react";

import Postbox from "./Postbox";

export default function Post(props) {
  const [showReplyPostbox, setShowReplyPostbox] = useState(false);
  const [buttonName, setButtonName] = useState("reply");

  function handleClick(event) {
    event.preventDefault();
    if (buttonName === "reply") {
      setShowReplyPostbox(true);
      setButtonName("close");
    } else if (buttonName === "close") {
      setShowReplyPostbox(false);
      setButtonName("reply");
    }
  }

  return (
    <div
      style={{
        borderStyle: "solid",
        borderColor: "black",
        marginTop: "5px",
        marginBottom: "5px",
      }}
    >
      <h3>{props.username} said:</h3>
      <p>{props.content}</p>
      <button onClick={handleClick}>{buttonName}</button>
      {/* !!!!!!!!!!!!PERHAPS NEED TO REPLACE POSTBOX BY COMMENTBOX */}
      {showReplyPostbox ? <Postbox /> : null}
    </div>
  );
}
