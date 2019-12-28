const express = require("express");
const router = express.Router();
const blogController = require("./../controllers/blogController");
const verify = require("./../middlewares/verifyToken");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("welcome to blog page");
});

router.post("/create", blogController.createBlog);
router.get("/view/all", blogController.viewAllBlog);
router.get("/view/:blogId", blogController.viewEachBlog);
router.put("/edit/:blogId", blogController.editBlog);
router.delete("/delete/:blogId", blogController.deleteBlog);
router.get("/view", blogController.searchTerm);

module.exports = router;
