const router = require("express").Router();

const validate = require("../middlewares/validate");
const {
  registerValidators,
  loginValidators,
} = require("../utils/validators/Auth");
const auth = require("../middlewares/auth");

const { register, login, loadUser, logout } = require("../controllers/auth");

router.route("/register").post(registerValidators, validate, register);
router.route("/login").post(loginValidators, validate, login);
router.route("/logout").get(auth, logout);
router.route("/").get(auth, loadUser);

module.exports = router;
