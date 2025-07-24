const Expense = require('../models/expenseModel');

// Add Expense
exports.addExpense = async (req, res) => {
  const { title, amount, date, category, description } = req.body;

  // Validate input
  if (!title || !amount || !date || !category) {
    return res.status(400).json({ message: 'All required fields must be provided.' });
  }

  try {
    const expense = await Expense.create({
      title,
      amount,
      date,
      category,
      description,
      user: req.user._id  // Multi-user support
    });
    res.status(201).json(expense);
  } catch (err) {
    console.error('Error adding expense:', err);
    res.status(500).json({ message: 'Could not add expense. Please try again later.' });
  }
};

// Get Expenses by User
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).json({ message: 'Could not fetch expenses. Please try again later.' });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).json({ message: 'Could not delete expense. Please try again later.' });
  }
};
