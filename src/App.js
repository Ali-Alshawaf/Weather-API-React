import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import './App.css';

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Riyadh");
  const [loading, setLoading] = useState(true);
  const API_KEY = "9f734658fea67e627e43480838edd3bd";

  const fetchWeather = useCallback(async () => {
    try {
      const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  }, [city, API_KEY]); 

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]); 

  return (
    <div className="container" >
      <h1>Weather Information</h1>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
      
      {loading ? ( <p>Loading...</p>) : weather ? (
        <div className="weather-info">
          <h2>City: {weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      ) : ( <p>Error fetching weather data.</p>)}
      
    </div>
  );
}

export default WeatherApp;
