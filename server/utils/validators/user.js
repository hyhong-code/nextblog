const { body } = require("express-validator");

exports.updateUserValidators = [
  body("username")
    .isLength({ min: 3, max: 32 })
    .withMessage("Username must be between 3 and 32 characters long."),
  body("name")
    .not()
    .isEmpty()
    .isLength({ max: 32 })
    .withMessage("Name is required and must be under 32 characters long."),
  body("email").not().isEmpty().withMessage("Email is required."),
];
