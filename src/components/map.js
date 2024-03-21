import React from "react";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { MapContainer, Popup, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import backButton from "../backButton.png";
import "../styles/info.css";

const BeachMap = ({ weather }) => {
  const position = [weather.coord.lat, weather.coord.lon];
  console.log(weather);

  return (
    <div
      className={
        typeof weather.main != "undefined" ? "screen no-background" : ""
      }
    >
      <div className="main">
        <div className="notch"></div>
        
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" ,}}
        >
          <div id="map"></div>
  
          <TileLayer
            attribution=' <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         
          <Marker
            position={position}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
             <Link to="/">
             <button  type="button" id="refreshButton" style={{backgroundImage: "url(../backButton.png)"}}>Back</button>{" "}
        </Link>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default BeachMap;
