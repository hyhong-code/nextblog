const { body } = require("express-validator");

exports.createBlogValidators = [
  body("title")
    .isLength({ min: 3, max: 160 })
    .withMessage("Title must be between 3 and 160 characters."),
  body("content")
    .isLength({ min: 10, max: 100000 })
    .withMessage("Content is required."),
  body("categories")
    .not()
    .isEmpty()
    .withMessage("At least one category is requird."),
  body("tags").not().isEmpty().withMessage("At least one tag is requird."),
];
