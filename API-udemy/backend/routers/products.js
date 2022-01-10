const { Product } = require("../models/products");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  // ambil product dari database dengan nama image
  const productList = await Product.find().populate("category");
  if (!productList) {
    res.status(500).json({ success: false, message: "No products found" });
  }
  res.send(productList);
});

router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  // ambil data dari body request
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  // simpan ke database
  product = await product.save();
  if (!product) return res.status(500).send("the product cannot be created");
  res.status(200).send(product);
});

router.get(`/:id`, async (req, res) => {
  // dengan populate category, maka akan mengambil data category dan menampilkan data category
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) return res.status(400).send("Invalid Product");
  res.send(product);
});

router.put(`/:id`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) return res.status(400).send("the Product cannot be updated");
  res.send(product);
});

module.exports = router;
