// src/app/components/FilterModal.tsx
"use client";
import { validTickers } from "@/utils";
import React, { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Record<string, string | boolean>) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
}) => {
  const [ticker, setTicker] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checkCalculateReturns, setCheckCalculateReturns] = useState(false);

  const handleApplyFilters = () => {
    onApplyFilters({ ticker, startDate, endDate, checkCalculateReturns });
    onClose();
  };
  // Back to Default
  const handleClearFilters = () => {
    setTicker("");
    setStartDate("");
    setEndDate("");
    setCheckCalculateReturns(false);
    onApplyFilters({
      ticker: "",
      startDate: "",
      endDate: "",
      checkCalculateReturns: false,
    });
    onClose();
  };
  if (!isOpen) return null;
  // validTickers
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl mb-4 text-[#333333]">Filter Options</h2>
        <label className="block mb-4 text-[#333333]">
          Ticker:
          <select
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className=" border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 py-3 border rounded w-full"
          >
            <option value="" disabled>
              Select a Ticker
            </option>

            {validTickers.map(
              (ticker) =>
                ticker && (
                  <option key={ticker} value={ticker}>
                    {ticker.charAt(0).toUpperCase() + ticker.slice(1)}
                  </option>
                )
            )}
          </select>
        </label>
        <label className="block mb-4 text-[#333333]">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-4 text-[#333333]">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-4 text-[#333333]">
          Calculate Returns:
          <input
            type="checkbox"
            checked={checkCalculateReturns}
            onChange={(e) => setCheckCalculateReturns(e.target.checked)}
            className="ml-2"
          />
        </label>
        <div className="flex justify-between">
          <button
            onClick={handleClearFilters}
            className="ml-2 px-4 py-2 bg-[#e74c3c] text-white rounded"
          >
            Clear Filters
          </button>
          <div>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Apply
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded ml-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
