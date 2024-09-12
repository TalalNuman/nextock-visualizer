// src/api/fetchStocks.ts
import axios from "axios";

export const getStocks = async (params: Record<string, any>) => {
  try {
    const response = await axios.get("/api/fetchStocks", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
