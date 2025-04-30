import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LiveTracking = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const initialLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(initialLocation);

          
          if (mapRef.current) {
            mapRef.current.setView(initialLocation, 19);
          }

        
          navigator.geolocation.watchPosition(
            (position) => {
              const newLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              setLocation(newLocation);
              if (mapRef.current) {
                mapRef.current.flyTo(newLocation, 17);
              }
            },
            (error) => console.error("Error fetching location:", error),
            { enableHighAccuracy: true }
          );
        },
        (error) => {
          console.error("Error fetching initial location:", error);
          setLocation({ lat: 30.7333, lng: 76.7794 }); 
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <>
      {location ? (
        <MapContainer
          center={location}
          zoom={14}
          style={{ height: "100%", width: "100%", zIndex: -1, }}
          className="leaflet-container"
          whenCreated={(map) => (mapRef.current = map)} 
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Live Tracking Marker for User's Current Location */}
          <Marker position={location} />
        </MapContainer>
      ) : (
        <p>Fetching location...</p>
      )}
    </>
  );
};

export default LiveTracking;
