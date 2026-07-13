const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");

// Add Expense
router.post("/", async (req, res) => {
    try {
        const expense = new Expense(req.body);
        const savedExpense = await expense.save();

        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Get All Expenses
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Delete Expense
router.delete("/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);

        res.json({
            message: "Expense deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;