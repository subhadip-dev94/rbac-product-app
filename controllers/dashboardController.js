exports.admin = (req, res) => {
  res.render("dashboard/admin", { user: req.user });
};

exports.manager = (req, res) => {
  res.render("dashboard/manager", { user: req.user });
};

exports.employee = (req, res) => {
  res.render("dashboard/employee", { user: req.user });
};
