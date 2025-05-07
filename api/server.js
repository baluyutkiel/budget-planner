// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const accountRoutes = require('./routes/accountRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const savingsRoute = require('./routes/savingsRoutes');
const userRoutes = require('./routes/userRoutes');

const Account = require('./models/Account');
const Category = require('./models/Category');
const Expense = require('./models/Expense');
const Savings = require('./models/Savings');
const User = require('./models/User');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:4200' 
}));
app.use(bodyParser.json()); 

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // await Account.deleteMany({});
    // await Category.deleteMany({});
    // await Expense.deleteMany({});
    // await Savings.deleteMany({});
    // console.log('All accounts deleted (fresh DB)');
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));


app.use('/api/accounts', accountRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/savings', savingsRoute);
app.use('/api/user', userRoutes);


async function insertSampleSavings() {
  const count = await Savings.countDocuments();
  if (count === 0) {
    const sampleSavings = [
      {
        bankID: '123456789',
        date: new Date('2025-4-22'),
        name: 'interact',
        amount: 18.00,
        description: 'test'
      },
      {
        bankID: '987654321',
        date: new Date('2025-4-22'),
        name: 'interact2',
        amount: 18.23,
        description: 'test2'
      }
    ];

    try {
      await Savings.insertMany(sampleSavings);
      console.log('Successfully inserted Savings');
    } catch (error) {
      console.log('Failed to insert Savings:', error); 
    }
  }
}

// Testing Category Table
async function insertSampleCategories() {
  const count = await Category.countDocuments();
  if (count === 0) {
    const sampleGroceries = [
      { name: 'Groceries' },
      { name: 'Transportation' },
      { name: 'Rent' }
    ];
    
    try {
      await Category.insertMany(sampleGroceries); 
      console.log('Successfully inserted Categories'); 
    } catch (error) {
      console.log('Failed to insert Categories:', error); 
    }
  }
}

// Insert sample data for expenses
async function insertSampleExpenses() {
  const count = await Expense.countDocuments();
  if (count === 0) {
    const sampleExpenses = [
      {
        name: 'Netflix Subscription',
        date: new Date('2025-04-10'),
        category: '66166a8bfc13ae6f52d1f2f4',  // Use an existing category ObjectId from your DB
        bankID: '123456789',
        bankName: 'Chase',
        expenseType: 'Non-Variable Expense',
        cost: 15.99,
        selected: true
      },
      {
        name: 'Spotify Subscription',
        date: new Date('2025-04-11'),
        category: '66166a8bfc13ae6f52d1f2f4',  // Use an existing category ObjectId from your DB
        bankID: '987654321',
        bankName: 'Bank of America',
        expenseType: 'Variable Expense',
        cost: 9.99,
        selected: false
      }
    ];
    
    try {
      await Expense.insertMany(sampleExpenses); 
      console.log('Successfully inserted Expenses'); 
    } catch (error) {
      console.log('Failed to insert Expenses:', error); 
    }
  }
}

// insertSampleExpenses();
// insertSampleCategories();
// insertSampleSavings();

app.get('/', (req, res) => {
  res.send('Connected to MongoDB!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});