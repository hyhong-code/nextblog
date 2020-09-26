module.exports = (...roles) => async (req, res, next) => {
  // Handler user role not allowed to access
  if (!roles.includes(req.user.role)) {
    return res
      .status(403)
      .json({ errors: [{ msg: "No permission to access this resource." }] });
  }

  next();
};
