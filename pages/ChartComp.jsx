import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({ labels, dataPoints, title = "My Line Chart" }) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.3)",
        tension: 0.3, // smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <Line data={data} options={options} />
    </div>
  );
}
