const Product = require("../models/product");

exports.getAll = async (req, res) => {
  const products = await Product.find({ isDeleted: false });
  res.json(products);
};

exports.create = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

exports.update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

exports.delete = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ message: "Product soft deleted" });
};
