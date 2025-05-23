import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RenderStars from "../utils/StarUtil";
import axios from "axios";

const PlaceGrid = ({ resultData , isLoading = false }) => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);

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

  if (isLoading) {
    return (
      <section className="places-grid">
        <div className="container">
          <div className="place-cards">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="place-card skeleton">
                <div className="image-skeleton"></div>
                <div className="place-info">
                  <div className="title-skeleton"></div>
                  <div className="desc-skeleton"></div>
                  <div className="rating-skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (resultData && resultData.length === 0) {
    return (
      <section className="places-grid">
        <div className="container">
          <div className="place-cards">
            {places
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 6)
              .map((place) => (
                <div
                  className="place-card fade-in staggered"
                  key={place.id}
                  onClick={() => navigate(`/card-detail/${place.id}`)}
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
                    alt={place.name}
                  />
                  <div className="place-info">
                    <h3>{place.name}</h3>
                    <p>{place.description}</p>
                    <div className="place-rating">
                      <RenderStars rating={place.rating} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  }

  if (!resultData) {
    return (
      <section className="places-grid">
        <div className="container">
          <div className="empty-results">
            <div className="empty-icon">🔍</div>
            <h3>Hələ ki, nəticə yoxdur</h3>
            <p>Səyahət etmək istədiyiniz yeri axtarın</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="places-grid">
        <div className="container">
          <div className="place-cards">
            {resultData.map((place) => (
              <div
                className="place-card fade-in staggered"
                key={place.id}
                onClick={() => navigate(`/card-detail/${place.id}`)}
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
                  alt={place.name}
                />
                <div className="place-info">
                  <h3>{place.name}</h3>
                  <p>{place.description}</p>
                  <div className="place-rating">
                    <RenderStars rating={place.rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PlaceGrid;
