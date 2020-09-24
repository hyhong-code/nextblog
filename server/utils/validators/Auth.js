const { body } = require("express-validator");

exports.registerValidators = [
  body("name").not().isEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("Please provide a valid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

exports.loginValidators = [
  body("email").not().isEmpty().withMessage("Name is required."),
  body("password").not().isEmpty().withMessage("Password is required."),
];
