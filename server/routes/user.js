const router = require("express").Router();

const auth = require("../middlewares/auth");
const restrictTo = require("../middlewares/restrictTo");
const { updateUserValidators } = require("../utils/validators/user");
const validate = require("../middlewares/validate");

const {
  listUsers,
  readPublicProfile,
  updateUser,
} = require("../controllers/user");
const blogRouter = require("./blog");

router.use("/:userId/blogs", blogRouter);

router.route("/:username").get(readPublicProfile);
router
  .route("/")
  .get(listUsers)
  .put(auth, updateUserValidators, validate, updateUser); // Update signed in user

module.exports = router;
