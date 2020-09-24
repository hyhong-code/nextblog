const router = require("express").Router();

const validate = require("../middlewares/validate");
const {
  registerValidators,
  loginValidators,
} = require("../utils/validators/Auth");

const { register, login } = require("../controllers/auth");

router.route("/register").post(registerValidators, validate, register);
router.route("/login").post(loginValidators, validate, login);

module.exports = router;
