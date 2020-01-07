const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
  tags: {
    type: Array
  },
  blogImage: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Blog", blogSchema);
