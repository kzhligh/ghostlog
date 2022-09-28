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
      Please enter something
      <button
        type="button"
        class="btn btn-light btn-sm"
        onClick={() => {
          props.onClose();
        }}
      >
        X
      </button>
    </div>
  );
}
