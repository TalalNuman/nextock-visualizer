// src/pages/index.tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getStocks } from "@/utils";
import { FilterModal, StockChart, StockTable } from "@/app/components";

const HomePage = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [view, setView] = useState("table"); // 'table' or 'chart'
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [filters, setFilters] = useState({
    ticker: searchParams.get("ticker") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
    checkCalculateReturns:
      searchParams.get("checkCalculateReturns") === "true" || false,
  });

  const fetchData = async (params: Record<string, any>) => {
    try {
      const response = await getStocks(params);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data when component mounts or filters change
    setIsDataLoading(true);
    fetchData(filters);
  }, [filters]);

  const handleViewChange = (view: string) => {
    setView(view);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleApplyFilters = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto p-6 bg-[#f7f7f7]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            className={`px-4 py-2 rounded ${
              view === "table"
                ? "bg-[#3498db] text-white"
                : "bg-[#f7f7f7] text-[#333333]"
            }`}
            onClick={() => handleViewChange("table")}
          >
            Table View
          </button>
          <button
            className={`ml-4 px-4 py-2 rounded ${
              view === "chart"
                ? "bg-[#3498db] text-white"
                : "bg-[#f7f7f7] text-[#333333]"
            }`}
            onClick={() => handleViewChange("chart")}
          >
            Chart View
          </button>
        </div>
        <button
          className="px-4 py-2 bg-[#2ecc71] text-white rounded"
          onClick={handleModalOpen}
        >
          Filters
        </button>
      </div>
      {!isDataLoading && view === "table" ? (
        <StockTable data={data} />
      ) : (
        <StockChart data={data} />
      )}

      <FilterModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default HomePage;
