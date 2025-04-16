import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "15px",
};

const center = {
  lat: 40.43,
  lng: 47.75,
};

const Map = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_REST_API_URL + "/place/list")
      .then((response) => setPlaces(response.data))
      .catch((error) => console.error("Data fetch error: " + error));
  }, []);

  return (
    <div className="map-section">
      <div className="container">
        <div className="map-placeholder">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={7}
            >
              {places.map((place) => (
                <Marker
                  key={place.id}
                  position={{
                    lat: place.location.latitude,
                    lng: place.location.longitude,
                  }}
                  onClick={() => setSelectedPlace(place)}
                />
              ))}
              {selectedPlace && (
                <InfoWindow
                  position={{
                    lat: selectedPlace.location.latitude,
                    lng: selectedPlace.location.longitude,
                  }}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div>
                    <h3>{selectedPlace.name}</h3>
                    <p>{selectedPlace.description}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default Map;
