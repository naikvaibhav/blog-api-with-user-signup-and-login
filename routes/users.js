const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", userController.registerUser);
router.post("/signin", userController.signinUser);

module.exports = router;
