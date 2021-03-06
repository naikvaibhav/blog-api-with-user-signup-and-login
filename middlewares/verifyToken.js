const jwt = require("jsonwebtoken");
const appConfig = require("./../config/appConfig");
module.exports = function(req, res, next) {
  const token = req.header("authToken");
  if (!token) {
    return res.status(400).send("Access denied");
  }

  try {
    const verified = jwt.verify(token, appConfig.secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.send("Invalid token");
  }
};
