const { body } = require("express-validator");

exports.contactFormValidators = [
  body("name").not().isEmpty().withMessage("Name cannot be empty."),
  body("email").isEmail().withMessage("Email is required."),
  body("message")
    .not()
    .isEmpty()
    .isLength({ min: 20 })
    .withMessage("Message must be at least 20 characters long."),
];
