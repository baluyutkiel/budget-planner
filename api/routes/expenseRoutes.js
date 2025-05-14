const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, date, category, bankID, bankName, expenseType, cost, selected } = req.body;
        
        const newExpense = new Expense({
            name,
            date: new Date(date),
            category,            
            bankID,
            bankName,
            userID: null, // TODO: replace with actual user ID
            expenseType,
            cost,
            selected
        });

        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        console.error('Error creating expense.', error);
        res.status(500).json({ message: 'Failed to create expense.', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const expense = await Expense.find();
        res.status(200).json(expense);
    } catch (error) {
        console.error('Error fetching expense list', error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/', async (req, res) => {
    const { ids } = req.body;
    try {
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Invalid or empty list of IDs' });
        }
        const result = await Expense.deleteMany({ _id: { $in: ids } });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No Expenses found to delete' });
        }
        res.status(200).json({ message: `${result.deletedCount} Expenses Deleted` });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete Expenses.', error });
    }
});

// GET: Retrieve total expenses for a specific month (from start to end of month)
router.get('/total', async (req, res) => {
    try {
        const { month, year } = req.query;
        
        if (!month || !year) {
            return res.status(400).json({ message: 'Month and year are required' });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const result = await Expense.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalExpense: { $sum: "$cost" }
                }
            }
        ]);

        const totalExpense = result.length > 0 ? result[0].totalExpense : 0;
        res.status(200).json({ totalExpense });

    } catch (error) {
        console.error('Error fetching total expenses', error);
        res.status(500).json({ message: 'Failed to fetch total expenses.', error });
    }
});

router.get('/non-variable-expenses/upcoming', async (req, res) => {
  try {
    // Get current date in UTC
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set to start of UTC day

    const oneWeekFromNow = new Date(today);
    oneWeekFromNow.setUTCDate(today.getUTCDate() + 7); // Add 7 days in UTC

    const expenses = await Expense.find({
      expenseType: 'Non-Variable Expense',
      date: {
        $gte: today,          // Start of today in UTC
        $lte: oneWeekFromNow  // End of 7th day in UTC
      }
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching upcoming variable expenses', error);
    res.status(500).json({ message: 'Failed to fetch upcoming variable expenses.', error });
  }
});

router.get('/recent', async(req, res) => {
    try { 
        const recentExpenses = await Expense.find()
            .sort({ date: -1})
            .limit(5);
        res.status(200).json(recentExpenses);
    } catch (error) {
        console.error('Error fetching recent transactions', error);
        res.status(500).json({ message: 'Failed to fetch recent transactions.', error})
    }
});

module.exports = router;