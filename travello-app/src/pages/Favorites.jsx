// Components
import Footer from "../components/Footer";
import Header from "../components/Header";

const Favorites = () => {
  return (
    <>
      <Header />
      <div className="favorites">
          <div className="container">
            <h1 className="favorites-heading">Favoritlər</h1>
            <div className="favorites-grid">
              <div className="favorite-card">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="İçərişəhər"
                  className="favorite-image"
                />
                <div className="favorite-info">
                  <h3 className="favorite-title">İçərişəhər</h3>
                  <p className="favorite-description">Bakının tarixi mərkəzi</p>
                  <button className="favorite-remove">
                    Favoritlərdən Çıxar
                  </button>
                </div>
              </div>
              <div className="favorite-card">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Xınalıq"
                  className="favorite-image"
                />
                <div className="favorite-info">
                  <h3 className="favorite-title">Xınalıq</h3>
                  <p className="favorite-description">
                    Qafqazın ən yüksək kəndi
                  </p>
                  <button className="favorite-remove">
                    Favoritlərdən Çıxar
                  </button>
                </div>
              </div>
              <div className="favorite-card">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Şəki Xan Sarayı"
                  className="favorite-image"
                />
                <div className="favorite-info">
                  <h3 className="favorite-title">Şəki Xan Sarayı</h3>
                  <p className="favorite-description">
                    UNESCO-nun Ümumdünya İrs Siyahısında
                  </p>
                  <button className="favorite-remove">
                    Favoritlərdən Çıxar
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
