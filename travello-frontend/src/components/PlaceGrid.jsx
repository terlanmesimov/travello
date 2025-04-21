import { useEffect } from "react";

const PlaceGrid = ({ resultData }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {Array(fullStars)
          .fill("★")
          .map((star, index) => (
            <span key={`full-${index}`} style={{ color: "gold" }}>
              {star}
            </span>
          ))}
        {halfStar && <span style={{ color: "gold" }}>☆</span>}
        {Array(emptyStars)
          .fill("☆")
          .map((star, index) => (
            <span key={`empty-${index}`} style={{ color: "gray" }}>
              {star}
            </span>
          ))}
      </>
    );
  };

  return (
    <>
      <section className="places-grid">
        <div className="container">
          <div className="place-cards">
            {resultData.map((place) => (
              <div className="place-card" key={place.id}>
                <img    src={`data:image/jpeg;base64,${place.imageBase64}`} alt={place.name} />
                <div className="place-info">
                  <h3>{place.name}</h3>
                  <p>{place.description}</p>
                  <div className="place-rating">
                    {renderStars(place.rating)} ({place.rating})
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
