import { baseURL } from "@/config/env.config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL,
});

export const endpoints = {
  fiatCurrencies: "currencies?type=fiat",
  coinCurrencies: "currencies?type=coin",
  getMarket: "markets",
  allCurrencies: "currencies",
};
