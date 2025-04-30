import { useNavigate } from "react-router-dom";
import RenderStars from "../utils/StarUtil";

const PlaceGrid = ({ resultData }) => {
  const navigate = useNavigate();
  return (
    <>
      <section className="places-grid">
        <div className="container">
          <div className="place-cards">
            {resultData.map((place) => (
              <div
                className="place-card"
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
