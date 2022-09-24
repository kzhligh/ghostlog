import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";
import ToDoItem from "./components/ToDoItem";
import { v1 as uuidv1 } from "uuid";
import Warning from "./components/Warning";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import History from "./components/History";

function App() {
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
    fetch(`/items/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    setNewItemList((prevValue) => {
      return prevValue.filter((item) => {
        return item.id !== id;
      });
    });
  }

  function handleSubmit() {
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

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/history" component={History} />
        </Switch>
      </Router>
      {/* <a href="/history">history</a> */}
      <form>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter something"
          value={newItem.content}
        />
        <Button onClick={handleSubmit}>Add</Button>
      </form>

      {warning ? <Warning /> : null}

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
  );
}

export default App;
