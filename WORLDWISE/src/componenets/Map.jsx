/* eslint-disable react/prop-types */
import styles from "./Map.module.css";
import {  useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "./ProviderContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const [mapPostion, setMapPosition] = useState([40, 0]);
  const { lat, lng, isLoading, getPosition } = useGeolocation();
  const [latitude, longitude] = useUrlPosition()
  useEffect(
    function () {
      if (latitude === null || longitude === null) return;
      setMapPosition([latitude, longitude]);
    },
    [latitude, longitude]
  );

  useEffect(function(){
    if (!lat || !lng)  return
   setMapPosition([lat, lng])
  }, [lat, lng])
  return (
    <div className={styles.mapContainer}>
      {lat || lng || <Button onClick={getPosition} type="position">{isLoading ? "Loading..." : "Use your position" }</Button>}
      <MapContainer
        className={styles.map}
        center={mapPostion}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span> {city.emoji} </span> {city.cityName}
            </Popup>
          </Marker>
        ))}
        <SetView position={mapPostion} />
        <GetPosition />
      </MapContainer>
    </div>
  );
}

function SetView({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function GetPosition() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
