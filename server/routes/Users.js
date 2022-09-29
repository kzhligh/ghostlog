const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
//WERE NOT IN REACT
// import { useNavigate } from "react-router-dom";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

const saltRound = 10;

//the two following parts could be made into 1 block of code (see notes from udemy)

//schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

//model
const User = mongoose.model("User", userSchema);

router.post("/signup", (req, res) => {
  //   const { username, password } = req.body;
  //   console.log(username, password);

  console.log("YO FOOOO");
  bcrypt.hash(req.body.password, saltRound, (err, hash) => {
    User.find({ username: req.body.username }, (err, result) => {
      if (result.length !== 0) {
        //means we found existing account
        //THIS GUARD SHOULD BE IN SIGNUP PAGE ITSELF. AND FETCH A 'GET'
        res.send({ message: "Username unavailable" });
      } else {
        const user = new User({
          username: req.body.username,
          //note were storing hash, NOT PW
          password: hash,
        });

        user.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ message: "new user saved to database" });
          }
        });
      }
    });
  });

  //res.send({ token: `successfully signed up, welcome ${username}` });
});

// router.post("/login", (req, res) => {
//   const { username, password } = req.body;
// });

module.exports = router;
