import React, { useState } from 'react';
import '../styles/Home.css';
import search_logo from '../search-icon.png';
import BeachMap from '../components/map'
import Navbar from '../components/Navbar';
import location_icon from '../location_icon.png';
import Days from '../components/days';

const weather_api = {

  key: "7250c8ef1898de70cf64aeea44e33014",
  base: "https://api.openweathermap.org/data/2.5/",
};

const forecast_api ={
  key: "9154491dfd88e6139f12c67eb9208e10",
  base: "https://api.openweathermap.org/data/2.5/",
};



function Homepage({passWeatherData, weatherImages}) {

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});



  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const searchPressed = () => {
    fetch(`${weather_api.base}weather?q=${search}&units=metric&APPID=${weather_api.key}`)
      .then((res) => res.json())
      .then((result1) => {
        setWeather(result1);
        console.log(result1)
    });
    fetch(`${forecast_api.base}forecast?q=${search}&units=metric&cnt=${7}&appid=${forecast_api.key}`)
      .then((res) => res.json())
      .then((result2) => {
        setForecast(result2);
        console.log(result2)
      });
  };
  passWeatherData(search, weather, forecast);



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


  const renderBackgroundImage = () => {

    const description = weather.weather[0].main;
    const image = weather.weather[0].icon;
    
    if (description === "Clear"){
      if (image.slice(-1) === 'd'){
        return "screen clear-background";
      }
      return "screen clear-background-n";
    }
    else if (description === "Rain"){
      if (image.slice(-1) === 'd'){
        return "screen rainy-background";
      }
      return "screen rainy-background-n";
    }
    else if (description === "Clouds"){
      if (image.slice(-1) === 'd'){
        return "screen cloudy-background";
      }
      return "screen cloudy-background-n";
    }

    else if (description === "Thunderstorm"){
      return "screen thunderstorm-background";
    }
    else if (description === "Snow"){
      if (image.slice(-1) === 'd'){
        return "screen snowy-background";
      }
      return "screen snowy-background-n";
    }
    else if (description === "Mist"){
      return "screen misty-background";
    }
    else if (description === "Haze"){
      return "screen hazy-background";
    }
    else{
      return "screen";
    }
 
  };

  return (
    <div className={(typeof weather.main != "undefined") ? renderBackgroundImage(): 'screen'}>
      <div className='main'>
        <div className='notch'></div>
        <p className='date'>{date}</p>
        <header>
        <Navbar />
          <h1>SurfX</h1>
        </header>
        <div className='search-box'>
            
          <input type='text' className='search-bar' placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}/>

          <button className='search-icon' onClick={searchPressed}><img src={search_logo}/></button>
        </div>

        {typeof weather.main != "undefined" ? (
          <div className='weatherInfo'>
            <p className='city'><img src={location_icon}/>{weather.name}, {weather.sys.country}</p>
            {renderWeatherImage()}
            <div className='description'>
              <p>{weather.weather[0].main}</p>
              <p>{weather.wind.speed} m/s</p>
              <p>{Math.round(weather.main.pressure)} hPa</p>
            </div>
            <p className='temp'>{Math.round(weather.main.temp)}°C</p>
          </div>   
        ) : (
          ""
        )}
        
        {typeof forecast.list != "undefined" ? (
          /*import day icons from days.js*/
           <div>{Days(search,weatherImages,forecast)}</div>
           /* link path = days(search,weartherimages)*/
        ) : (
          ""
        )}

        {typeof weather.main != "undefined" ? (

        <div ></div>

      ) : (
        ""
      )}
        
      </div>


    </div>
  );
} 


export default Homepage;

