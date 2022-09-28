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
      console.log("successfully connected");
    }
  }
);

//const items = [];

//add some data validation
const itemSchema = new mongoose.Schema({
  id: Number,
  content: String,
});

const Item = mongoose.model("Item", itemSchema);

// const item = new Item({
//   id: 666,
//   content: "Omega Lance",
// });

// item.save().then(() => console.log("omega lance saved"));

router.get("/", (req, res) => {
  // Item.find({})

  //we send this array back

  // itemsArray.push("hi");
  // console.log("my first hi", itemsArray);

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
      console.log("final array is ", itemsArray);
      res.send(itemsArray);
    }
  });

  // // console.log(Item.find({}));
  // console.log("hi i am under the wotor");
  // //JSON.stringify(Item.find({}))
  // res.send();
});

//posts one item to items array
router.post("/", (req, res) => {
  //items.push(req.body);
  const item = new Item({
    id: req.body.id,
    content: req.body.content,
  });

  item.save().then((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`successfully added ${item}`);
    }
  });
  res.redirect("/items");
});

// router.delete("/:id", (req, res) => {
//   const indexOfObj = items.findIndex((object) => {
//     return object.id === req.params.id;
//   });
//   items.splice(indexOfObj, 1);
//   res.redirect(200, "/");
// });

module.exports = router;
