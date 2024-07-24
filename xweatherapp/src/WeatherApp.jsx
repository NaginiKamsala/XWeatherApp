import { useState, useEffect } from "react";
import "./WeatherApp.css";
import axios from "axios";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const apiKey = "97dc50582dfa49e1a9b101049242901";
  const fetchWeather = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      setWeather(response.data);
    } catch (error) {
      setError(true);
      alert("Failed to fetch weather data");
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather();
    }
  };
  return (
    <div className="weather-container">
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading data…</p>}

      {weather && !error && (
        <div className="weather-cards">
          <div className="weather-card">
            <h2>Temperature</h2>
            <p>{weather.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h2>Humidity</h2>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h2>Condition</h2>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h2>Wind Speed</h2>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}
