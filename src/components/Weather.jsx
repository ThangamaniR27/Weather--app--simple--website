import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // 🔑 Your API Key (added)
  const API_KEY = "6ca8427706a0b3fde18026405da1dec2";

  const getWeather = async () => {
    // ❗ Prevent empty input
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()},IN&appid=${API_KEY}&units=metric`
      );

      setData(res.data);
    } catch (err) {
      console.log(err.response?.data);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong!");
      }

      setData(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-cyan-400 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        
        <h1 className="text-2xl font-bold mb-4">🌤 Weather App</h1>

        {/* Search */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={getWeather}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Weather Data */}
        {data && (
          <div className="bg-gray-100 rounded-xl p-4 mt-4 shadow">
            <h2 className="text-xl font-semibold">{data.name}</h2>

            {/* 🌤 Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto w-20"
            />

            <p className="text-lg">🌡 {data.main.temp} °C</p>
            <p>☁ {data.weather[0].main}</p>
            <p>💧 Humidity: {data.main.humidity}%</p>
            <p>🌬 Wind: {data.wind.speed} m/s</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Weather;