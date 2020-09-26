const router = require("express").Router();

const {
  listCategory,
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const auth = require("../middlewares/auth");
const restrictTo = require("../middlewares/restrictTo");
const validate = require("../middlewares/validate");

const { createCategoryValidators } = require("../utils/validators/category");

router
  .route("/")
  .post(
    auth,
    restrictTo("ADMIN"),
    createCategoryValidators,
    validate,
    createCategory
  );

module.exports = router;
