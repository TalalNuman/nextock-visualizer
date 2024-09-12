// src/components/StockForm.tsx
import { useState } from 'react';

export const StockForm = ({ onSubmit }) => {
  const [ticker, setTicker] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [checkCalculateReturns, setCheckCalculateReturns] = useState(false);

 const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      ...(ticker && { ticker }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(checkCalculateReturns !== undefined && { checkCalculateReturns }),
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Stock Data Query</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">Ticker:</label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
          placeholder="e.g. AAPL"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={checkCalculateReturns}
          onChange={(e) => setCheckCalculateReturns(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label className="ml-2 text-gray-700 text-sm">Calculate Daily Returns</label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};
