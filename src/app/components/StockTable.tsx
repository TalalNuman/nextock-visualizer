// src/components/StockTable.tsx
import React, { useState, useMemo } from "react";
import { Pagination } from "./Pagination";
import { TableStockData } from "@/types";

interface TableData {
  data: TableStockData[];
}
export const StockTable = ({ data }: TableData) => {
  type SortKey = keyof TableStockData;

  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  }>({
    key: "date", // Default sorting by date
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
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Handle cases where values might be undefined
        if (aValue === undefined || bValue === undefined) {
          return 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sorted;
  }, [data, sortConfig]);

  // Handle column sorting
  const handleSort = (key: SortKey) => {
    let direction: "asc" | "desc" = "asc";
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
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const headers: { label: string; key: keyof TableStockData }[] = [
    { label: "Date", key: "date" },
    { label: "Open", key: "open" },
    { label: "High", key: "high" },
    { label: "Low", key: "low" },
    { label: "Close", key: "close" },
    { label: "Volume", key: "volume" },
    { label: "Ticker", key: "ticker" },
  ];

  //  Add "Daily Return" if it exists in the data
  if (data[0]?.dailyReturn !== undefined) {
    headers.push({ label: "Daily Return (%)", key: "dailyReturn" });
  }

  return (
    <div className="flex-1 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(header.key)}
              >
                {header.label}{" "}
                {sortConfig.key === header.key
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((row, index) => (
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
                    {Math.abs(Number(row.dailyReturn?.toFixed(2)))}%
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                No data available.
              </td>
            </tr>
          )}
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
