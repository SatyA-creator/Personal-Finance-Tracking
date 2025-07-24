import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { INCOME_API, EXPENSE_API } from '../api/apiEndpoints';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const addIncome = async (income) => {
        try {
            await axios.post(INCOME_API.ADD, income, config);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding income');
        }
    };

    const getIncomes = async () => {
        try {
            const response = await axios.get(INCOME_API.GET, config);
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching incomes');
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axios.delete(INCOME_API.DELETE(id), config);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting income');
        }
    };

    const totalIncome = () => incomes.reduce((total, income) => total + income.amount, 0);

    const addExpense = async (expense) => {
        try {
            await axios.post(EXPENSE_API.ADD, expense, config);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding expense');
        }
    };

    const getExpenses = async () => {
        try {
            const response = await axios.get(EXPENSE_API.GET, config);
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching expenses');
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(EXPENSE_API.DELETE(id), config);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting expense');
        }
    };

    const totalExpenses = () => expenses.reduce((total, expense) => total + expense.amount, 0);

    const totalBalance = () => totalIncome() - totalExpenses();

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 4);
    };

    useEffect(() => {
        if (token) {
            getIncomes();
            getExpenses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
