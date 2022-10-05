const express = require("express"); //api framework
const bodyParser = require("body-parser"); //parse incoming request bodies
const mongoose = require("mongoose"); //odm

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Schema = mongoose.Schema;
const router = express.Router();

//Recursively populate comments of each document.
//Essentially, this nests populate() calls.
function autoPopulateComments(next) {
  this.populate("comments");
  next();
}

//-------------------------------POST MODEL-------------------------------//

//Post schema (represents a discussion question. It is the parent/"starter" of a thread).
//Requires a username to indicate who made the post.
//Requires content for the post.
const postSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    content: { type: String, required: true },
    //Use population. comments array will store id's of comments similar to concept of foreign keys.
    //references Comment schema
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  //Display when the post was createdAt + updatedAt
  { timestamps: true }
);

//Always (recursively) populate the comments field for our posts
postSchema
  .pre("findOne", autoPopulateComments)
  .pre("find", autoPopulateComments);

//Create Post model using postSchema
const Post = mongoose.model("Post", postSchema);

//-------------------------------COMMENT MODEL-------------------------------//

//Comment schema. Represents comment made on parent post/discussion, and comments on comments.
//Requires a username to indicate who made the post.
//Requires the comment itself for the post.
const commentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    comment: { type: String, required: true },
    //Use population. comments array will store id's of comments similar to concept of foreign keys.
    //references Comment schema
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  //Display when the comment was createdAt + updatedAt
  { timestamps: true }
);

//Always (recursively) populate the comments field for comments themselves
commentSchema
  .pre("findOne", autoPopulateComments)
  .pre("find", autoPopulateComments);

//Create Comment model using commentSchema
const Comment = mongoose.model("Comment", commentSchema);

//-------------------------------ROUTES FOR POSTS-------------------------------//

//Get route to fetch all our posts and their nested comments in a flat tree format.
router.get("/", (req, res) => {
  //Find all posts, console log them and send them as json. Catch any error.
  //Note, they are ordered by createdAt in a descending manner. New posts show up at the top.
  Post.find({})
    .sort({ createdAt: -1 })
    .then((posts) => {
      console.log(posts);
      res.json(posts);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//Post route to create one new post/start a discussion
router.post("/", (req, res) => {
  const post = new Post(req.body);
  //save the post to db and redirect to / in order to show all posts/nested comments
  post.save(() => res.redirect("/posts"));
});

//Get route to fetch a specific post and its nested children
router.get("/:postId", (req, res) => {
  //Find the post, and send it along with its comments in json
  Post.findById(req.params.postId)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//-------------------------------ROUTES FOR COMMENTS-------------------------------//

//Get route to view all comments available in the database in a flat tree for a given discussion (without post)
router.get("/:postId/comments", (req, res) => {
  //Find the post, and send post comments in json
  Post.findById(req.params.postId)
    //.populate("comments")
    .then((post) => {
      res.json(post.comments);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//Post route to create a new comment given a post
router.post("/:postId/comments", (req, res) => {
  //Create new comment
  const comment = new Comment(req.body);
  //Save comment
  comment
    .save()
    .then(() => Post.findById(req.params.postId))
    .then((post) => {
      //Add a comment to the back of the comments array and save the post
      post.comments.push(comment);
      return post.save();
    }) //after that, redirect or catch error
    .then(() => res.redirect("/posts"))
    .catch((err) => {
      console.log(err);
    });
});

//-------------------------------ROUTES FOR COMMENTS ON COMMENTS-------------------------------//

//FIX THIS
//Get route to view all comments given a comment
//note /replies is to differentiate from post routes in ROUTES FOR COMMENTS
//all comments on comments are considered to be "replies" to differentiate them from layer 1 comments of original posts
router.get("/:commentId/comments/replies", (req, res) => {
  Comment.findById(req.params.commentId).then((parentComment) => {
    res.json(parentComment.comments);
  });
});

//Post route to create a new comment given an existing comment
//Note, /new here differentiates from ROUTES FOR COMMENT
router.post("/:commentId/comments/new", (req, res) => {
  //create new comment
  const newComment = new Comment(req.body);
  newComment
    .save()
    .then(() => Comment.findById(req.params.commentId))
    .then((parentComment) => {
      //Add a comment to the back of the comments array and save the parent comment
      parentComment.comments.unshift(newComment);
      return parentComment.save();
    }) //after that, redirect or catch error
    .then(() => res.redirect("/posts"))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
// module.exports = Comment;
// module.exports = Post;
