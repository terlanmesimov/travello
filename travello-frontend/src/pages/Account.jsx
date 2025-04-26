import { useContext, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { GlobalContext } from "../utils/GlobalProvider";
import defaultProfilePhoto from "../assets/images/default_profile_photo.png";
import RenderStars from "../utils/StarUtil";
import axios from "axios";

const Account = () => {
  const { userData, setUserData } = useContext(GlobalContext);
  const [imageBase64, setImageBase64] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profilePhoto", file);
    setImageBase64(formData);
  };

  const changeProfilePhoto = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_REST_API_URL}/user/change-pp`,
        imageBase64,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );
      setUserData({
        ...userData,
        profilePictureBase64: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (imageBase64 !== null) {
      changeProfilePhoto();
    }
  }, [imageBase64]);

  return (
    <>
      <Header />
      <div className="account">
        <div className="container">
          <h1 className="account-heading">Hesabım</h1>
          <div className="account-info">
            <div className="profile-picture">
              {userData.profilePictureBase64 === null ? (
                <img
                  src={defaultProfilePhoto}
                  alt="Profil Şəkli"
                  className="profile-image"
                />
              ) : (
                <img
                  src={
                    userData.profilePictureBase64 &&
                    userData.profilePictureBase64.startsWith("data:")
                      ? userData.profilePictureBase64
                      : `data:image/png;base64,${userData.profilePictureBase64}`
                  }
                  alt="Profil Şəkli"
                  className="profile-image"
                />
              )}
              <div className="profile-actions">
                <button
                  onClick={handleButtonClick}
                  className="profile-action-button"
                >
                  Şəkil Yüklə
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                {userData.profilePictureBase64 !== null && (
                  <button className="profile-action-button">Şəkli Sil</button>
                )}
              </div>
            </div>
            <div className="user-details">
              <h2 className="user-name">{userData.username}</h2>
              <p className="user-email">{userData.email}</p>
              <div className="account-actions">
                <button className="account-action-button">Şifrəni Dəyiş</button>
                <button className="account-action-button">Çıxış Et</button>
              </div>
            </div>
          </div>

          <div className="user-reviews">
            <h2 className="reviews-heading">Rəylərim</h2>
            <div className="reviews-list">
              {userData.commentIds?.map((comment) => {
                return (
                  <Review
                    id={comment.id}
                    name={comment.name}
                    rating={comment?.rating}
                    text={comment.text}
                    date={comment.date}
                    type={comment.rating === null ? "blog" : "place"}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const Review = ({ id, name, rating, text, date, type }) => {
  return (
    <>
      <div key={id} className="review">
        <div className="review-place">{name}</div>
        <div className="review-rating">
          <RenderStars rating={rating} />
        </div>
        <div className="review-text">{text}</div>
        <div className="review-date">{date}</div>
      </div>
    </>
  );
};

export default Account;
