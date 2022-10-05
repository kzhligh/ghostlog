const chai = require("chai"); //assertion lib
const chaiHttp = require("chai-http");
//const { describe, it } = require("mocha"); //testing framework
const server = require("../index");
//const agent = chai.request.agent(server);
// const Comment = require("../routes/Posts");
// const Post = require("../routes/Posts");

//const should =
chai.should();

chai.use(chaiHttp);

describe("discussion questions API", function () {
  // test the root GET route

  describe("GET /posts", () => {
    it("It should GET all the posts and their children", (done) => {
      chai
        .request(server)
        .get("/posts")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          // response.body.length.should.be.eq(27);
          done();
        });
    });

    it("It should display a 404 status since mispelling the get url", (done) => {
      chai
        .request(server)
        .get("/post")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  // test POST a new post/discussion route

  describe("POST /posts", () => {
    const post = {
      username: "ProfessorX",
      content: "How is everyone?",
    };
    it("It should POST a new post/discussion", (done) => {
      chai
        .request(server)
        .post("/posts")
        .send(post)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          //SHOULD ADD THESE??
          // response.body.should.have.property("username").eq("ProfessorX");
          // response.body.should.have.property("content").eq("How is everyone?");
          // response.body.length.should.be.eq(26);
          done();
        });
    });
    // after(function () {
    //   Post.findOneAndDelete(post);
    // });
  });

  // test GET post by id route

  describe("GET /posts/:postId", () => {
    it("It should GET the post specified by postId with its children", (done) => {
      const postId = "633d1252ace601bd2f280a74";

      chai
        .request(server)
        .get("/posts/" + postId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("username");
          response.body.should.have.property("content");
          response.body.should.have.property("createdAt");
          response.body.should.have.property("updatedAt");
          response.body.should.have.property("comments");
          response.body.should.have
            .property("_id")
            .eq("633d1252ace601bd2f280a74");
          done();
        });
    });
  });

  // test GET comments by post id
  // test POST comments given a post id
  // test GET comments of a comment (given its id)
  // test POST comments to a comment (given its id)
});
