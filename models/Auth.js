const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  authToken: {
    type: String
  },
  tokenGenerationTime: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Auth", authSchema);
