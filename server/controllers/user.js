const User = require("../models/User");
const Blog = require("../models/Blog");

const { s3UploadImage, s3DeleteImage } = require("../utils/s3");

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

exports.updateUser = async (req, res, next) => {
  try {
    const { photo, username, password } = req.body;

    // Handle weak password
    if (password && password.length < 6) {
      return res.status(400).json({
        errors: [{ msg: "Password must be at least 6 characters long." }],
      });
    }

    let user = await User.findById(req.user._id);

    // Upload photo to s3
    if (photo) {
      if (user.photo) {
        // Delete existing s3 photo
        await s3DeleteImage(user.photo.key);
      }
      const uploadRes = await s3UploadImage(photo, "user");
      req.body.photo = { key: uploadRes.Key, url: uploadRes.Location };
    }

    // Update username
    if (username !== user.username) {
      const existingUser = await User.findOne({ username });

      // Handle username alrady in use
      if (existingUser) {
        return res.status(500).json({
          errors: [{ msg: `Username ${username} is already taken.` }],
        });
      }
    }

    // Update user
    Object.entries(req.body).forEach(([key, value]) => {
      user[key] = value;
    });
    user = await user.save({ validateBeforeSave: true });

    res.status(200).json({ data: { user } });
  } catch (error) {
    console.error("[updateUser]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};
