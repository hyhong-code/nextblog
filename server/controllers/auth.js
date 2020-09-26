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
    res.cookie("AUTH_TOKEN", token, {
      maxAge: parseInt(process.env.COOKIE_MAXAGE),
    });
    res.status(201).json({
      data: { token },
    });
  } catch (error) {
    console.error("[ERROR: register]", error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Handle email not found
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        errors: [{ msg: `Cannot find account with email ${email}.` }],
      });
    }

    // Hanlde wrong password
    if (!(await user.isCorrectPassword(password))) {
      return res.status(401).json({
        errors: [{ msg: `Invalid credentials.` }],
      });
    }

    // Send back a token
    const token = user.genJwtToken();
    res.cookie("AUTH_TOKEN", token, {
      maxAge: parseInt(process.env.COOKIE_MAXAGE),
    });
    res.status(201).json({
      data: { token },
    });
  } catch (error) {
    console.error("[ERROR: register]", error);
  }
};

exports.loadUser = (req, res, next) => {
  res.status(200).json({ data: { user: req.user } });
};

exports.logout = (req, res, next) => {
  // Clear the token on cookies
  res.clearCookie("AUTH_TOKEN");
  res.status(200).json({ data: { msg: "Logout success." } });
};

exports.adminAccess = (req, res, next) => {
  res.status(200).json({
    data: { access: true },
  });
};

exports.userAccess = (req, res, next) => {
  res.status(200).json({
    data: { access: true },
  });
};
