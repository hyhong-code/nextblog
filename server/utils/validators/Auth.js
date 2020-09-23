const { body } = require("express-validator");

exports.registerValidators = [
  body("username").not().isEmpty().withMessage("Username is required."),
  body("name").not().isEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("Please provide a valid email address."),
  body("profile").not().isEmpty().withMessage("Profile is required."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];
