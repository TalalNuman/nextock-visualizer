// src/pages/index.tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getStocks } from "@/utils";
import { FilterModal, StockChart, StockTable } from "@/app/components";
import { TableStockData } from "@/types";
import { StockPicker } from "./components/StockPicker";

const HomePage = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<TableStockData[]>([]);
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
  const [comparisonMetric, setComparisonMetric] = useState<
    "close" | "open" | "high" | "low" | "volume"
  >("close");

  const fetchData = async (params: Record<string, string | boolean>) => {
    try {
      const response = await getStocks(params);
      setData(response.data);
    } catch (error) {
      throw error;
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

  const handleApplyFilters = (newFilters: Record<string, string | boolean>) => {
    setFilters(
      newFilters as {
        ticker: string;
        startDate: string;
        endDate: string;
        checkCalculateReturns: boolean;
      }
    );
  };

  const tickers = Array.from(new Set(data.map((d) => d.ticker)));

  // Split data into datasets for comparison
  const datasets = tickers.map((ticker) =>
    data.filter((d) => d.ticker === ticker)
  );

  return (
    <div className="container mx-auto p-6 bg-[#f7f7f7] min-h-screen w-full">
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
        <div className="flex items-center space-x-4">
          {view === "chart" && (
            <StockPicker
              comparisonMetric={comparisonMetric}
              onComparisonMetricChange={(metric) =>
                setComparisonMetric(
                  metric as "close" | "open" | "high" | "low" | "volume"
                )
              }
              availableMetrics={
                data[0]
                  ? Object.keys(data[0]).filter(
                      (key) => key !== "date" && key !== "ticker"
                    )
                  : []
              }
            />
          )}
          <button
            className="px-4 py-2 bg-[#2ecc71] text-white rounded shadow-md hover:bg-[#27ae60]"
            onClick={handleModalOpen}
          >
            Filters
          </button>
        </div>
      </div>

      {!isDataLoading && view === "table" ? (
        <StockTable data={data} />
      ) : (
        <StockChart datasets={datasets} comparisonMetric={comparisonMetric} />
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
