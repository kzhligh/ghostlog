const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 5000;

const items = [{ id: 0, content: "default" }];

app.get("/items", (req, res) => {
  res.send(JSON.stringify(items));
});

//this posts one item
app.post("/items", (req, res) => {
  items.push(req.body);
  //res.redirect("/items");
});

//problem CURRENTLY my delete deletes ALL if i click oon the last item
app.delete("/items/:id", (req, res) => {
  // items = items.filter((item) => {
  //   return item.id !== req.params.id;
  // });

  const indexOfObj = items.findIndex((object) => {
    return object.id === req.params.id;
  });
  items.splice(indexOfObj, 1);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
