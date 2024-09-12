// src/components/StockTable.tsx
import React, { useState, useMemo } from "react";
import { Pagination } from "./Pagination";

export const StockTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });

  const recordsPerPage = 15;
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  // Sorting logic
  const sortedData = useMemo(() => {
    const sorted = [...data];
    if (sortConfig !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [data, sortConfig]);

  // Handle column sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = sortedData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex-1 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Date{" "}
              {sortConfig.key === "date"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("open")}
            >
              Open{" "}
              {sortConfig.key === "open"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("high")}
            >
              High{" "}
              {sortConfig.key === "high"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("low")}
            >
              Low{" "}
              {sortConfig.key === "low"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("close")}
            >
              Close{" "}
              {sortConfig.key === "close"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("volume")}
            >
              Volume{" "}
              {sortConfig.key === "volume"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("ticker")}
            >
              Ticker{" "}
              {sortConfig.key === "ticker"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            {data[0]?.dailyReturn !== undefined && (
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("dailyReturn")}
              >
                Daily Return (%){" "}
                {sortConfig.key === "dailyReturn"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-[#f7f7f7]" : "bg-white"
              } bg-gray-50 text-black`}
            >
              <td className="px-6 py-4 whitespace-nowrap">{row.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.open}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.high}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.low}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.close}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.volume}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.ticker}</td>
              {row.dailyReturn !== undefined && (
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  {row.dailyReturn < 0 ? (
                    <span className="text-red-600">&#x25BC; </span>
                  ) : (
                    <span className="text-green-600">&#x25B2; </span>
                  )}
                  {Math.abs(row.dailyReturn?.toFixed(2))}%
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
