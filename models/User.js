const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  token: ""
});

module.exports = mongoose.model("User", userSchema);
