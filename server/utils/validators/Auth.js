const { body } = require("express-validator");

exports.registerValidators = [
  body("name")
    .isLength({ max: 32 })
    .not()
    .isEmpty()
    .withMessage("Name is required and must be under 32 characters long."),
  body("email").isEmail().withMessage("Please provide a valid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

exports.loginValidators = [
  body("email").not().isEmpty().withMessage("Name is required."),
  body("password").not().isEmpty().withMessage("Password is required."),
];
