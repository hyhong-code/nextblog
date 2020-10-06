const router = require("express").Router();

const auth = require("../middlewares/auth");
const restrictTo = require("../middlewares/restrictTo");

const { listUsers, readPublicProfile } = require("../controllers/user");
const blogRouter = require("./blog");

router.use("/:userId/blogs", blogRouter);

router.route("/:username").get(readPublicProfile);
router.route("/").get(listUsers);

module.exports = router;
