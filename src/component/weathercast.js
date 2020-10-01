import React from "react";

function Weathercast({ weather, loc }) {
  const DateFormater = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <React.Fragment>
      <div className="disp_container">
        <p className="loc_name">{`${weather.name},${weather.sys.country}`}</p>
        <p className="temp">
          <span className="val">{weather.main.temp}</span>
          <sup>°</sup>C
        </p>
        <span className="date">{DateFormater(new Date())}</span>
        <p className="cast">{weather.weather[0].main}</p>
        <p className="summary">{weather.weather[0].description}</p>
      </div>
    </React.Fragment>
  );
}
export default Weathercast;
