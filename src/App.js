import React, { useState } from 'react';
import './App.css';
import search_logo from './search-icon.png';

const api = {
  key: "7250c8ef1898de70cf64aeea44e33014",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result)
    });
  };

  const weatherImages = {
    '01d': 'http://openweathermap.org/img/wn/01d@2x.png',
    '01n': 'http://openweathermap.org/img/wn/01n@2x.png',
    '02d': 'http://openweathermap.org/img/wn/02d@2x.png',
    '02n': 'http://openweathermap.org/img/wn/02n@2x.png',
    '03d': 'http://openweathermap.org/img/wn/03d@2x.png',
    '03n': 'http://openweathermap.org/img/wn/03n@2x.png',
    '04d': 'http://openweathermap.org/img/wn/04d@2x.png',
    '04n': 'http://openweathermap.org/img/wn/04n@2x.png',
    '09d': 'http://openweathermap.org/img/wn/09d@2x.png',
    '09n': 'http://openweathermap.org/img/wn/09n@2x.png',
    '10d': 'http://openweathermap.org/img/wn/10d@2x.png',
    '10n': 'http://openweathermap.org/img/wn/10n@2x.png',
    '11d': 'http://openweathermap.org/img/wn/11d@2x.png',
    '11n': 'http://openweathermap.org/img/wn/11n@2x.png',
    '13d': 'http://openweathermap.org/img/wn/13d@2x.png',
    '13n': 'http://openweathermap.org/img/wn/13n@2x.png',
    '50d': 'http://openweathermap.org/img/wn/50d@2x.png',
    '50n': 'http://openweathermap.org/img/wn/50n@2x.png',

  };

  const renderWeatherImage = () => {
    if (!weather || !weather.weather || weather.weather.length === 0) {
      return null
    }

    const weatherCode = weather.weather[0].icon;
    const imageURL = weatherImages[weatherCode];

    if(!imageURL) {
      console.warn('No image found for weather code: ', weatherCode);
      return null;
    }

    return  <img src={imageURL} alt='weather' className='weather-icon'/>;
  }

  return (
    <div className='screen'>
      <div className='notch'></div>
      <p className='date'>{date}</p>
      <h1>SurfX</h1>
      <div className='search-box'>
        <input type='text' className='search-bar' placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}/>

        <button className='search-icon' onClick={searchPressed}><img src={search_logo} alt="search"/></button>
      </div>

      {typeof weather.main != "undefined" ? (
         <div className='weatherInfo'>
          {renderWeatherImage()}
          <p className='temp'>{Math.round(weather.main.temp)}°C</p>
          <p className='city'>{weather.name}</p>
          <div className='description'>
            <p>{weather.weather[0].main}</p>
            <p>{weather.wind.speed} m/s</p>
          </div>
        </div>   
      ) : (
        ""
      )}

    </div>
  );
} 

export default App;
