const router = require("express").Router();

const { contactForm } = require("../controllers/form");
const validate = require("../middlewares/validate");
const { contactFormValidators } = require("../utils/validators/form");

router.route("/contact").post(contactFormValidators, validate, contactForm);

module.exports = router;
