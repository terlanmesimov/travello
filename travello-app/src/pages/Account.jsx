// Components
import Footer from "../components/Footer";
import Header from "../components/Header";

const Account = () => {
  return (
    <>
      <Header />
      <div className="account">
        <div className="container">
          <h1 className="account-heading">Hesabım</h1>
          <div className="account-info">
            <div className="profile-picture">
              <img
                src="https://via.placeholder.com/150"
                alt="Profil Şəkli"
                className="profile-image"
              />
              <div className="profile-actions">
                <button className="profile-action-button">Şəkil Yüklə</button>
                <button className="profile-action-button">Şəkli Sil</button>
              </div>
            </div>
            <div className="user-details">
              <h2 className="user-name">İstifadəçi Adı</h2>
              <p className="user-email">nümunə@mail.com</p>
            </div>
          </div>

          <div className="user-reviews">
            <h2 className="reviews-heading">Rəylərim</h2>
            <div className="reviews-list">
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

export default Account;
