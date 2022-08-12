import React, { FC, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { fetchWeatherByCityName } from "../../store/weatherSlice";

import "./style.scss";

const SearchBar: FC = () => {
  const [value, setValue] = useState<string>("");

  const dispatch = useAppDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value);
  }

  function handlePress(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValue("");
    if (value && value.trim().length) {
      dispatch(fetchWeatherByCityName(value.trim()));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="form__input"
        type="text"
        onChange={handleChange}
        onKeyDown={handlePress}
        value={value}
      />
      <button type="submit" className="form__button">
        SEARCH
      </button>
    </form>
  );
};

export default SearchBar;
