import React, { useState, useEffect } from "react";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import "./styles.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "1592563cdbda53777bb49695f20f06ed "; 
  

  const fetchWeather = async (location) => {
    const { lat, lon } = location || {};
    const url = lat && lon
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      : `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const forecastUrl = lat && lon
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      : `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    setLoading(true);
    setError("");
    setWeatherData(null);
    setForecastData(null);

    try {
      const weatherResponse = await fetch(url);
      const weatherData = await weatherResponse.json();

      if (weatherData.cod === 200) {
        setWeatherData(weatherData);

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
      } else {
        setError(weatherData.message);
      }
    } catch (err) {
      setError("Unable to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchGeolocationWeather = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        fetchWeather(location);
      },
      (error) => {
        setError("Unable to retrieve your location.");
        console.error(error);
      }
    );
  };

  useEffect(() => {
    fetchGeolocationWeather(); 
  }, []);

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-container">
  <div className="input-row">
    <input
      type="text"
      placeholder="Enter city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
    <button onClick={() => fetchWeather()}>Get Weather</button>
  </div>
  <button className="location-button" onClick={fetchGeolocationWeather}>
    Use My Location
  </button>
</div>
      {error && <p className="error">{error}</p>}
      {loading && <div className="spinner"></div>}
      {weatherData && <Weather data={weatherData} />}
      {forecastData && <Forecast data={forecastData} />}
    </div>
  );
}

export default App;
