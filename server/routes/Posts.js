const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Schema = mongoose.Schema;

const router = express.Router();

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  //we're putting ids in this array
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model("Post", postSchema);

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  comment: { type: String, required: true },
  //   timestamp: { timestamps: true },
});

const Comment = mongoose.model("Comment", commentSchema);

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

//here we must use reference association. acting like FK
router.post("/:postId/comments", (req, res) => {
  const comment = new Comment(req.body);
  comment
    .save()
    .then(() => Post.findById(req.params.postId))
    .then((post) => {
      //when found, add a comment array, to the front of it
      post.comments.unshift(comment);
      console.log("the comment im putting", comment);
      //again, you must save the post
      return post.save();
    }) //after that, redirect or catch error
    .then(() => res.redirect("/post/index"))
    .catch((err) => {
      console.log(err);
    });

  //res.redirect("/post/index"))
});

router.get("/:postId/comments", (req, res) => {
  Post.findById(req.params.postId)
    .lean()
    .populate("comments")
    .then((post) => {
      //WHY WE SEND SO MANY POSTS HERE? it checks all posts
      //SOMETHING is messed up here
      console.log("were sending posts here boi", post.comments);
      //this sends over the entire post
      if (post.comments !== undefined) {
        res.send(post.comments);
      }
      //comments[0].comment
    });

  //res.redirect("/post/index"))
});
// router.post("/:postId/comments", (req, res) => {
//     const comment = new Comment(req.body);
//     comment
//       .save(() => res.redirect("/post/index"))
//       .catch((err) => {
//         console.log(err);
//       });
//   });

router.get("/:postId", (req, res) => {
  console.log("the post id is ", req.params.postId);
  Post.findById(req.params.postId)
    .lean()
    .then((post) => {
      console.log(post);
      res.send(post);
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

// router.get("/index", (req, res) => {
//   Comment.find({})
//     .lean()
//     .then((comments) => {
//       console.log(comments);
//       res.send(comments);
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

module.exports = router;
