import "./App.css";
import React, { useState } from "react";
//import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Map from "./components/map";
import Info from "./pages/info";

function App() {
  //every appplication runs directly from app function
  //components have to be self clsed -> />
  //switch tells routes we only wanna render one route at each time
  // / says this is the page as this is homepage
  //putting navbar above switch keeps on every page
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
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const passWeatherData = (searchData, weatherData, forecastData) => {
    setSearch(searchData);
    setWeather(weatherData);
    setForecast(forecastData);
  };
  return (
    <div className="App">
      <Router>
        <Routes>
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
          <Route exact path="Info" element={<Info weather={weather} />} />
          <Route exact path="Map" element={<Map weather={weather} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
