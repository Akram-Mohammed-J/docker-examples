const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./connect");
const PORT = 3000;

const PostSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Post must have a name"],
  },
  description: {
    type: String,
    required: [true, "Post must have a description"],
  },
});
let Post = mongoose.model("Post", PostSchema);

const MONGO_URL =
  "YOUR_MONGO_CONNECTION_STRING";

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the world of express !!!!");
});

app.get("/getAllPosts", async (req, res) => {
  try {
    const posts = await Post.find({});
    if (posts.length == 0) {
      return res.status(200).json({
        message: "no posts found in db",
      });
    }
    res.status(200).json({
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      err: error,
    });
  }
});
app.post("/addpost", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ data: post });
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
});
const start = async () => {
  try {
    await connectDB(MONGO_URL);
    console.log("Connected to db ...");
    app.listen(
      PORT,
      console.log(`Server started successfully on port ${PORT}....`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
