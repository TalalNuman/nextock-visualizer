import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const StockChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Stock Price',
        data: data.map(d => d.close),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Price: $${context.raw}`;
          }
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

// import React from "react";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

// export const StockChart = ({ data }) => {
//   const labels = data.map((row) => row.date);
//   const prices = data.map((row) => row.close);
//   const dailyReturns = data.map((row) => row.dailyReturn);

//   const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Stock Prices',
//         data: prices,
//         borderColor: '#3498db', // Blue for main line
//         backgroundColor: 'rgba(52, 152, 219, 0.1)',
//         borderWidth: 2,
//       },
//       {
//         label: 'Daily Returns',
//         data: dailyReturns,
//         borderColor: '#e74c3c', // Red for returns
//         backgroundColor: 'rgba(231, 76, 60, 0.1)',
//         borderWidth: 2,
//         type: 'line',
//       },
//     ],
//   };

//   return <Line data={chartData} />;
// };


