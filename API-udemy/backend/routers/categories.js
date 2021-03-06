const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false, message: "No categories found" });
  }
  res.status(200).send(categoryList);
});

router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
    image: req.body.image,
  });

  category = await category.save();

  if (!category) {
    return res.status(500).send("the category cannot be created");
  }

  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).send("the category with the given ID was not found");
  }
  res.status(200).send(category);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
      image: req.body.image,
    },
    { new: true }
  );

  if (!category) {
    return res
      .status(404)
      .send(
        "the category with the given ID was not found / category not created"
      );
  }

  res.status(200).send(category);
});

router.delete(`/:id`, async (req, res) => {
  // const category = await Category.findByIdAndDelete(req.params.id);
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "Category deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, message: err });
    });
});

module.exports = router;
