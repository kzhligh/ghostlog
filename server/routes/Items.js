const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

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

const itemSchema = new mongoose.Schema({
  id: String,
  content: String,
});

const Item = mongoose.model("Item", itemSchema);

router.get("/", (req, res) => {
  Item.find((err, items) => {
    if (err) {
      console.log(err);
    } else {
      //mongoose.connection.close();
      const itemsArray = [];

      console.log("items are: ", items);

      items.forEach((item) => {
        itemsArray.push({ id: item.id, content: item.content });
      });
      res.send(itemsArray);
    }
  });
});

//posts one item to items array
router.post("/", (req, res) => {
  const item = new Item({
    id: req.body.id,
    content: req.body.content,
  });

  item.save().then((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully added: ", item);
    }
  });
  res.redirect("/");
});

router.delete("/:id", (req, res) => {
  const idToDelete = req.params.id;
  Item.findOneAndDelete({ id: idToDelete }, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted: ", item);
    }
  });
  res.redirect(200, "/");
});

module.exports = router;
