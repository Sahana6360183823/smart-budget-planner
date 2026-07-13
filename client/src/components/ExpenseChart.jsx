import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);


function ExpenseChart({ expenses }) {

  const data = {
    labels: expenses.map((item) => item.name),

    datasets: [
      {
        label: "Expenses",

        data: expenses.map((item) => item.amount),

        backgroundColor: [
          "red",
          "blue",
          "green",
          "orange",
          "purple",
          "yellow"
        ],

        borderWidth: 1
      }
    ]
  };


  return (
    <div>
      <h2>Expense Distribution</h2>

      {expenses.length > 0 ? (
        <Pie data={data} />
      ) : (
        <p>No expense data available</p>
      )}

    </div>
  );
}

export default ExpenseChart;