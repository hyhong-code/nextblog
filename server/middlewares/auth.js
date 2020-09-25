const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let token;

    // Try extract token from authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.startsWith("Bearer").split(" ")[1];
    }

    // Try extract token from cookies
    if (req.cookies && req.cookies["AUTH_TOKEN"]) {
      token = req.cookies["AUTH_TOKEN"];
    }

    // Handle token not found
    if (!token) {
      return res.status(401).json({
        errors: [{ msg: "Invalid credentials." }],
      });
    }

    // Extract user's id from token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        errors: [{ msg: "Invalid credentials." }],
      });
    }

    const user = await User.findById(decoded.id);

    // Handle user not found.
    if (!user) {
      return res.status(404).json({
        errors: [{ msg: "Account not found." }],
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("[ERROR - auth middleware]", error);
    return res.status(400).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};
