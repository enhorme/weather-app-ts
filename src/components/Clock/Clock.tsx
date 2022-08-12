import React, { useEffect, useState, FC } from "react";
import moment from "moment";
import "./style.scss";

const Clock: FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="clock">
      <span className="clock__day">{moment(date).format("dddd")}</span>
      <span className="clock__time">{moment(date).format("h:mm a")}</span>
    </div>
  );
};

export default Clock;
