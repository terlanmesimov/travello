// Components
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_REST_API_URL}/place/fav-list`,
        { headers: { token: token } }
      );
      setFavorites(response.data);
    } catch (error) {
      navigate("*");
    }
  }, [navigate]);

  const deleteFavorites = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_REST_API_URL}/place/delete-fav/${id}`,
          {
            headers: {
              token: token,
            },
          }
        );
        fetchFavorites();
      } catch (error) {
        navigate("*");
      }
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <>
      <div className="page-wrapper">
        <Header />
        <div className="favorites">
          <div className="container">
            <h1 className="favorites-heading">Favoritlər</h1>
            <div className="favorites-grid">
              {favorites.map((favorite) => {
                return (
                  <div key={favorite.id} className="favorite-card">
                    <img
                      src={`data:image/png;base64,${favorite.imageBase64}`}
                      alt={favorite.name}
                      className="favorite-image"
                    />
                    <div className="favorite-info">
                      <h3
                        onClick={() => navigate(`/card-detail/${favorite.id}`)}
                        className="favorite-title"
                      >
                        {favorite.name}
                      </h3>
                      <p className="favorite-description">
                        {favorite.description}
                      </p>
                      <button
                        onClick={() => deleteFavorites(favorite.id)}
                        className="favorite-remove"
                      >
                        Favoritlərdən Çıxar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Favorites;
