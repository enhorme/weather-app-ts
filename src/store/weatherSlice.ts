import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WeatherData, WeatherState } from "../types";
import { getWeather } from "../api";

const initialState: WeatherState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchWeatherByCityName = createAsyncThunk<
  WeatherData,
  string,
  { rejectValue: string }
>(
  "weather/fetchWeatherByCityName",
  async (cityName: string, { rejectWithValue }) => {
    try {
      const res = await getWeather("", {
        params: {
          q: cityName,
          appid: process.env.REACT_APP_API_KEY,
        },
      });
      console.log("res status", res.status);

      return res.data as WeatherData;
    } catch (e: any) {
      if (e.request && e.request.statusText) {
        return rejectWithValue(e.request.statusText);
      } else return rejectWithValue("Something went wrong");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCityName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCityName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCityName.rejected, (state, action) => {
        state.data = null;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
