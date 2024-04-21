const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const upload = require("../multerConfig");

router.post("/products", upload.single("product_image"), async (req, res) => {
  try {
    const { product_name, pack_size, mrp, status, category } = req.body;
    const product_image = req.file ? req.file.path : "";
    const product = new Product({
      product_name,
      pack_size,
      mrp,
      product_image,
      status,
      category,
    });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const { search } = req.query;

    const condition = search
      ? {
          product_name: { $regex: new RegExp(search, "i") },
        }
      : {};

    const products = await Product.find(condition).populate("category");

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const { product_name, pack_size, mrp, status, category } = req.body;
    const product_image = req.file ? req.file.path : "";
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { product_name, pack_size, mrp, product_image, status, category },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
