const express = require("express");
const router = express.Router();
const blogController = require("./../controllers/blogController");
// const verify = require("./../middlewares/verifyToken");
const verify = require("./../middlewares/verifyToken");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
});

router.get("/", function(req, res, next) {
  res.send("welcome to blog page");
});

router.post(
  "/create",
  verify,
  upload.single("blogImage"),
  blogController.createBlog
);
router.get("/view/all", blogController.viewAllBlog);
router.get("/view/:blogId", blogController.viewEachBlog);
router.put("/edit/:blogId", verify, blogController.editBlog);
router.delete("/delete/:blogId", verify, blogController.deleteBlog);
router.get("/view", blogController.searchTerm);

module.exports = router;
