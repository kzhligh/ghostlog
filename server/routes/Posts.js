const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);

//show all posts
router.get("/index", (req, res) => {
  Post.find({})
    .lean()
    .then((posts) => {
      console.log(posts);
      res.send(posts);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.post("/new", (req, res) => {
  const post = new Post(req.body);
  post.save(() => res.redirect("/post/index"));

  //   res.send({ message: "fine" });
});

module.exports = router;
