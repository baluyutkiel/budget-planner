const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists by email or username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password, // Store plain text password (not secure, for testing only)
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password (plain text comparison)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with user details (excluding the password)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords for security
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, { password: 0 }); // Exclude the password for security
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
});

module.exports = router;