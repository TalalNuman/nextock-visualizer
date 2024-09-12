import { NextResponse } from "next/server";
import { isValidDate } from "./date";

const validTickers: string[] = [
  "AAL",
  "AAPL",
  "AMZN",
  "GOOGL",
  "MSFT",
  "NFLX",
  "TSLA",
];

export function paramValidation(
  ticker: string,
  startDate: string,
  endDate: string
): string | null {
  console.log(ticker, "ticker");
  // Validation: Check if ticker is valid
  if (ticker && !validTickers.includes(ticker.toUpperCase())) {
    return `Invalid ticker: ${ticker}. Allowed tickers are: ${validTickers.join(
      ", "
    )}`;
  }
  // Validation: Check if the date format is correct
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return "Invalid date format. Use YYYY-MM-DD format for both startDate and endDate.";
  }

  // Validation: Ensure start date is not later than the end date
  if (new Date(startDate) > new Date(endDate)) {
    return "Start date cannot be later than the end date.";
  }
  return null;
}
