const User = require("../models/User");
const Blog = require("../models/Blog");

exports.readMyProfile = async (req, res, next) => {};

exports.readPublicProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    // Handle user not found
    if (!user) {
      return res.status(404).json({
        errors: [{ msg: "User not found." }],
      });
    }

    const blogs = await Blog.find({ postedBy: user._id })
      .sort({
        updatedAt: -1,
      })
      .limit(10);

    res.status(200).json({
      data: { user, blogs },
    });
  } catch (error) {
    console.error("[readPublicProfile]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};
