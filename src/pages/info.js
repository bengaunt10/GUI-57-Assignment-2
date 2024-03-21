// Importing necessary modules and resources
import React, { useEffect, useState } from "react";
import "../styles/info.css"; // Importing CSS styles
import { Link } from "react-router-dom";
import backButton from "../backButton.png"; // Importing back button image
import rank from "../Rank.png"; // Importing rank image

// Info component
function Info({ weather }) {
  // State variable to store fetched data
  const [data, setData] = useState(null);
  
  // Getting current hour
  const today = new Date();
  const currentHour = today.getHours();

  // Fetching data from API based on weather coordinates
  useEffect(() => {
    if (weather && weather.coord) {
      const { lat, lon } = weather.coord;
      fetch(
        `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lon}&params=windSpeed,waveHeight,swellDirection,seaLevel`,
        {
          headers: {
            Authorization:
              "362cfe1c-e70f-11ee-b6c8-0242ac130002-362cfe9e-e70f-11ee-b6c8-0242ac130002",
          },
        }
      )
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [weather]);

  // Function to get data for a specific hour
  const getTimeSlotData = (hour) => {
    return data && data.hours && data.hours[hour]
      ? {
          swell: `${data.hours[hour].swellDirection.dwd}s`,
          tide: `${data.hours[hour].seaLevel.meto}s`,
          wave: `${data.hours[hour].waveHeight.dwd}s`,
        }
      : { swell: "Loading...", tide: "Loading...", wave: "Loading..." };
  };

  // Object to store time slots and their corresponding data
  const timeSlots = {
    [currentHour]: getTimeSlotData(currentHour),
    [currentHour + 1]: getTimeSlotData(currentHour + 1),
    [currentHour + 2]: getTimeSlotData(currentHour + 2),
    [currentHour + 3]: getTimeSlotData(currentHour + 3),
    [currentHour + 4]: getTimeSlotData(currentHour + 4),
    [currentHour + 5]: getTimeSlotData(currentHour + 5),
    [currentHour + 6]: getTimeSlotData(currentHour + 6),
  };

  // Rendering JSX
  return (
    <div className="screen cloudy-background-n">
      <div className="info">
        <div className="main">
          <div className="notch"></div>
          {/* Header */}
          <header className="header">
            <Link to="/">
              <img className="backButton" src={backButton} alt="back button" />
            </Link>
            <h1>Surf Info</h1>
          </header>
          {/* City */}
          <p className="city">
            {weather ? `${weather.name}, ${weather.sys.country}` : null}
          </p>

          {/* Holder */}
          <div className="holder">
            {/* Description */}
            <div className="descHead">
              <h2 className="time">Time :</h2>
              <h3>Swell :</h3>
              <h3>Tide :</h3>
              <h3>Wave(m) :</h3>
            </div>
            {/* Time slots */}
            <div className="timeSlots">
              {Object.entries(timeSlots).map(([time, data]) => (
                <div key={time} className="timeSlot">
                  <h2 className="time">{time >= 12 ? `${time} PM` : `${time} AM`}</h2>
                  <p className="swell">{data.swell}</p>
                  <p className="tide">{data.tide >= 0 ? `High Tide` : `Low Tide`}</p>
                  <p className="wave">{data.wave}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Ranking Section */}
          <div className="rankSection">
            <h2>Ranking </h2>
            <img className="veryGood" src={rank} alt="rank" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info; // Exporting Info component
