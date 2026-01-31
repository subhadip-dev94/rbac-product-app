const Product = require("../models/product");
const roles = require("../config/roles");

exports.list = async (req, res) => {
  const products = await Product.find({ isDeleted: false });

  res.render("products/list", {
    products,
    user: req.user,
    permissions: roles[req.user.role],
  });
};

exports.createForm = (req, res) => {
  res.render("products/create");
};

exports.create = async (req, res) => {
  try {
    await Product.create(req.body);
    req.flash("success", "Product added successfully");
    res.redirect("/products");
  } catch (err) {
    const errors = Object.values(err.errors).map(e => e.message);
    req.flash("error", errors.join(", "));
    res.redirect("/products/create");
  }
};

exports.editForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
};

exports.update = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    req.flash("success", "Product updated successfully");
    res.redirect("/products");
  } catch (err) {
    req.flash("error", "Validation failed");
    res.redirect(`/products/edit/${req.params.id}`);
  }
};

exports.delete = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
  req.flash("success", "Product deleted");
  res.redirect("/products");
};
