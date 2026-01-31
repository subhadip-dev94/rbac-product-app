const roles = require("../config/roles");

module.exports = (permission) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const permissions = roles[userRole] || [];

    if (!permissions.includes(permission)) {
      req.flash(
        "error",
        "You don't have permission for this action."
      );
      return res.redirect("/products");

    }

    next();
  };
};