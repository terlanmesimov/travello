import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_REST_API_URL}/place/list`
      );
      setPlaces(response.data);
    } catch (error) {
      console.error("Data fetch error: " + error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div className="map-section">
      <div className="container">
        <div className="map-placeholder">
          <MapContainer
            center={[40.43, 47.75]} 
            zoom={7}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "500px", borderRadius: "15px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {places.map((place) => (
              <Marker
                key={place.id}
                position={[
                  place.location.latitude,
                  place.location.longitude,
                ]}
                eventHandlers={{
                  click: () => setSelectedPlace(place),
                }}
              >
                {selectedPlace && selectedPlace.id === place.id && (
                  <Popup
                    position={[
                      selectedPlace.location.latitude,
                      selectedPlace.location.longitude,
                    ]}
                    onClose={() => setSelectedPlace(null)}
                  >
                    <div
                      className="info-window"
                      onClick={() => {
                        navigate(`/card-detail/${selectedPlace.id}`);
                      }}
                    >
                      <img
                        src={
                          place.imageBase64 &&
                          typeof place.imageBase64 === "string" &&
                          place.imageBase64.trim() !== ""
                            ? place.imageBase64.startsWith("data:")
                              ? place.imageBase64
                              : `data:image/png;base64,${place.imageBase64}`
                            : place.imageBase64
                        }
                        alt={selectedPlace.name}
                        style={{
                          width: "200px",
                          height: "auto",
                          borderRadius: "12px",
                        }}
                      />
                      <h3>{selectedPlace.name}</h3>
                      <p>{selectedPlace.description}</p>
                    </div>
                  </Popup>
                )}
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;