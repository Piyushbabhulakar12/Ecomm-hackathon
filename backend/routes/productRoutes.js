const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category'); 


router.post('/products', async (req, res) => {
  try {
    const { product_name, pack_size, mrp, product_image, status, category_id } = req.body;

    console.log(category_id);

    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const product = new Product({ product_name, pack_size, mrp, product_image, status, category: category });
    console.log(product);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});


router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


module.exports = router;