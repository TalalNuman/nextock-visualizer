import React from "react";

interface StockPickerProps {
  comparisonMetric: string;
  onComparisonMetricChange: (metric: string) => void;
  availableMetrics: string[];
}

export const StockPicker = ({
  comparisonMetric,
  onComparisonMetricChange,
  availableMetrics,
}: StockPickerProps) => {
  return (
    <label className="block mb-2 text-black">
      Compare By:
      <select
        value={comparisonMetric}
        onChange={(e) => onComparisonMetricChange(e.target.value)}
        className="ml-2 border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {availableMetrics.map(
          (metric) =>
            metric && (
              <option key={metric} value={metric}>
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </option>
            )
        )}
      </select>
    </label>
  );
};
