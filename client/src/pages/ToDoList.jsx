import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import ToDoItem from "../components/ToDoItem";
import { v1 as uuidv1 } from "uuid";
import Warning from "../components/Warning";

export default function ToDoList() {
  const [warning, setWarning] = useState(false);
  const [itemList, setNewItemList] = useState([]);
  const [newItem, setNewItem] = useState({
    id: null,
    content: "",
  });

  useEffect(() => {
    apiGet();
  }, []);

  function apiGet() {
    fetch("/items", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setNewItemList(data);
        console.log(data);
      });
  }

  function apiPost() {
    fetch("/items", {
      method: "POST",
      body: JSON.stringify({ id: newItem.id, content: newItem.content }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  function handleChange(event) {
    //we need different ids for same content...
    const newId = uuidv1();
    const item = event.target.value;
    setNewItem({
      id: newId,
      content: item,
    });
  }

  //need a redirect on the other side
  function handleDelete(id) {
    var responseClone;
    fetch(`/items/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        responseClone = response.clone(); // 2
        return response.json();
      })
      .then(
        (data) => console.log(data),
        function (rejectionReason) {
          // 3
          console.log(
            "Error parsing JSON from response:",
            rejectionReason,
            responseClone
          ); // 4
          responseClone
            .text() // 5
            .then(function (bodyText) {
              console.log(
                "Received the following instead of valid JSON:",
                bodyText
              ); // 6
            });
        }
      );

    setNewItemList((prevValue) => {
      return prevValue.filter((item) => {
        return item.id !== id;
      });
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (newItem.content === "") {
      setWarning(true);
      return;
    } else {
      setWarning(false);
      setNewItemList((prevValue) => {
        return [...prevValue, newItem];
      });
      apiPost();
      setNewItem({
        id: null,
        content: "",
      });
    }
  }

  function closeWarning() {
    setWarning(false);
  }

  return (
    <div className="App">
      <form>
        <div className="form-group col-md-6">
          <label htmlFor="todoItem">To-Do List</label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter something"
            value={newItem.content}
            className="form-control"
            id="todoItem"
          />
          <small id="emailHelp" className="form-text text-muted">
            Get sh*t done baba
          </small>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Add
        </button>
      </form>

      <div>
        {warning ? (
          <Warning phrase="Please enter something" onClose={closeWarning} />
        ) : null}
      </div>

      <div className="todofield">
        {itemList.map((item) => {
          return (
            <ToDoItem
              onDel={handleDelete}
              key={item.id}
              id={item.id}
              name={item}
            />
          );
        })}
      </div>
    </div>
  );
}
