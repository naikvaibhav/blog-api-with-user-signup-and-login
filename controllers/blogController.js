const BlogModel = require("./../models/Blog");
const response = require("./../libs/responseLib");
const shortid = require("shortid");
const mongoose = require("mongoose");

const createBlog = async (req, res) => {
  let blogId = shortid.generate();
  let today = Date.now();
  let newBlog = new BlogModel({
    _id: new mongoose.Types.ObjectId(),
    blogId: blogId,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    category: req.body.category,
    author: req.body.author,
    createdOn: today,
    lastModified: today,
    // blogImage: "http://localhost:3001/uploads/" + req.file.filename,
    user: req.user.userInfo._id
  });
  let tags =
    req.body.tags != undefined && req.body.tags != null && req.body.tags != ""
      ? req.body.tags.split(",")
      : [];
  newBlog.tags = tags;

  try {
    const blog = await newBlog.save();
    let apiResponse = response.generate(
      false,
      "Blog created successfully",
      201,
      blog
    );
    res.send(apiResponse);
  } catch (err) {
    console.log(err);
    let apiResponse = response.generate(true, "Access deny", 500, null);
    res.send(apiResponse);
  }
  // newBlog.save().then(data=>{let apiResponse = response.generate(
  //   false,
  //   "Blog created successfully",
  //   201,
  //   data
  // )
  // res.send(apiResponse)}).catch(err=>{console.log(err);
  //   let apiResponse = response.generate(true, err.message, 500, null);
  //   res.send(apiResponse);})
};

const viewAllBlog = async (req, res) => {
  try {
    const blogs = await BlogModel.find().select("-__v");
    if (blogs.length <= 0) {
      let apiResponse = response.generate(
        true,
        "No blogs found in the database",
        400,
        null
      );
      return res.send(apiResponse);
    }
    let apiResponse = response.generate(false, "All blogs fetched", 200, {
      blogs: blogs
    });
    res.send(apiResponse);
  } catch (err) {
    console.log(err);
    let apiResponse = response.generate(true, err.message, 500, null);
    res.send(apiResponse);
  }
};

const deleteBlog = async (req, res) => {
  try {
    let getUser = await BlogModel.findOne({ blogId: req.params.blogId });
    if (getUser.user == req.user.userInfo._id) {
      let deleteBlog = await BlogModel.deleteOne({ blogId: req.params.blogId });
      console.log("deleteBlog", deleteBlog);
      if (!deleteBlog) {
        let apiResponse = response.generate(
          true,
          "No blog found to be deleted",
          400,
          null
        );
        return res.send(apiResponse);
      }
      let apiResponse = response.generate(
        false,
        "Blog delted successfully",
        200,
        getUser
      );
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(
        true,
        "The signed-in user is not the author of the blog",
        500,
        null
      );
      res.send(apiResponse);
    }
  } catch (err) {
    console.log(err);
    let apiResponse = response.generate(true, err.message, 500, null);
    res.send(apiResponse);
  }
};

const viewEachBlog = async (req, res) => {
  try {
    let eachBlog = await BlogModel.findOne({ blogId: req.params.blogId });
    if (!eachBlog) {
      let apiResponse = response.generate(
        true,
        "No blog found for this blogId",
        400,
        null
      );
      return res.send(apiResponse);
    }
    eachBlog.views += 1;
    await eachBlog.save();
    let apiResponse = response.generate(false, "Blog found", 200, eachBlog);
    res.send(apiResponse);
  } catch (err) {
    console.log(err);
    let apiResponse = response.generate(true, err.message, 500, null);
    res.send(apiResponse);
  }
};

const editBlog = async (req, res) => {
  let options = req.body;
  try {
    let getUser = await BlogModel.findOne({ blogId: req.params.blogId });
    if (getUser.user == req.user.userInfo._id) {
      let editBlog = await BlogModel.updateOne(
        { blogId: req.params.blogId },
        options
      );
      if (!editBlog) {
        let apiResponse = response.generate(true, "No blog found", 400, null);
        return res.send(apiResponse);
      }

      let apiResponse = response.generate(
        false,
        "Blog edited successfully",
        201,
        editBlog
      );
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(
        true,
        "The signed-in user is not the author of the blog",
        500,
        null
      );
      res.send(apiResponse);
    }
  } catch (err) {
    console.log(err);
    let apiResponse = response.generate(true, err.message, 500, null);
    res.send(apiResponse);
  }
};

const searchTerm = async (req, res) => {
  const match = {};
  if (req.query.title) {
    match.title = req.query.title;
  }
  if (req.query.author) {
    let author =
      req.query.author.charAt(0).toUpperCase() + req.query.author.slice(1);
    console.log(author);
    match.author = author;
  }
  if (req.query.category) {
    match.category = req.query.category;
  }
  try {
    const blogs = await BlogModel.find(match).select("-__v");
    if (blogs.length <= 0) {
      let apiResponse = response.generate(
        true,
        "No blogs found in the database",
        400,
        null
      );
      return res.send(apiResponse);
    }
    let apiResponse = response.generate(false, "All blogs fetched", 200, blogs);
    res.send(apiResponse);
  } catch (err) {
    console.log(err);
    let apiResponse = response.generate(true, err.message, 500, null);
    res.send(apiResponse);
  }
};

module.exports = {
  createBlog: createBlog,
  viewAllBlog: viewAllBlog,
  deleteBlog: deleteBlog,
  viewEachBlog: viewEachBlog,
  editBlog: editBlog,
  searchTerm: searchTerm
};
