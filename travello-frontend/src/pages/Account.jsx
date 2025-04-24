import { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { GlobalContext } from "../utils/GlobalProvider";

const Account = () => {
  const { userData, setUserData } = useContext(GlobalContext);
  return (
    <>
      <Header />
      <div className="account">
        <div className="container">
          <h1 className="account-heading">Hesabım</h1>
          <div className="account-info">
            <div className="profile-picture">
              <img
                src={`data:image/jpeg;base64,${userData.profilePictureBase64}`}
                alt="Profil Şəkli"
                className="profile-image"
              />
              <div className="profile-actions">
                <button className="profile-action-button">Şəkil Yüklə</button>
                <button className="profile-action-button">Şəkli Sil</button>
              </div>
            </div>
            <div className="user-details">
              <h2 className="user-name">{userData.username}</h2>
              <p className="user-email">{userData.email}</p>
            </div>
          </div>
          
          <div className="user-reviews">
            <h2 className="reviews-heading">Rəylərim</h2>
            <div className="reviews-list">
              <Review />
              <div className="review">
                <div className="review-place">İçərişəhər</div>
                <div className="review-rating">★★★★☆</div>
                <div className="review-text">Bu məkan çox gözəldir!</div>
                <div className="review-date">12 Oktyabr 2023</div>
              </div>
              <div className="review">
                <div className="review-place">Xınalıq</div>
                <div className="review-rating">★★★★★</div>
                <div className="review-text">Təbiət möcüzəsi!</div>
                <div className="review-date">10 Oktyabr 2023</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const Review = (e) => {
  return (
    <>
      <div className="review">
        <div className="review-place">İçərişəhər</div>
        <div className="review-rating">★★★★☆</div>
        <div className="review-text">Bu məkan çox gözəldir!</div>
        <div className="review-date">12 Oktyabr 2023</div>
      </div>
    </>
  );
};

export default Account;
