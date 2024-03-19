
import React, { useState } from 'react';
import '../styles/Home.css';
import search_logo from '../search-icon.png';
import BeachMap from '../components/map'
import Navbar from '../components/Navbar';
import location_icon from '../location_icon.png';
//import three_bars_icon from '../three-bars-icon.jpg';

const weather_api = {

  key: "7250c8ef1898de70cf64aeea44e33014",
  base: "https://api.openweathermap.org/data/2.5/",
};

const forecast_api ={
  key: "9154491dfd88e6139f12c67eb9208e10",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Info() {

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
 // const [navOpen,  setnavOpen] = useState(false);

  const current = new Date();
  const dayNum = current.getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const loopDays = (dayNum, addDays) => {
    if(dayNum + addDays >= 7){
      return ((dayNum + addDays) - days.length);
    }

    return dayNum + addDays
  }


  //const openNav = () => {
 //   setnavOpen(true);

 // }

 // const closeNav = () => {
  //  setnavOpen(false);
 // }

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

  const renderForecastImage = (forecastCode, forecastdt) => {
    if (!forecast || !forecast.list || forecast.list.length === 0) {
      return null
    }

    var dayForecastCode = forecast.list[0].weather[0].icon;

    if (forecastdt !== forecast.list[0].dt) {
      dayForecastCode = forecastCode.replace('n', 'd');
    }

    const imageURL1 = weatherImages[dayForecastCode];
      
    if (!imageURL1) {
      console.warn('No image found for weather code: ', dayForecastCode);
      return null;
    }
  
    return <img src={imageURL1} alt='forecast' className='forecast-icon' />;
  };

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

        
     {/* {typeof weather.main != "undefined" ? (
         <div className='weatherInfo'>
          {renderWeatherImage()}
          <p className='temp'>{Math.round(weather.main.temp)}°C</p>
          <p className='city'>{weather.name}</p>
          <div className='description'>
            <p>{weather.weather[0].main}</p>
            <p>{weather.wind.speed} m/s</p>
            <div>{BeachMap(search)}</div>
          </div>
        </div>   
      ) : (
        ""
      )}*/}

    
      <div className='main'>
        <div className='notch'></div>
        <p className='date'>{date}</p>
        <header>
          {/* <Navbar <button className="open_button" onClick={openNav}><img src={three_bars_icon}/></button> */}
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
            <div className='forecast'>
              <div className='day'>
                <p>{days[loopDays(dayNum, 0)]}</p>
                {renderForecastImage(forecast.list[0].weather[0].icon, forecast.list[0].dt)}
                <p>{Math.round(forecast.list[0].main.temp)}°C</p>
              </div>
              <div className='day'>
              <p>{days[loopDays(dayNum, 1)]}</p>
                {renderForecastImage(forecast.list[1].weather[0].icon, forecast.list[1].dt)}
                <p>{Math.round(forecast.list[1].main.temp)}°C</p>
              </div>
              <div className='day'>
              <p>{days[loopDays(dayNum, 2)]}</p>
                {renderForecastImage(forecast.list[2].weather[0].icon, forecast.list[2].dt)}
                <p>{Math.round(forecast.list[2].main.temp)}°C</p>
              </div>
              <div className='day'>
              <p>{days[loopDays(dayNum, 3)]}</p>
                {renderForecastImage(forecast.list[3].weather[0].icon, forecast.list[3].dt)}
                <p>{Math.round(forecast.list[3].main.temp)}°C</p>
              </div>
              <div className='day'>
                <p>{days[loopDays(dayNum, 4)]}</p>
                {renderForecastImage(forecast.list[4].weather[0].icon, forecast.list[4].dt)}
                <p>{Math.round(forecast.list[4].main.temp)}°C</p>
              </div>
              <div className='day'>
                <p>{days[loopDays(dayNum, 5)]}</p>
                {renderForecastImage(forecast.list[5].weather[0].icon, forecast.list[5].dt)}
                <p>{Math.round(forecast.list[5].main.temp)}°C</p>
              </div>
              <div className='day'>
                <p>{days[loopDays(dayNum, 6)]}</p>
                {renderForecastImage(forecast.list[6].weather[0].icon, forecast.list[6].dt)}
                <p>{Math.round(forecast.list[6].main.temp)}°C</p>
              </div>
            </div>
        ) : (
          ""
        )}
        {typeof weather.main != "undefined" ? (

        <div className="mapSection">{BeachMap(search)}</div>

      ) : (
        ""
      )}
        
      </div>


export default Info;
