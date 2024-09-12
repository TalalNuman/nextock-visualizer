// src/app/components/FilterModal.tsx
"use client";
import React, { useState } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Record<string, any>) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [ticker, setTicker] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [checkCalculateReturns, setCheckCalculateReturns] = useState(false);

  const handleApplyFilters = () => {
    onApplyFilters({ ticker, startDate, endDate, checkCalculateReturns });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-lg w-1/3">
      <h2 className="text-xl mb-4 text-[#333333]">Filter Options</h2>
        <label className="block mb-4 text-[#333333]">
          Ticker:
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
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
        <div className="flex justify-end">
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
  );
};
