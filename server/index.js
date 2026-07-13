// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Connect MongoDB
const connectDB = require("./config/db");

// Expense routes
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Test route
app.get("/api/test", (req, res) => {
    res.json({
        message: "Frontend connected successfully!"
    });
});

// Expense API routes
app.use("/api/expenses", expenseRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Smart Budget Planner Backend is running on port ${PORT}`);
});