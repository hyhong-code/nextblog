const router = require("express").Router({ mergeParams: true });

const auth = require("../middlewares/auth");
const restrictTo = require("../middlewares/restrictTo");
const validate = require("../middlewares/validate");
const { createBlogValidators } = require("../utils/validators/blog");

const {
  createBlog,
  listBlogs,
  scanBlogs,
  searchBlogs,
  readBlog,
  updateBlog,
  deleteBlog,
  listSimilarBlogs,
  listUserBlogs,
} = require("../controllers/blog");

router.route("/scan").get(scanBlogs);
router.route("/search").get(searchBlogs);
router.route("/similar").post(listSimilarBlogs);
router.route("/me").post(auth, listUserBlogs);
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
