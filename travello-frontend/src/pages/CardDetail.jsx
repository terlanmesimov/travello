import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import RenderStars from "../utils/StarUtil";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { GlobalContext } from "../routes/GlobalProvider";
import { useForm } from "react-hook-form";
import defaultProfilePhoto from "../assets/images/default_profile_photo.png";

const CardDetail = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState({});
  const [addedFavorites, setAddedFavoites] = useState(false);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { userData } = useContext(GlobalContext);
  const [isEditing, setIsEditing] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const calculateAverageRating = useCallback((commentsList) => {
    if (!commentsList || commentsList.length === 0) return 0;
    const sum = commentsList.reduce((acc, comment) => acc + comment.rating, 0);
    return (sum / commentsList.length).toFixed(1);
  }, []);

  const updatePlaceWithNewRating = useCallback((newRating) => {
    setPlaceData((prev) => ({
      ...prev,
      rating: newRating,
    }));
  }, []);

  const openEditModal = (comment) => {
    setCurrentComment(comment);
    setIsEditing(true);
  };

  const fetchPlaceData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_REST_API_URL}/place/get/${id}`
      );
      const data = response.data;
      const avgRating = calculateAverageRating(data.comments);
      setPlaceData({
        ...data,
        rating: avgRating,
      });
      setComments(data.comments);
    } catch (error) {
      navigate("*");
    }
  }, [id, navigate, calculateAverageRating]);

  const addFavorites = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_REST_API_URL}/place/add-fav/${id}`,
          {},
          {
            headers: {
              token: token,
            },
          }
        );
        const isAdded = response.data;
        setAddedFavoites(isAdded);
      } catch (error) {
        navigate("*");
      }
    } else {
      navigate("/login");
    }
  };

  const deleteFavorites = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_REST_API_URL}/place/delete-fav/${id}`,
          {
            headers: {
              token: token,
            },
          }
        );
        const isDeleted = response.data;
        setAddedFavoites(!isDeleted);
      } catch (error) {
        navigate("*");
      }
    } else {
      navigate("/login");
    }
  };

  const checkFavoriteState = useCallback(() => {
    const isFavorite = userData.favorites?.some(
      (favorite) => String(favorite.id) === id
    );
    setAddedFavoites(isFavorite);
  }, [id, userData.favorites]);

  const addComment = async (data) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_REST_API_URL}/place/add-comment`,
          {
            text: data.comment,
            rating: Number(data.rating),
            createdAt: null,
            placeId: id,
            blogId: null,
          },
          {
            headers: {
              token: token,
            },
          }
        );
        const newComment = response.data;
        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);
        const newRating = calculateAverageRating(updatedComments);
        updatePlaceWithNewRating(newRating);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchPlaceData();
    checkFavoriteState();
  }, [fetchPlaceData, checkFavoriteState]);

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    const url = window.location.href;
    const text = `${placeData.name} - Travello`;
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link kopyalandı!");
  };

  return (
    <>
      <Header />
      <div className="card-detail">
        <div className="container">
          <div className="place-images">
            <img
              src={
                placeData.imageBase64 &&
                typeof placeData.imageBase64 === "string" &&
                placeData.imageBase64.trim() !== ""
                  ? placeData.imageBase64.startsWith("data:")
                    ? placeData.imageBase64
                    : `data:image/png;base64,${placeData.imageBase64}`
                  : placeData.imageBase64
              }
              alt={placeData.name}
              className="place-main-image"
            />
          </div>
          <div className="place-info">
            <h1 className="place-title">{placeData.name}</h1>
            <p className="place-description">{placeData.description}</p>

            <div className="share-buttons">
              <h3 className="share-title">Paylaş</h3>
              <div className="social-buttons">
                <button
                  onClick={shareOnFacebook}
                  className="share-button facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="share-button twitter"
                >
                  <i className="fab fa-twitter"></i>
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="share-button linkedin"
                >
                  <i className="fab fa-linkedin-in"></i>
                </button>
                <button onClick={copyToClipboard} className="share-button copy">
                  <i className="fas fa-link"></i>
                </button>
              </div>
            </div>

            <div className="place-rating">
              <span className="rating-stars">
                <RenderStars rating={placeData.rating ? placeData.rating : 0} />
              </span>
              <span className="rating-value">{placeData.rating}</span>
            </div>
            {addedFavorites && (
              <button onClick={deleteFavorites} className="place-favorite">
                Favoritlərdən Çıxar
              </button>
            )}
            {!addedFavorites && (
              <button onClick={addFavorites} className="place-favorite">
                Favoritlərə Əlavə Et
              </button>
            )}
          </div>

          {placeData.location && (
            <div className="place-map">
              <h2 className="map-title">Məkanın Yeri</h2>
              <MapContainer
                center={[
                  placeData.location.latitude,
                  placeData.location.longitude,
                ]}
                zoom={15}
                scrollWheelZoom={false}
                style={{
                  height: "400px",
                  width: "100%",
                  borderRadius: "8px",
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={[
                    placeData.location.latitude,
                    placeData.location.longitude,
                  ]}
                >
                  <Popup>{placeData.name}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}

          {placeData.location && (
            <div className="street-view">
              <h2 className="map-title">Street View</h2>
              <iframe
                title={`Street View of ${placeData.name}`}
                width="100%"
                height="400"
                style={{ borderRadius: "8px" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed?pb=!4v${Date.now()}!6m8!1m7!1sCAoSLEFGMVFpcFBQYm5WblY4M0lZV3RPRnVjdVFaMXl3WmtmcnJHUGRCUzZ1TWUx!2m2!1d${
                  placeData.location.latitude
                }!2d${placeData.location.longitude}!3f0!4f0!5f1.2`}
              ></iframe>
            </div>
          )}

          <div className="place-comments">
            <h2 className="comments-title">Şərhlər</h2>
            <form onSubmit={handleSubmit(addComment)} className="comment-form">
              <div className="form-group">
                <textarea
                  className="comment-input"
                  placeholder="Şərhinizi yazın..."
                  rows="4"
                  {...register("comment", {
                    required: "Şərh tələb olunur",
                  })}
                ></textarea>
                {errors.comment && (
                  <p className="form-error">{errors.comment.message}</p>
                )}
              </div>
              <div className="form-group comment-rating">
                <span className="rating-label">Reytinq:</span>
                <select
                  className="rating-select"
                  {...register("rating", {
                    required: "Reytinq tələb olunur",
                  })}
                >
                  <option value="5">★★★★★</option>
                  <option value="4">★★★★☆</option>
                  <option value="3">★★★☆☆</option>
                  <option value="2">★★☆☆☆</option>
                  <option value="1">★☆☆☆☆</option>
                </select>
                {errors.rating && (
                  <p className="form-error">{errors.rating.message}</p>
                )}
              </div>
              <button type="submit" className="comment-submit">
                Şərh Göndər
              </button>
            </form>
            <div className="comment-list">
              {comments.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    text={comment.text}
                    rating={comment.rating}
                    username={comment.username}
                    createdAt={comment.createdAt}
                    profilePictureBase64={comment.profilePictureBase64}
                    userData={userData}
                    onEdit={() => openEditModal(comment)}
                    comments={comments}
                    setComments={setComments}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isEditing && (
        <EditModal
          setIsEditing={setIsEditing}
          currentComment={currentComment}
          setCurrentComment={setCurrentComment}
          placeId={id}
          comments={comments}
          setComments={setComments}
        />
      )}
      <Footer />
    </>
  );
};

const Comment = ({
  id,
  text,
  rating,
  username,
  createdAt,
  profilePictureBase64,
  userData,
  onEdit,
  comments,
  setComments,
}) => {
  const navigate = useNavigate();

  const date = createdAt.split("T").join(" ").substring(0, 19);

  const deleteComment = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_REST_API_URL}/place/delete-comment/${id}`,
          {
            headers: {
              token: token,
            },
          }
        );
        const updatedComments = comments.filter((comment) => comment.id !== id);
        setComments(updatedComments);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div key={id} className="comment">
      <div className="comment-left">
        <img
          src={
            profilePictureBase64 &&
            typeof profilePictureBase64 === "string" &&
            profilePictureBase64.trim() !== ""
              ? profilePictureBase64.startsWith("data:")
                ? profilePictureBase64
                : `data:image/png;base64,${profilePictureBase64}`
              : defaultProfilePhoto
          }
          alt={username}
          className="comment-profile-image"
        />
      </div>
      <div className="comment-right">
        <div className="comment-header">
          <span className="comment-author">{username}</span>
          <span className="comment-date">{date}</span>
        </div>
        <div className="comment-text">{text}</div>
        <div className="comment-rating">
          <RenderStars rating={rating} />
        </div>
        {userData.username && userData.username === username && (
          <div className="comment-actions">
            <button onClick={onEdit} className="comment-edit">
              Redaktə Et
            </button>
            <button onClick={deleteComment} className="comment-delete">
              Sil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const EditModal = ({
  placeId,
  setIsEditing,
  currentComment,
  setCurrentComment,
  comments,
  setComments,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const closeEditModal = () => {
    setIsEditing(false);
    setCurrentComment(null);
  };

  const navigate = useNavigate();

  const updateComment = async (formData) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_REST_API_URL}/place/edit-comment/${currentComment.id}`,
          {
            text: formData.comment,
            rating: formData.rating,
            createdAt: null,
            placeId: placeId,
            blogId: null,
          },
          {
            headers: {
              token: token,
            },
          }
        );
        const updatedComment = response.data;
        const updatedComments = comments.filter(
          (comment) => comment.id !== updatedComment.id
        );
        setComments([updatedComment, ...updatedComments]);
        closeEditModal();
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (currentComment) {
      setValue("comment", currentComment.text);
      setValue("rating", currentComment.rating);
    }
  }, [currentComment, setValue]);

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <button className="close-modal" onClick={closeEditModal}>
          ✖
        </button>
        <h2>Şərhi Redaktə Et</h2>
        <form onSubmit={handleSubmit(updateComment)}>
          <div className="form-group">
            <textarea
              className="edit-comment-input"
              {...register("comment", {
                required: "Şərh tələb olunur",
              })}
              rows="4"
            ></textarea>
            {errors.comment && (
              <p className="form-error">{errors.comment.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="rating">Reytinq:</label>
            <select
              className="edit-rating-select"
              {...register("rating", {
                required: "Reytinq tələb olunur",
              })}
            >
              <option value="5">★★★★★</option>
              <option value="4">★★★★☆</option>
              <option value="3">★★★☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
            </select>
            {errors.rating && (
              <p className="form-error">{errors.rating.message}</p>
            )}
          </div>
          <button type="submit" className="save-comment">
            Yadda Saxla
          </button>
        </form>
      </div>
    </div>
  );
};
export default CardDetail;
