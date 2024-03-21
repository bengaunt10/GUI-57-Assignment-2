// Importing necessary modules and resources
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Map from "./components/map";
import Info from "./pages/info";

// Main App component
function App() {
  // Weather images object containing URLs for weather condition icons
  const weatherImages = {
    "01d": "http://openweathermap.org/img/wn/01d@2x.png",
    "01n": "http://openweathermap.org/img/wn/01n@2x.png",
    "02d": "http://openweathermap.org/img/wn/02d@2x.png",
    "02n": "http://openweathermap.org/img/wn/02n@2x.png",
    "03d": "http://openweathermap.org/img/wn/03d@2x.png",
    "03n": "http://openweathermap.org/img/wn/03n@2x.png",
    "04d": "http://openweathermap.org/img/wn/04d@2x.png",
    "04n": "http://openweathermap.org/img/wn/04n@2x.png",
    "09d": "http://openweathermap.org/img/wn/09d@2x.png",
    "09n": "http://openweathermap.org/img/wn/09n@2x.png",
    "10d": "http://openweathermap.org/img/wn/10d@2x.png",
    "10n": "http://openweathermap.org/img/wn/10n@2x.png",
    "11d": "http://openweathermap.org/img/wn/11d@2x.png",
    "11n": "http://openweathermap.org/img/wn/11n@2x.png",
    "13d": "http://openweathermap.org/img/wn/13d@2x.png",
    "13n": "http://openweathermap.org/img/wn/13n@2x.png",
    "50d": "http://openweathermap.org/img/wn/50d@2x.png",
    "50n": "http://openweathermap.org/img/wn/50n@2x.png",
  };

  // State variables for search query, weather data, and forecast data
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});

  // Function to pass weather data to child components
  const passWeatherData = (searchData, weatherData, forecastData) => {
    setSearch(searchData);
    setWeather(weatherData);
    setForecast(forecastData);
  };

  // Rendering JSX
  return (
    <div className="App">
      {/* Using React Router for routing */}
      <Router>
        <Routes>
          {/* Route for Homepage */}
          <Route
            exact
            path="/"
            element={
              <Homepage
                passWeatherData={passWeatherData}
                weatherImages={weatherImages}
              />
            }
          />
          {/* Route for Info page */}
          <Route exact path="/Info" element={<Info weather={weather} />} />
          {/* Route for Map page */}
          <Route exact path="/Map" element={<Map weather={weather} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; // Exporting App component
