const { body } = require("express-validator");

exports.createCategoryValidators = [
  body("name").not().isEmpty().withMessage("Name is required."),
];
