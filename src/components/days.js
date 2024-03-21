// Importing necessary modules and resources
import React from 'react';
import '../styles/days.css'; // Importing CSS styles

// Days component
function Days(search, weatherImages, forecast) {
    // Getting current date
    const current = new Date();
    const dayNum = current.getDay(); // Getting current day number
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Array of days

    // Function to loop through days
    const loopDays = (dayNum, addDays) => {
        if (dayNum + addDays >= 7) {
            return ((dayNum + addDays) - days.length); // Handling overflow of days
        }
        return dayNum + addDays;
    };

    // Function to render forecast image
    const renderForecastImage = (forecastCode, forecastdt) => {
        if (!forecast || !forecast.list || forecast.list.length === 0) {
            return null;
        }
        var dayForecastCode = forecast.list[0].weather[0].icon; // Getting forecast code

        // Checking if it's night and replacing forecast code if needed
        if (forecastdt !== forecast.list[0].dt) {
            dayForecastCode = forecastCode.replace('n', 'd');
        }

        const imageURL1 = weatherImages[dayForecastCode]; // Getting image URL

        if (!imageURL1) {
            console.warn('No image found for weather code: ', dayForecastCode);
            return null;
        }

        return <img src={imageURL1} alt='forecast' className='forecast-icon' />; // Returning image JSX
    };

    // Rendering JSX
    return (
        <div>
            {/* Rendering forecast for each day */}
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
    );
}

export default Days; // Exporting Days component
