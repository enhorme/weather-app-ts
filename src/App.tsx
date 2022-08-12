import React, { FC } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import { useAppSelector } from "./hooks";
import WeatherTable from "./components/WeatherTable/WeatherTable";
import Clock from "./components/Clock/Clock";

export const App: FC = () => {
  const weather = useAppSelector((state) => state.weather);
  return (
    <section className="app">
      <h1>My Weather App</h1>
      <Clock />
      <SearchBar />
      {weather.isLoading && <div>Loading</div>}
      {weather.error && <div>{weather.error}</div>}
      {weather.data && <WeatherTable />}
    </section>
  );
};
