const router = require("express").Router();

const auth = require("../middlewares/auth");
const restrictTo = require("../middlewares/restrictTo");

const { readMyProfile, readPublicProfile } = require("../controllers/user");

router.route("/:username").get(readPublicProfile);
router.route("/").get(auth, readMyProfile);

module.exports = router;
