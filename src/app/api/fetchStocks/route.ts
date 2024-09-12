// src/app/api/getStockData/route.ts
import { NextResponse } from "next/server";
import { StockData } from "@/types";
import { getLastNDays, paramValidation } from "@/utils";
import { calculateDailyReturns } from "./calculateReturns";
import { filterStockData } from "./fetchStocksData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get all Tickers IF Not Passed
  const ticker = searchParams.get("ticker") || "";

  const currentDate = new Date("2023-06-30");

  // If startDate not present, Default: Fetch data for the last 6 Months = 6 * 30 =  180
  const startDate =
    searchParams.get("startDate") || getLastNDays(currentDate, 180);

  // If startDate not present, Default: End date will be the current date
  const endDate =
    searchParams.get("endDate") ||
    new Date("2023-06-30").toISOString().split("T")[0];
  const checkCalculateReturns =
    searchParams.get("checkCalculateReturns") === "true";

  // Perform parameter validation
  const validationError = paramValidation(ticker, startDate, endDate);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    const filteredData: StockData[] = await filterStockData(
      ticker,
      startDate,
      endDate
    );

    if (checkCalculateReturns) {
      // Group data by ticker (stock symbol)
      const groupedByStock = filteredData.reduce((acc, entry) => {
        if (!acc[entry.ticker]) {
          acc[entry.ticker] = [];
        }
        acc[entry.ticker].push(entry);
        return acc;
      }, {} as Record<string, { ticker: string; close: number; date: string }[]>);

      // Calculate daily returns for each stock
      const result: {
        ticker: string;
        close: number;
        dailyReturn: number;
        date: string;
      }[] = [];

      Object.keys(groupedByStock).forEach((ticker) => {
        let stockData = groupedByStock[ticker];

        stockData = stockData.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        // Extract closing prices
        const closePrices = stockData.map((entry) => entry.close);

        // Calculate daily returns
        const dailyReturns = calculateDailyReturns(closePrices);

        // Combine the daily returns with the stock data
        stockData.forEach((entry, index) => {
          result.push({
            ...entry,
            dailyReturn: index === 0 ? 0 : dailyReturns[index - 1], // First day return is 0
          });
        });
      });

      return NextResponse.json({ data: result });
    } else {
      return NextResponse.json({ data: filteredData });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching stock data" },
      { status: 500 }
    );
  }
}
