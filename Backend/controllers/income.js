const Income = require('../models/incomeModel');

// Add Income
exports.addIncome = async (req, res) => {
  try {
    const { title, amount, date, category, description } = req.body;

    // Validate required fields
    if (!title || !amount || !date || !category) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const income = await Income.create({
      title,
      amount,
      date,
      category,
      description,
      user: req.user._id, // Associate with logged-in user
    });

    res.status(201).json(income);
  } catch (err) {
    console.error('Error adding income:', err);
    res.status(500).json({ message: 'Could not add income' });
  }
};

// Get All Incomes for Logged-in User
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    console.error('Error fetching incomes:', err);
    res.status(500).json({ message: 'Could not fetch incomes' });
  }
};

// Delete Income by ID (only if it belongs to the user)
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!income) {
      return res.status(404).json({ message: 'Income not found or unauthorized' });
    }

    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (err) {
    console.error('Error deleting income:', err);
    res.status(500).json({ message: 'Could not delete income' });
  }
};
