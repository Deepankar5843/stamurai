import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import "./MapComponent.css";

const MapComponent = ({ latitude, longitude, cityName }) => {
  const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
  });

  return (
    <div className="map-container">
      {" "}
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={markerIcon}>
          <Popup>{cityName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
