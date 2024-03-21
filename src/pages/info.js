import React, { useEffect, useState } from "react";
import "../styles/info.css";
import { Link } from "react-router-dom";
import backButton from "../backButton.png";
import rank from "../Rank.png";
function Info({ weather }) {
  const [data, setData] = useState(null);
  const today = new Date();
  const currentHour = today.getHours();

  //fetch weather from api
  useEffect(() => {
    if (weather && weather.coord) {
      const { lat, lon } = weather.coord;
      fetch(
        `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lon}&params=windSpeed,waveHeight,swellDirection,seaLevel,cloudCover`,
        {
          headers: {
            Authorization:
              "c8d6bc54-e6c8-11ee-afd5-0242ac130002-c8d6bcae-e6c8-11ee-afd5-0242ac130002",
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
  //this function gets each piece of data we want for the hour passed in 
  const getTimeSlotData = (hour) => {
    return data && data.hours && data.hours[hour]
      ? {
          swell: `${data.hours[hour].swellDirection.dwd}°`,
          tide: `${data.hours[hour].seaLevel.meto}`,
          wave: `${data.hours[hour].waveHeight.dwd}`,
          cloudCover: `${data.hours[hour].cloudCover.dwd}`,
        }
      : {
          swell: "Loading...",
          tide: "Loading...",
          wave: "Loading...",
          cloudCover: "Loading...",
        };
  };
  //this gets the hour for the current time and the next 6 hours after aswell
  const timeSlots = {
    [currentHour]: getTimeSlotData(currentHour), // Assuming currentHour is 8am
    [currentHour + 1]: getTimeSlotData(currentHour + 1), // Assuming currentHour is 10am
    [currentHour + 2]: getTimeSlotData(currentHour + 2), // Assuming currentHour is 12pm
    [currentHour + 3]: getTimeSlotData(currentHour + 3), // Assuming currentHour is 12pm
    [currentHour + 4]: getTimeSlotData(currentHour + 4), // Assuming currentHour is 12pm
    [currentHour + 5]: getTimeSlotData(currentHour + 5), // Assuming currentHour is 12pm
    [currentHour + 6]: getTimeSlotData(currentHour + 6), // Assuming currentHour is 12pm
  };

  return (
    <div className="screen cloudy-background-n">
      <div className="info">
        <div className="main">
          <div className="notch"></div>
          <header className="header">
            <Link to="/">
              <img className="backButton" src={backButton} />{" "}
            </Link>
            <h1>Surf Info</h1>
          </header>
          <p className="city">
            {weather ? `${weather.name}, ${weather.sys.country}` : null}
          </p>

          <div className="holder">
            <div className="descHead">
              <h2 className="time">Time :</h2>
              <h3>swell:</h3>
              <h3>Tide :</h3>
              <h3>Wave(m) :</h3>
              <h3>cloud(%):</h3>
            </div>
            <div className="timeSlots">
              {/* Maps over the time slots and display data for each */}
              {Object.entries(timeSlots).map(([time, data]) => (
                <div key={time} className="timeSlot">
                  <h2 className="time">
                    {time >= 12 ? `${time >= 24 ? `${time-24} AM` : `${time} PM`}` : `${time} AM`}
                  </h2>
                  <p className="swell">{data.swell}</p>
                  <p className="tide">
                    {data.tide >= 0 ? `High Tide` : `Low Tide`}
                  </p>
                  <p className="wave">{data.wave}</p>
                  <p className="cloud">{data.cloudCover}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rankSection">
            <h2>Ranking </h2>
            <img className="veryGood" src={rank} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
