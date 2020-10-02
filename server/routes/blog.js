const router = require("express").Router();

const auth = require("../middlewares/auth");
const restrictTo = require("../middlewares/restrictTo");
const validate = require("../middlewares/validate");
const { createBlogValidators } = require("../utils/validators/blog");

const {
  createBlog,
  listBlogs,
  scanBlogs,
  readBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");

router.route("/scan").get(scanBlogs);
router
  .route("/:slug")
  .get(readBlog)
  .delete(auth, deleteBlog)
  .put(auth, updateBlog);

router
  .route("/")
  .get(listBlogs)
  .post(auth, createBlogValidators, validate, createBlog);

module.exports = router;
