const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;
const saltRound = 10;

mongoose.connect(
  "mongodb://127.0.0.1:27017/itemsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("successfully connected to mongo 127.0.0.1:27017");
    }
  }
);

const historyRoute = require("./routes/History");
const itemsRoute = require("./routes/Items");
const macrosRoute = require("./routes/Macros");

app.use("/history", historyRoute);
app.use("/items", itemsRoute);
app.use("/macros", macrosRoute);

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  res.send({ token: `successfully signed up, welcome ${username}` });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
