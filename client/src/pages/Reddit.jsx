import React from "react";
import { useState, useEffect } from "react";
import Postbox from "../components/Postbox";
import Post from "../components/Post";

//this page will display essentially ALL the posts
export default function Reddit() {
  const [postsArray, setPostsArray] = useState([]);

  //the issue now is how to use useState to post ALL the posts...???

  useEffect(() => {
    getApi();
  }, []); //put postsArray

  function getApi() {
    // console.log("we here");
    // var responseClone;
    fetch("/post/index", { method: "GET" })
      .then((response) =>
        // responseClone = response.clone(); // 2
        response.json()
      )
      .then((data) => {
        console.log("SHEEE", data);
        //lets undo the data, and pre-prend it to our postsArray
        const newArray = [];
        data.forEach((post) => {
          newArray.push({
            username: post.username,
            content: post.content,
            id: post._id,
          });
        });
        console.log("after i populate new array", newArray);
        setPostsArray(newArray);
        console.log("my posts array is ", postsArray);
      });
  }

  //   function handleClick(event) {
  //     event.preventDefault();
  //     getApi();
  //   }

  return (
    <div>
      <Postbox />
      {postsArray.map((post) => {
        return (
          <Post username={post.username} key={post.id} content={post.content} />
        );
      })}
    </div>
  );
}
