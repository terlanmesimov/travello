// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../routes/GlobalProvider";
import { useForm } from "react-hook-form";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({});
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

  const fetchBlogData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_REST_API_URL}/blog/get/${id}`
      );
      setBlogData(response.data);
      setComments(response.data.comments);
    } catch (error) {
      navigate("*");
    }
  }, [id, navigate]);

  const openEditModal = (comment) => {
    setCurrentComment(comment);
    setIsEditing(true);
  };

  const addComment = async (data) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_REST_API_URL}/blog/add-comment`,
          {
            text: data.comment,
            rating: null,
            createdAt: null,
            placeId: null,
            blogId: id,
          },
          {
            headers: {
              token: token,
            },
          }
        );
        const newComment = response.data;
        setComments([newComment, ...comments]);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  return (
    <>
      <Header />
      <div className="blog-detail">
        <div className="container">
          <div className="blog-detail">
            <h1 className="blog-detail-title">{blogData.name}</h1>
            <p className="blog-detail-meta">
              <span className="blog-author">Yazan: {blogData.author}</span> |
              <span className="blog-date">
                {" "}
                {blogData.createdAt?.split("T").join(" ").substring(0, 10)}
              </span>
            </p>
            <img
              src={
                blogData.imageBase64 &&
                typeof blogData.imageBase64 === "string" &&
                blogData.imageBase64.trim() !== ""
                  ? blogData.imageBase64.startsWith("data:")
                    ? blogData.imageBase64
                    : `data:image/png;base64,${blogData.imageBase64}`
                  : blogData.imageBase64
              }
              alt={blogData.name}
              className="blog-detail-image"
            />
            <div className="blog-detail-content">
              <p>{blogData.description}</p>
              {blogData.places?.map((place) => (
                <RelatedPlace
                  key={place.id}
                  id={place.id}
                  name={place.name}
                  description={place.description}
                />
              ))}
            </div>
          </div>

          <section className="comments-section">
            <div className="container">
              <h2 className="comments-title">Şərhlər</h2>
              <form
                onSubmit={handleSubmit(addComment)}
                className="comment-form"
              >
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
          </section>
        </div>
      </div>
      {isEditing && (
        <EditModal
          setIsEditing={setIsEditing}
          currentComment={currentComment}
          setCurrentComment={setCurrentComment}
          blogId={id}
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
          `${process.env.REACT_APP_REST_API_URL}/blog/delete-comment/${id}`,
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
              : profilePictureBase64
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
  blogId,
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
          `${process.env.REACT_APP_REST_API_URL}/blog/edit-comment/${currentComment.id}`,
          {
            text: formData.comment,
            rating: null,
            createdAt: null,
            placeId: null,
            blogId: blogId,
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
          <button type="submit" className="save-comment">
            Yadda Saxla
          </button>
        </form>
      </div>
    </div>
  );
};

const RelatedPlace = ({ id, name, description }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/card-detail/${id}`)}
        key={id}
        className="related-place"
      >
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </>
  );
};

export default BlogDetail;
