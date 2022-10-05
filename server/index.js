const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;

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

const usersRoute = require("./routes/Users");
const historyRoute = require("./routes/History");
const itemsRoute = require("./routes/Items");
const macrosRoute = require("./routes/Macros");

const postsRoute = require("./routes/Posts");
const commentsRoute = require("./routes/Comments");

app.use("/posts", postsRoute);
app.use("/comments", postsRoute);

app.use("/history", historyRoute);
app.use("/items", itemsRoute);
app.use("/macros", macrosRoute);
app.use("/users", usersRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
