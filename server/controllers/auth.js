const shortId = require("shortid");

const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    // Handle email taken
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already in use." }] });
    }

    // Create user
    const username = shortId.generate();
    user = await User.create({
      ...req.body,
      username,
      profile: `${process.env.CLIENT_URL}/profile/${username}`,
    });

    // Send back a token
    const token = user.genJwtToken();
    res.status(201).json({
      data: { token },
    });
  } catch (error) {
    console.error("[ERROR: register]", error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Handle email taken
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        errors: [{ msg: `Cannot find account with email ${email}.` }],
      });
    }

    // Create user
    const username = shortId.generate();
    user = await User.create({
      ...req.body,
      username,
      profile: `${process.env.CLIENT_URL}/profile/${username}`,
    });

    // Send back a token
    const token = user.genJwtToken();
    res.status(201).json({
      data: { token },
    });
  } catch (error) {
    console.error("[ERROR: register]", error);
  }
};
