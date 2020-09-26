const { body } = require("express-validator");

exports.createCategoryValidators = [
  body("name").not().isEmpty().withMessage("Name is required."),
];

exports.updateCategoryValidator = [
  body("name").not().isEmpty().withMessage("Name is required."),
];
