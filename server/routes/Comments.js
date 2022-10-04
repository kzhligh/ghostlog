const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  comment: { type: String, required: true },
});

// const Comment = mongoose.model("Comment", commentSchema);

// // router.get("/index", (req, res) => {
// //   Comment.find({})
// //     .lean()
// //     .then((comments) => {
// //       console.log(comments);
// //       res.send(comments);
// //     })
// //     .catch((err) => {
// //       console.log(err.message);
// //     });
// // });

// router.post("/posts/", (req, res) => {
//   const comments = new Comment(req.body);
//   comments.save(() => res.redirect("/comments/index"));

//   //   res.send({ message: "fine" });
// });

module.exports = router;
