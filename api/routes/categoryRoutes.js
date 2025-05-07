const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
      res.status(500).json({ message: err.message });
    }
});

// POST /api/category
router.post('/', async (req, res) => {
    try {
      const { userId, accountId, name } = req.body;
  
      if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
      }
  
      const newCategory = new Category({
        name,
        userId: userId || null,      
        accountId: accountId || null  
      });
  
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
  
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ message: 'Failed to create category', error });
    }
  });

router.delete('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Category not found' }); 
        }
        res.status(200).json({ message: 'Category Succesfully Deleted.' });
    } catch (error) {
        console.error('Error Deleting Category', error);
        res.status(500).json({ message: 'Failed to delete category', error});
    }
});

module.exports = router;