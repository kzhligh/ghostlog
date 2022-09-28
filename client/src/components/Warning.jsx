import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Warning(props) {
  return (
    <div
      className="mb-0"
      style={{
        backgroundColor: "#ff80ff",
      }}
    >
      {props.phrase}
      <button
        type="button"
        className="btn btn-light btn-sm"
        onClick={() => {
          props.onClose();
        }}
      >
        X
      </button>
    </div>
  );
}
