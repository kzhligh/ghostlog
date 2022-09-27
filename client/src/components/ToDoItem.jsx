import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ToDoItem(props) {
  return (
    <div>
      <p>
        {props.name.content}
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => props.onDel(props.name.id)}
        >
          X
        </button>
      </p>
    </div>
  );
}

export default ToDoItem;
