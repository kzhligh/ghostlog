const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;

const historyRoute = require("./routes/History");
const itemsRoute = require("./routes/Items");
const macrosRoute = require("./routes/Macros");

app.use("/history", historyRoute);
app.use("/items", itemsRoute);
app.use("/macros", macrosRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
