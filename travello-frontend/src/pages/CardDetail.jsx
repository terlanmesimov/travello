import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import RenderStars from "../utils/StarUtil";

const CardDetail = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_REST_API_URL}/place/get-by-id/${id}`)
      .then((response) => {
        setPlaceData(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <>
      <Header />
      <div className="card-detail">
        <div className="container">
          <div className="place-images">
            <img
              src={`data:image/jpeg;base64,${placeData.imageBase64}`}
              alt={placeData.name}
              className="place-main-image"
            />
          </div>
          <div className="place-info">
            <h1 className="place-title">{placeData.name}</h1>
            <p className="place-description">{placeData.description}</p>
            <div className="place-rating">
              <span className="rating-stars">
                <RenderStars rating={placeData.rating ? placeData.rating : 0} />
              </span>
              <span className="rating-value">{placeData.rating}</span>
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
              <Comment />
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

const Comment = () => {
  return (
    <>
      <div className="comment">
        <div className="comment-author">İstifadəçi Adı</div>
        <div className="comment-text">Bu məkan çox gözəldir!</div>
        <div className="comment-rating">★★★★☆</div>
        <div className="comment-date">12 Oktyabr 2023</div>
      </div>
    </>
  );
};

export default CardDetail;
