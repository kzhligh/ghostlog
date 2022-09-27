const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

const items = [];

router.get("/", (req, res) => {
  res.send(JSON.stringify(items));
});

//posts one item to items array
router.post("/", (req, res) => {
  items.push(req.body);
  res.redirect("/items");
});

router.delete("/:id", (req, res) => {
  const indexOfObj = items.findIndex((object) => {
    return object.id === req.params.id;
  });
  items.splice(indexOfObj, 1);
  res.redirect(200, "/");
});

module.exports = router;
