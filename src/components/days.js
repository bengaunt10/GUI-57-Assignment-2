import React from 'react'
import '../styles/days.css';
function Days(search,weatherImages,forecast) {
    const current = new Date();
    const dayNum = current.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const loopDays = (dayNum, addDays) => {
      if(dayNum + addDays >= 7){
        return ((dayNum + addDays) - days.length);
      }
  
      return dayNum + addDays}
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
  return (
    <div>
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
    </div>
  )
}

export default Days
