const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogId: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: " "
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: " "
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  tags: []
});

module.exports = mongoose.model("Blog", blogSchema);
