import { axiosInstance, endpoints } from "@/lib/axios";
import { ICurrencyConversionResponse } from "@/types/currencies.type";
import { groupByQuoteCurrency } from "@/util/currency";

export const getAllCurrencies = async () => {
  try {
    const { data } = await axiosInstance.get(endpoints.allCurrencies);
    return data;
  } catch (error) {
    console.error("Error fetching markets:", error);
    throw error;
  }
};

export const getMarkets = async () => {
  try {
    const { data } = await axiosInstance.get(endpoints.getMarket);

    return groupByQuoteCurrency(data);
  } catch (error) {
    console.error("Error fetching fiat currencies:", error);
    throw error;
  }
};

export const postConvertCurrency = async (
  sourceAmount: string,
  currentId?: string
): Promise<ICurrencyConversionResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `rfq/get_quote?market=${currentId}&from_amount=${sourceAmount}&side=buy&prefunded=0`
    );

    return data;
  } catch (error) {
    console.log("Error posting", error);
    throw error;
  }
};
