import React, { FC } from "react";
import { useAppSelector } from "../../hooks";
import moment from "moment";
import "./style.scss";

export function convertTimeFromUnix(unixTimestamp: any) {
  const convertTime = new Date(unixTimestamp * 1000);
  return moment(convertTime).format("LT");
}

const WeatherTable: FC = () => {
  const { data } = useAppSelector((state) => state.weather);

  const convertToCelsius = (kelvin: number): number => {
    let celsius = kelvin - 273.15;
    return Math.round(celsius);
  };

  return (
    <div className="weather">
      <div className="weather__title">
        <h2>{data?.name}:</h2>
        <span> {data?.weather[0].description}</span>
      </div>
      <div className="weather__info">
        <div>
          <p>Sunrise: {convertTimeFromUnix(data?.sys.sunrise)}</p>
          <p>Sunset: {convertTimeFromUnix(data?.sys.sunset)}</p>
          <p>Temperature: {convertToCelsius(data?.main.temp!)} &#8451;</p>
        </div>
        <div className="weather__image">
          <img
            src={` http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherTable;
