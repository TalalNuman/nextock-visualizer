// Function to calculate daily returns
export function calculateDailyReturns(closePrices: number[]): number[] {
  const dailyReturns = [];
  for (let i = 1; i < closePrices.length; i++) {
    const dailyReturn =
      ((closePrices[i] - closePrices[i - 1]) / closePrices[i - 1]) * 100;
    dailyReturns.push(dailyReturn);
  }
  return dailyReturns;
}
