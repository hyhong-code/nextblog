const { body } = require("express-validator");

exports.createTagValidator = [
  body("name").not().isEmpty().withMessage("Name is required."),
];
