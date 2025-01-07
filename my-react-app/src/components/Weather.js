import React from "react";
import moment from "moment-timezone";

function Weather({ data }) {
  const { name, main, wind, weather, timezone } = data;

  const localTime = moment.utc().add(timezone, "seconds").format("YYYY-MM-DD HH:mm");

  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather">
      <h2>Weather in {name}</h2>
      <p><strong>Local Time:</strong> {localTime}</p>
      <img src={iconUrl} alt={weather[0].description} />
      <p>
        <strong>Temperature:</strong> {main.temp}°C
      </p>
      <p>
        <strong>Humidity:</strong> {main.humidity}%
      </p>
      <p>
        <strong>Wind Speed:</strong> {wind.speed} m/s
      </p>
      <p>
        <strong>Condition:</strong> {weather[0].description}
      </p>
    </div>
  );
}

export default Weather;
