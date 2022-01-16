const { Product } = require("../models/products");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  // ambil product dari database dengan nama image
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    res.status(500).json({ success: false, message: "No products found" });
  }
  res.send(productList);
});

router.get(`/:id`, async (req, res) => {
  // dengan populate category, maka akan mengambil data category dan menampilkan data category
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) return res.status(400).send("Invalid Product");
  res.send(product);
});

router.post(`/`, async (req, res) => {
  // const category = await Category.findById(req.body.categoryId);
  // if (!category) return res.status(400).send("Invalid Category");

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

router.put(`/:id`, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid Product ID");
  }
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

router.delete(`/:id`, async (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "Product deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, message: err });
    });
});

router.get("/get/count", async (req, res) => {
  const Productcount = await Product.countDocuments();

  if (!Productcount) return res.status(400).send("Invalid Product");
  res.send({
    productCount: Productcount,
  });
});

router.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const product = await Product.find({ isFeatured: true }).limit(+count);
  if (!product)
    return res
      .status(400)
      .json({ success: false, message: "No products found" });
  res.send(product);
});

//
module.exports = router;
