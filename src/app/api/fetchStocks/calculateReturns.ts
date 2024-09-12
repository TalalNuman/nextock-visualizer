// Function to calculate daily returns
export function calculateDailyReturns(closePrices: number[]): number[] {
  let returns = [];
  for (let i = 1; i < closePrices.length; i++) {
    const dailyReturn =
      ((closePrices[i] - closePrices[i - 1]) / closePrices[i - 1]) * 100;
    returns.push(dailyReturn);
  }
  return returns;
}
