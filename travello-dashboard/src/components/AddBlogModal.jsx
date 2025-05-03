import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddBlogModal = ({ isOpen, onClose, onAdd, places }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [placeIds, setPlaceIds] = useState([]);

  useEffect(() => {
    if (isOpen) {
      reset();
      setImagePreview(null);
      setPlaceIds([]);
      setSearchTerm("");
      setFilteredPlaces([]);
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (searchTerm) {
      const results = places.filter((place) =>
        place.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPlaces(results);
    } else {
      setFilteredPlaces([]);
    }
  }, [searchTerm, places]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const handleAddPlace = (placeId) => {
    if (!placeIds.includes(placeId)) {
      setPlaceIds([...placeIds, placeId]);
    }
  };

  const handleRemovePlace = (placeId) => {
    setPlaceIds(placeIds.filter((id) => id !== placeId));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("author", data.author);
      formData.append("placeIds", [placeIds]);
      formData.append("image", data.image);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/blog/save`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onAdd(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content add-blog-modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="modal-title">Add Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="modal-input"
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}

        <input
          type="text"
          placeholder="Author"
          {...register("author", { required: "Author is required" })}
          className="modal-input"
        />
        {errors.author && (
          <p className="error-message">{errors.author.message}</p>
        )}

        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
          className="modal-input"
        />
        {errors.description && (
          <p className="error-message">{errors.description.message}</p>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="modal-input"
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="image-preview" />
        )}
        {errors.image && <p className="error-message">Image is required</p>}

        <div className="related-places">
          <input
            type="text"
            placeholder="Search places"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="modal-input"
          />
          <ul className="search-results">
            {filteredPlaces.map((place) => (
              <li key={place.id} className="search-result-item">
                {place.name}
                <button
                  type="button"
                  onClick={() => handleAddPlace(place.id)}
                  className="add-place-button"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="selected-places-list">
          {placeIds.map((placeId) => {
            const place = places.find((p) => p.id === placeId);
            return (
              <li key={placeId} className="selected-place-item">
                {place?.name}
                <button
                  type="button"
                  onClick={() => handleRemovePlace(placeId)}
                  className="remove-place-button"
                >
                  x
                </button>
              </li>
            );
          })}
        </ul>

        <div className="modal-buttons">
          <button type="submit" className="modal-button add-button">
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            className="modal-button cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBlogModal;