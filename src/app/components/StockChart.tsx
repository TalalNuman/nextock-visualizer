// src/components/StockComparisonChart.tsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { StockData } from "@/types";
import { borderColors, colors } from "@/libs/Colors";

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

interface StockComparisonChartProps {
  datasets: StockData[][];
  comparisonMetric: "close" | "open" | "high" | "low" | "volume";
}

export const StockChart = ({
  datasets,
  comparisonMetric,
}: StockComparisonChartProps) => {
  // In case of No data is Available, show this instead of Chart
  if (datasets.length === 0 || !datasets[0]?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-center text-gray-500 py-20">
        <svg
          className="w-16 h-16 mb-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M5.44 5.44a9 9 0 0112.72 0m0 12.72a9 9 0 01-12.72 0M9 12h6"
          />
        </svg>
        <h1 className="text-xl font-semibold">No Data Available</h1>
        <p className="mt-2 text-gray-400">
          Sorry, there is no data available for the selected Filters.
        </p>
      </div>
    );
  }

  // Prepare chart data
  const chartData = {
    labels: datasets[0].map((d) => d.date), // Setting Dates as x-axis
    datasets: datasets.map((dataset, index) => ({
      label: dataset[0]?.ticker || `Stock ${index + 1}`,
      data: dataset.map((d) => d[comparisonMetric]),
      borderColor: borderColors[index % borderColors.length],
      backgroundColor: colors[index % colors.length],
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const ticker = context.dataset.label || "Ticker"; // Fallback if no label is found
            const price = context.raw as number;
            return `${ticker}: ${price.toFixed(2)}`; // Format price to two decimal places
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
