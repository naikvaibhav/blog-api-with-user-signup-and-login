const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
