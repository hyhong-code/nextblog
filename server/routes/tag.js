const router = require("express").Router();

const {
  createTag,
  listTags,
  deleteTag,
  readTag,
} = require("../controllers/tag");
const { createTagValidator } = require("../utils/validators/tag");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const restrictTo = require("../middlewares/restrictTo");
const blogRouter = require("../routes/blog");

router.use("/:id/blogs", blogRouter);
router
  .route("/:slug")
  .get(readTag)
  .delete(auth, restrictTo("ADMIN"), deleteTag);

router
  .route("/")
  .post(auth, restrictTo("ADMIN"), createTagValidator, validate, createTag)
  .get(listTags);

module.exports = router;
