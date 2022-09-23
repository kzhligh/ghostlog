import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function ToDoItem(props) {
  return (
    <div>
      <p>
        {props.name.content}
        <Button onClick={() => props.onDel(props.name.id)}>X</Button>
      </p>
    </div>
  );
}

export default ToDoItem;
