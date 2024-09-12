// Stock CSV Data's Type
export interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ticker: string;
}

export interface TableStockData extends StockData {
  dailyReturn?: number;
}

// Stock Form
export interface FormData {
  ticker?: string;
  startDate?: string;
  endDate?: string;
  checkCalculateReturns?: boolean;
}

// Type definition for onSubmit
export interface StockFormProps {
  onSubmit: (data: FormData) => void;
}
