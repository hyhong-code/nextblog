const User = require("../models/User");
const Blog = require("../models/Blog");

exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      data: { users },
    });
  } catch (error) {
    console.error("[listUsers]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

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
