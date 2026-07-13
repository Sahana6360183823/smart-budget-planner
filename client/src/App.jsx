import { useState, useEffect } from "react";
import "./App.css";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [income, setIncome] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const API_URL = "http://localhost:5000/api/expenses";


  // Get expenses from MongoDB
  useEffect(() => {
    fetchExpenses();
  }, []);


  async function fetchExpenses() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.log(error);
    }
  }


  // Add Expense
  async function addExpense() {

    if (expenseName === "" || expenseAmount === "") {
      alert("Please enter expense details");
      return;
    }


    const newExpense = {
      name: expenseName,
      amount: Number(expenseAmount)
    };


    try {

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newExpense)
      });


      const savedExpense = await response.json();

      setExpenses([...expenses, savedExpense]);

      setExpenseName("");
      setExpenseAmount("");

    } catch (error) {
      console.log(error);
    }
  }



  // Delete Expense
  async function deleteExpense(id) {

    try {

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });


      setExpenses(
        expenses.filter((item) => item._id !== id)
      );

    } catch (error) {
      console.log(error);
    }
  }



  const totalExpenses = expenses.reduce(
    (total, item) => total + Number(item.amount),
    0
  );


  const remainingBalance =
    Number(income) - totalExpenses;



  return (

    <div className="container">

      <h1>💰 Smart Budget Planner</h1>


      <h3>Monthly Income</h3>

      <input
        type="number"
        placeholder="Enter your monthly income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />



      <h3>Expense Name</h3>

      <input
        type="text"
        placeholder="Enter expense name"
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}
      />



      <h3>Expense Amount</h3>

      <input
        type="number"
        placeholder="Enter expense amount"
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(e.target.value)}
      />



      <button onClick={addExpense}>
        Add Expense
      </button>



      <hr />


      <h2>
        Monthly Income : ₹ {income || 0}
      </h2>


      <h2>
        Total Expenses : ₹ {totalExpenses}
      </h2>


      <h2>
        Remaining Balance : ₹ {income ? remainingBalance : 0}
      </h2>



      <hr />


      <h2>Expenses</h2>



      {
        expenses.length === 0 ? (

          <p>No expenses added yet.</p>

        ) : (

          expenses.map((item) => (

            <div
              className="expense-card"
              key={item._id}
            >

              <span>
                <strong>{item.name}</strong>
                {" "} - ₹ {item.amount}
              </span>


              <button
                className="delete-btn"
                onClick={() => deleteExpense(item._id)}
              >
                Delete
              </button>


            </div>

          ))

        )
      }



      <hr />


      {/* Pie Chart */}

      <ExpenseChart expenses={expenses} />


    </div>

  );
}

export default App;