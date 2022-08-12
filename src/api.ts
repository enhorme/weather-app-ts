import axios from "axios";

const BASE_URL: string = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
