import React from "react";

function Forecast({ data }) {
  const dailyForecasts = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      <div className="forecast-container">
        {dailyForecasts.map((forecast) => (
          <div className="forecast-item" key={forecast.dt}>
            <p><strong>{new Date(forecast.dt * 1000).toLocaleDateString()}</strong></p>
            <p>Temp: {forecast.main.temp}°C</p>
            <p>Humidity: {forecast.main.humidity}%</p>
            <p>{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
