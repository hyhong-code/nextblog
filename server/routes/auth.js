const router = require("express").Router();

const validate = require("../middlewares/validate");
const { registerValidators } = require("../utils/validators/Auth");

const { register } = require("../controllers/auth");

router.route("/register").post(registerValidators, validate, register);

module.exports = router;
