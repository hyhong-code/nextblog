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

router
  .route("/:slug")
  .get(readTag)
  .delete(auth, restrictTo("ADMIN"), deleteTag);

router
  .route("/")
  .post(auth, createTagValidator, validate, createTag)
  .get(listTags);

module.exports = router;
