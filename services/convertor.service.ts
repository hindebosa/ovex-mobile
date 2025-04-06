import { axiosInstance, endpoints } from "@/lib/axios";
import { ICurrencyConversionResponse } from "@/types/currencies.type";
import { groupByQuoteCurrency } from "@/util/currency";
import { ToastAndroid } from "react-native";

export const getAllCurrencies = async () => {
  try {
    const { data } = await axiosInstance.get(endpoints.allCurrencies);
    return data;
  } catch (error) {
    ToastAndroid.show("Failed to convert!", ToastAndroid.SHORT);
    throw error;
  }
};

export const getMarkets = async () => {
  try {
    const { data } = await axiosInstance.get(endpoints.getMarket);

    return groupByQuoteCurrency(data);
  } catch (error) {
    ToastAndroid.show("Failed to convert!", ToastAndroid.SHORT);

    throw error;
  }
};

export const postConvertCurrency = async (
  sourceAmount: string,
  currentId?: string
): Promise<ICurrencyConversionResponse> => {
  try {
    if (!currentId) {
      throw new Error("No market ID provided");
    }
    const { data } = await axiosInstance.get(
      `rfq/get_quote?market=${currentId}&from_amount=${sourceAmount}&side=buy&prefunded=0`
    );

    return data;
  } catch (error) {
    ToastAndroid.show("Failed to convert!", ToastAndroid.SHORT);
    throw error;
  }
};
