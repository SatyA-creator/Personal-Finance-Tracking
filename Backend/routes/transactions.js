const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/auth');

// Controllers
const incomeController = require('../controllers/income');
const expenseController = require('../controllers/expense');

// Income Routes
router.post('/income', authMiddleware, incomeController.addIncome);
router.get('/incomes', authMiddleware, incomeController.getIncomes);
router.delete('/income/:id', authMiddleware, incomeController.deleteIncome);

// Expense Routes
router.post('/expense', authMiddleware, expenseController.addExpense);
router.get('/expenses', authMiddleware, expenseController.getExpenses);
router.delete('/expense/:id', authMiddleware, expenseController.deleteExpense);

module.exports = router;
