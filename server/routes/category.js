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

const {
  createCategoryValidators,
  updateCategoryValidator,
} = require("../utils/validators/category");
const blogRouter = require("./blog");

router.use("/:categoryId/blogs", blogRouter);
router
  .route("/:slug")
  .get(readCategory)
  .put(
    auth,
    restrictTo("ADMIN"),
    updateCategoryValidator,
    validate,
    updateCategory
  )
  .delete(auth, restrictTo("ADMIN"), deleteCategory);

router
  .route("/")
  .get(listCategory)
  .post(
    auth,
    restrictTo("ADMIN"),
    createCategoryValidators,
    validate,
    createCategory
  );

module.exports = router;
