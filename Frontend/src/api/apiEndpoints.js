// Define your base URL here
const BASE_URL = "http://localhost:5000/api/v1";

// Auth endpoints
export const AUTH_API = {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    PROFILE: `${BASE_URL}/auth/profile`,
};

// Income endpoints
export const INCOME_API = {
    ADD: `${BASE_URL}/income/add`,        // POST
    GET: `${BASE_URL}/income`,            // GET all
    DELETE: (id) => `${BASE_URL}/income/delete/${id}`,  // DELETE
};

// Expense endpoints
export const EXPENSE_API = {
    ADD: `${BASE_URL}/expense/add`,
    GET: `${BASE_URL}/expense`,
    DELETE: (id) => `${BASE_URL}/expense/delete/${id}`,
};
