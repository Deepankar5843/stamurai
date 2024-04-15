import React, { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import "./Weather.css";
import CustomAppBar from "./bar/CustomBar";
import Footer from "./bar/Footer";

const api = {
  key: "1a919c02d2e4b85e88d44568ac556f3e",
  base: "https://api.openweathermap.org/data/2.5/",
  iconBase: "https://openweathermap.org/img/wn/",
};

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [icon, setIcon] = useState("");
  const [units, setUnits] = useState("metric");
  const [temperatureUnit, setTemperatureUnit] = useState("°C");
  const [favorites, setFavorites] = useState([]);
  const [viewedLocations, setViewedLocations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const cityName = queryParams.get("city");
    if (cityName) {
      setQuery(cityName);
    }
  }, []);

  useEffect(() => {
    if (query) {
      fetchWeatherData();
    }
  }, [query, units]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    const storedViewedLocations =
      JSON.parse(localStorage.getItem("viewedLocations")) || [];
    setViewedLocations(storedViewedLocations);
  }, []);

  const fetchWeatherData = () => {
    fetch(`${api.base}weather?q=${query}&units=${units}&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        if (result.coord) {
          setLatitude(result.coord.lat);
          setLongitude(result.coord.lon);
        }
        if (result.weather && result.weather[0].icon) {
          setIcon(result.weather[0].icon);
        }
        if (
          !viewedLocations.find((location) => location.name === result.name)
        ) {
          setViewedLocations([
            ...viewedLocations,
            { name: result.name, country: result.sys.country },
          ]);
          localStorage.setItem(
            "viewedLocations",
            JSON.stringify([
              ...viewedLocations,
              { name: result.name, country: result.sys.country },
            ])
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const searchPressed = () => {
    if (query.trim() !== "") {
      fetchWeatherData();
    }
  };

  const toggleUnits = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
    setTemperatureUnit(units === "metric" ? "°F" : "°C");
  };

  const addToFavorites = () => {
    const newFavorite = { name: weather.name, country: weather.sys?.country };
    setFavorites([...favorites, newFavorite]);
    localStorage.setItem(
      "favorites",
      JSON.stringify([...favorites, newFavorite])
    );
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="Header-footer">
      <CustomAppBar />
      <div className="weather-container">
        <header className="weather-header">
          <div className="weather-header-content">
            <h1>Weather App</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={searchPressed}>Search</button>
            </div>
          </div>
          {typeof weather.main !== "undefined" && (
            <div className="weather-wrapper">
              <div className="weather-info">
                <p className="location" style={{ justifyContent: "center" }}>
                  {weather.name}, {weather.sys?.country}
                </p>
                {icon && (
                  <div
                    className="details"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      className="weather-icon"
                      src={`${api.iconBase}${icon}@2x.png`}
                      alt="Weather Icon"
                    />{" "}
                    <p className="temperature">
                      {" "}
                      {weather.main.temp}
                      {temperatureUnit}
                    </p>
                  </div>
                )}
                <p className="feels-like">
                  Feels like: {weather.main.feels_like} {temperatureUnit} ,{" "}
                  {weather.weather[0].main}, {weather.weather[0].description}
                </p>
              </div>
              <div className="details-container">
                <hr className="straight-line" />
                <div className="details-column">
                  <p>
                    Sunrise:{" "}
                    {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}{" "}
                    ,
                  </p>
                  <p>Wind Spd: {weather.wind.speed} m/s</p>
                  <p>Wind Direction: {weather.wind.deg}° ,</p>
                </div>
                <div className="details-column">
                  <p>
                    Sunset:{" "}
                    {new Date(weather.sys.sunset * 1000).toLocaleTimeString()} ,
                  </p>
                  <p>Wind Gt: {weather.wind.gust} m/s ,</p>
                  <p>
                    {" "}
                    Min Temp: {weather.main.temp_min}
                    {temperatureUnit} ,
                  </p>
                </div>
                <div className="details-column">
                  <p> Pressure: {weather.main.pressure} hPa </p>
                  <p>
                    {" "}
                    Max Temp: {weather.main.temp_max}
                    {temperatureUnit}{" "}
                  </p>
                  <p>Visibility: {weather.visibility} metres</p>
                </div>
              </div>
            </div>
          )}
          {latitude && longitude && typeof weather.main !== "undefined" && (
            <MapComponent
              latitude={latitude}
              longitude={longitude}
              cityName={weather.name}
            />
          )}
        </header>
        <button
          onClick={toggleUnits}
          style={{ marginTop: "14px", backgroundColor: "lightslategrey" }}
        >
          {units === "metric" ? "Switch Units" : "Switch Units"}
        </button>
        <button
          onClick={addToFavorites}
          style={{ marginLeft: "12px", backgroundColor: "lightslategrey" }}
        >
          Add to Favorites
        </button>
      </div>

      {showPopup && (
        <div className="popup-card">
          <h2>Added to Favorites</h2>
          <p>This location has been added to your favorites.</p>
          <button onClick={closePopup}>Cancel</button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Weather;
