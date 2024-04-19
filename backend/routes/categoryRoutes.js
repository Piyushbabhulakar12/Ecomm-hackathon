const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.post('/categories', async (req, res) => {
    try {
        const { category_name, description, status } = req.body;
        const category = new Category({ category_name, description, status });
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
});


router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

router.get('/categories/:id', async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  });


  router.put('/categories/:id', async (req, res) => {
    try {
      const { category_name, description, status } = req.body;
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { category_name, description, status }, { new: true });
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update category' });
    }
  });

  
router.delete('/categories/:id', async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  });


module.exports = router;