import Papa from "papaparse";
import fs from "fs";
import path from "path";
import { StockData } from "@/types";

export async function filterStockData(
  ticker: string,
  startDate: string,
  endDate: string
): Promise<StockData[]> {
  // Read the CSV file
  const filePath = path.join(process.cwd(), "data", "Stock Prices.csv");
  const fileStream = fs.createReadStream(filePath);
  const parsedData = await new Promise<Papa.ParseResult<StockData>>(
    (resolve, reject) => {
      Papa.parse(fileStream, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.toLowerCase(), // Converting all headers to Lower Case as it was changed in the CSV
        complete: (results: Papa.ParseResult<StockData>) => resolve(results),
        error: (err) => reject(err),
      });
    }
  );

  if (parsedData?.errors?.length > 0) {
    throw new Error("Error parsing CSV data");
  }

  const stockData = parsedData.data;

  return stockData.filter((entry) => {
    const entryDate = new Date(entry.date);
    const isInRange =
      entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
    return (ticker === "" || entry.ticker === ticker) && isInRange;
  });
}
