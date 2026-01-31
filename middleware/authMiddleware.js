const User = require("../models/user");

module.exports = async (req, res, next) => {
  if (!req.session.userId) {
    req.flash("error", "Please login first");
    return res.redirect("/login");
  }

  const user = await User.findById(req.session.userId);
  if (!user) {
    req.flash("error", "Invalid session");
    return res.redirect("/login");
  }

  req.user = user;
  next();
};