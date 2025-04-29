import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { GlobalContext } from "../utils/GlobalProvider";
import defaultProfilePhoto from "../assets/images/default_profile_photo.png";
import RenderStars from "../utils/StarUtil";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { userData, setUserData, setHasToken } = useContext(GlobalContext);
  const [formData, setFormData] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file) {
      alert("Fayl oxunmadı.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("Fayl çox böyükdür. Maksimum 10MB icazə verilir.");
      return;
    }
    const formData = new FormData();
    formData.append("profilePhoto", file);
    setFormData(formData);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    fileInputRef.current.value = null;
  };

  const handleImageDelete = () => {
    deleteProfilePhoto();
  };

  const changeProfilePhoto = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token || !formData) return;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_REST_API_URL}/user/change-pp`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );
      setUserData((prevData) => ({
        ...prevData,
        profilePictureBase64: response.data,
      }));
    } catch (error) {
      console.error(error.message);
    }
  }, [formData, setUserData]);

  const deleteProfilePhoto = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await axios.delete(
        `${process.env.REACT_APP_REST_API_URL}/user/delete-pp`,
        { headers: { token } }
      );
      setUserData({
        ...userData,
        profilePictureBase64: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const resetPassword = () => {
    const isConfirmed = window.confirm("Şifrəni dəyişmək istəyirsiniz?");
    if (isConfirmed) {
      navigate("/reset-password");
    }
  };

  const logout = () => {
    const isConfirmed = window.confirm("Çıxış etmək istədiyinizə əminsiniz ?");
    if (isConfirmed) {
      localStorage.removeItem("token");
      setHasToken(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (formData && previewUrl) {
      changeProfilePhoto();
    }
  }, [previewUrl, changeProfilePhoto, formData]);

  return (
    <>
      <Header />
      <div className="account">
        <div className="container">
          <h1 className="account-heading">Hesabım</h1>
          <div className="account-info">
            <div className="profile-picture">
              <img
                src={
                  userData?.profilePictureBase64 &&
                  typeof userData.profilePictureBase64 === "string" &&
                  userData.profilePictureBase64.trim() !== ""
                    ? userData.profilePictureBase64.startsWith("data:")
                      ? userData.profilePictureBase64
                      : `data:image/png;base64,${userData.profilePictureBase64}`
                    : defaultProfilePhoto
                }
                alt="Profil Şəkli"
                className="profile-image"
              />
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
                  <button
                    onClick={handleImageDelete}
                    className="profile-action-button"
                  >
                    Şəkli Sil
                  </button>
                )}
              </div>
            </div>
            <div className="user-details">
              <h2 className="user-name">{userData.username}</h2>
              <p className="user-email">{userData.email}</p>
              <div className="account-actions">
                <button
                  onClick={resetPassword}
                  className="account-action-button"
                >
                  Şifrəni Dəyiş
                </button>
                <button onClick={logout} className="account-action-button">
                  Çıxış Et
                </button>
              </div>
            </div>
          </div>

          <div className="user-reviews">
            <h2 className="reviews-heading">Rəylərim</h2>
            <div className="reviews-list">
              {userData.commentIds?.map((comment) => (
                <Review
                  key={comment.id}
                  id={comment.id}
                  name={comment.name}
                  rating={comment?.rating}
                  text={comment.text}
                  date={comment.date}
                  type={comment.rating === null ? "blog" : "place"}
                />
              ))}
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
    <div key={id} className="review">
      <div className="review-place">{name}</div>
      <div className="review-rating">
        {/* <RenderStars rating={rating} /> */}
      </div>
      <div className="review-text">{text}</div>
      <div className="review-date">{date}</div>
    </div>
  );
};

export default Account;
