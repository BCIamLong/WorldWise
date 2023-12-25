import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import {
  Marker,
  Popup,
  useMap,
  // useMapEvent,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { useCities } from "../../contexts/CitiesContext";
import PropTypes from "prop-types";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/9101/9101314.png",
  iconSize: [42, 42],
});

function Map() {
  const [center, setCenter] = useState([16, 108]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { cities } = useCities();
  const {
    handleGetPosition,
    position: geoPosition,
    isLoading: isLoadingPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (!geoPosition) return;

    setCenter([geoPosition.latitude, geoPosition.longitude]);
    setSearchParams(geoPosition);
  }, [geoPosition]);

  useEffect(() => {
    if (!mapLat || !mapLng) return;
    // console.log(lat, lng);
    // console.log("ok");
    setCenter([mapLat, mapLng]);
  }, [searchParams, mapLat, mapLng, setCenter]);
  // mapLat, mapLng get from searchParams so we can only use searchParams or use mapLat, mapLng

  return (
    // <div className={styles.map} onClick={handleClickMap} key={id}>
    <div className={styles.map}>
      <MapContainer center={center} zoom={9} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        {cities.map((city) => (
          <Marker key={city.id} position={city.position} icon={customIcon}>
            <Popup>
              <h2>
                <span>{city.emoji}</span>
                <span> {city.cityName}</span>
              </h2>
            </Popup>
          </Marker>
        ))}
        <Marker position={center} icon={customIcon}>
          <Popup>
            <h2></h2>
          </Popup>
        </Marker>

        <ChangeCenter position={center} />
        <DetectClick setCenter={setCenter} />
      </MapContainer>
      {geoPosition?.latitude !== +center[0] &&
        geoPosition?.longitude !== +center[1] && (
          <Button type="position" onClick={handleGetPosition}>
            {isLoadingPosition ? "Loading..." : "Use your position"}
          </Button>
        )}
    </div>
  );
}

ChangeCenter.propTypes = {
  position: PropTypes.any,
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

DetectClick.propTypes = {
  setCenter: PropTypes.func,
  setSearchParams: PropTypes.func,
};

function DetectClick({ setCenter }) {
  const navigate = useNavigate();

  useMapEvents({
    click(e) {
      setCenter(e.latlng);
      const { lat: latitude, lng: longitude } = e.latlng;
      navigate(`form?lat=${latitude}&lng=${longitude}`);
    },
  });
  return null;
}

export default Map;
