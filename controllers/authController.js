const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.loginPage = (req, res) => {
  // if already logged in, redirect to products
  if (req.session.userId) {
    return res.redirect("/products");
  }

  res.render("auth/login");
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    req.flash("error", "Invalid username or password");
    return res.redirect("/login");
  }

  req.session.userId = user._id;

  if (user.role === "admin") return res.redirect("/dashboard/admin");
  if (user.role === "manager") return res.redirect("/dashboard/manager");
  return res.redirect("/dashboard/employee");
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
};