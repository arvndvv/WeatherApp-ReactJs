import React, { useState, useEffect } from "react";
import GetLoc from "./component/getLoc";
import WeatherCast from "./component/weathercast";
import "./App.css";
const api = {
  key: "ee3ced07b760108f76e17408e247f771",
  url: "https://api.openweathermap.org/data/2.5/weather?",
};

function App() {
  const [weather, setweather] = useState({});
  const [loc, setLoc] = useState({
    location: "",

    error: null,
    autoDetect: false,
  });
  const [find, setFind] = useState(0);
  const [loader, setLoader] = useState(true);
  const [previousVal, setprev] = useState("");

  useEffect(() => {
    setLoc({ ...loc, error: null });
    if (!loc.autoDetect) {
      if (previousVal !== loc.location) {
        setprev(loc.location);

        fetch(`${api.url}q=${loc.location}&units=metric&appid=${api.key}`)
          .then((res) => res.json())
          .then((result) => setweather(result));
      } else {
        // console.log("already retrieved");
        if (find > 0) {
          setLoc({ ...loc, error: "already retrieved" });
        }
      }
    } else {
      //console.log("autodetecting");
      if ("geolocation" in navigator) {
        // console.log("Geolocation Feature Available");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetch(
              `${api.url}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${api.key}`
            )
              .then((res) => res.json())
              .then((result) => setweather(result));
          },
          (error) => {
            setLoc({ ...loc, error: error.message });
          }
        );
      } else {
        setLoc({ ...loc, error: "Geolocation Feature Not Available" });
        //console.log("Geolocation Feature Not Available");
      }
    }
  }, [find]);

  const removeLoader = () => {
    setLoader(false);
  };

  useEffect(() => {
    if (weather.message) {
      setLoc({ ...loc, error: weather.message });
    }
  }, [weather]);

  return (
    <div className="container">
      {previousVal ? "" : ""}
      <div className={loader ? "loader" : "loader no_loader"}>
        <i className="fa fa-chevron-circle-right go" onClick={removeLoader}></i>
        <span className="title">
          WeatherApp<sup>1.0</sup>
          <span className="by">By Davinci</span>
        </span>
      </div>
      <GetLoc setLoc={setLoc} find={find} setFind={setFind} loc={loc} />
      {typeof weather.main != "undefined" ? (
        <WeatherCast loc={loc} weather={weather} />
      ) : (
        ""
      )}
      <footer>copyright &copy; B374BR4IN </footer>
    </div>
  );
}

export default App;
