import { calculateDailyReturns } from "@/app/api/fetchStocks/calculateReturns";

describe("calculateReturns", () => {
  it("should calculate daily returns correctly", () => {
    const closePrices = [100, 105, 103, 110];
    const expectedReturns = [5, -1.9048, 6.7961];


    const result = calculateDailyReturns(closePrices);
    // Rounding to 4 digits after decimal
    const roundedResult = result.map((r) => parseFloat(r.toFixed(4)));

    expect(roundedResult).toEqual(expectedReturns);
  });

  it("should return an empty array for less than two prices", () => {
    const closePrices = [100];
    const result = calculateDailyReturns(closePrices);

    expect(result).toEqual([]);
  });

  it("should handle empty input gracefully", () => {
    const closePrices: number[] = [];
    const result = calculateDailyReturns(closePrices);

    expect(result).toEqual([]);
  });
});
