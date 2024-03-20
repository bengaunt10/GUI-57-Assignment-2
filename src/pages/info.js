import React, { useEffect, useState } from 'react';
import "../styles/info.css"

function Info({ search, weather, weatherImages, forecast }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [wave, setWave] = useState(null);
  const [swellDirection, setSwellDirection] = useState(null);
  const [sea, setSea] = useState(null);
  const [x, setx] = useState(null);


  useEffect(() => {
    if (weather && weather.coord) {
      setLat(weather.coord.lat);
      setLng(weather.coord.lon);
    }
  }, [weather]);
  
  useEffect(() => {
    if (lat !== null && lng !== null) {
      fetch(
        `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=windSpeed,waveHeight,swellDirection,seaLevel`,
        {
          headers: {
            Authorization:
              "c8d6bc54-e6c8-11ee-afd5-0242ac130002-c8d6bcae-e6c8-11ee-afd5-0242ac130002",
          },
        }
      )
      /*windSpeed	Speed of wind at 10m above sea level in meters per second.
      */
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((jsonData) => {
          setx (jsonData);
          console.log(x);

          setSwellDirection(jsonData.hours[1].swellDirection.dwd);
          setSea(jsonData.hours[1].seaLevel.meto);
          setWave(jsonData.hours[1].waveHeight.dwd);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [lat, lng,x]);
  

  return (
    <div className='screen'>
      <div className='main'>
        <div className='notch'></div>
          <header>
            <h1>info page</h1>
          </header>
          <p className='city'>{weather ? `${weather.name}, ${weather.sys.country}` : null}</p>
          <div className='waveInfo'>
            <div className="Head">
              <p>Swell:</p>
              <p>Tide:</p>
              <p>wave:</p>
            </div>
          <div className="Hour">
              <p className="swell">{x.hoursswellDirection}s</p>
              <p className="sea">{sea}s</p>
              <p className="wave">{wave}m</p>
          </div>
          
          </div>
      </div>
    </div>
  );
}

export default Info;
