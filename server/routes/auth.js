const router = require("express").Router();

const validate = require("../middlewares/validate");
const {
  registerValidators,
  loginValidators,
} = require("../utils/validators/Auth");
const auth = require("../middlewares/auth");
const restrictTo = require("../middlewares/restrictTo");

const {
  register,
  login,
  loadUser,
  logout,
  adminRoute,
  userRoute,
} = require("../controllers/auth");

router.route("/register").post(registerValidators, validate, register);
router.route("/login").post(loginValidators, validate, login);
router.route("/logout").get(auth, logout);
router.route("/admin").get(auth, restrictTo("ADMIN"), adminRoute);
router.route("/user").get(auth, restrictTo("USER"), userRoute);
router.route("/").get(auth, loadUser);

module.exports = router;
