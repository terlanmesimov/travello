import Header from "../components/Header";
import Footer from "../components/Footer";

const CardDetail = () => {
  return (
    <>
      <Header />
      <div className="card-detail">
        <div className="container">
          <div className="place-images">
            <img
              src="https://via.placeholder.com/800x400"
              alt="İçərişəhər"
              className="place-main-image"
            />
            <div className="place-thumbnails">
              <img
                src="https://via.placeholder.com/200x150"
                alt="İçərişəhər 1"
                className="place-thumbnail"
              />
              <img
                src="https://via.placeholder.com/200x150"
                alt="İçərişəhər 2"
                className="place-thumbnail"
              />
              <img
                src="https://via.placeholder.com/200x150"
                alt="İçərişəhər 3"
                className="place-thumbnail"
              />
            </div>
          </div>

          <div className="place-info">
            <h1 className="place-title">İçərişəhər</h1>
            <p className="place-description">
              İçərişəhər, Bakının tarixi mərkəzidir. Burada Qız Qalası,
              Şirvanşahlar Sarayı kimi məşhur abidələri ziyarət edə bilərsiniz.
            </p>
            <div className="place-rating">
              <span className="rating-stars">★★★★☆</span>
              <span className="rating-value">4.5</span>
            </div>
            <button className="place-favorite">Favoritlərə Əlavə Et</button>
          </div>

          <div className="place-comments">
            <h2 className="comments-title">Şərhlər</h2>
            <div className="comment-form">
              <textarea
                className="comment-input"
                placeholder="Şərhinizi yazın..."
                rows="4"
              ></textarea>
              <div className="comment-rating">
                <span className="rating-label">Reytinq:</span>
                <select className="rating-select">
                  <option value="5">★★★★★</option>
                  <option value="4">★★★★☆</option>
                  <option value="3">★★★☆☆</option>
                  <option value="2">★★☆☆☆</option>
                  <option value="1">★☆☆☆☆</option>
                </select>
              </div>
              <button className="comment-submit">Şərh Göndər</button>
            </div>

            <div className="comment-list">
              <div className="comment">
                <div className="comment-author">İstifadəçi Adı</div>
                <div className="comment-text">Bu məkan çox gözəldir!</div>
                <div className="comment-rating">★★★★☆</div>
                <div className="comment-date">12 Oktyabr 2023</div>
              </div>
              <div className="comment">
                <div className="comment-author">Başqa İstifadəçi</div>
                <div className="comment-text">
                  Təşəkkürlər, çox maraqlı idi.
                </div>
                <div className="comment-rating">★★★★★</div>
                <div className="comment-date">13 Oktyabr 2023</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CardDetail;
