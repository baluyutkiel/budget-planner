const express = require('express');
const Savings = require('../models/Savings');
const router = express.Router();

// POST /api/savings
router.post('/', async (req, res) => {
    try {
      const { bankID, date, name, amount, description } = req.body;
  
      if (!name) {
        return res.status(400).json({ message: 'Account is required' });
      }
  
      const newSavings = new Savings({
        bankID,
        date, 
        name,
        amount,
        description
      });
  
      const savedSavings = await newSavings.save();
      res.status(201).json(savedSavings);
  
    } catch (error) {
      console.error('Error saving Savings:', error);
      res.status(500).json({ message: 'Failed to save Savings', error });
    }
  });

router.get('/', async (req, res) => {
    try {
      const savings = await Savings.find();
      res.status(200).json(savings);
    } catch (error) {
      console.error('Error fetching savings:', error);
      res.status(500).json({ message: error.message });
    }
});

// GET /api/savings/:bankID
router.get('/:bankID', async (req, res) => {
  try {
    const { bankID } = req.params;
    const savings = await Savings.find({ bankID });

    res.status(200).json(savings);
  } catch (error) {
    console.error('Error fetching savings by bankID:', error);
    res.status(500).json({ message: error.message });
  }
});

  module.exports = router;