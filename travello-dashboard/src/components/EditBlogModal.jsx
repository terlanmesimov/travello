import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditBlogModal = ({ isOpen, onClose, onSave, initialData, places }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const [imagePreview, setImagePreview] = useState(initialData?.image || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [placeIds, setPlaceIds] = useState([]);

  useEffect(() => {
    console.log("Initial Data:", initialData);

    if (isOpen) {
      reset({
        name: initialData?.name || "",
        author: initialData?.author || "",
        description: initialData?.description || "",
      });
      setImagePreview(initialData?.imageBase64 || null);
      setFilteredPlaces(initialData?.places || []);
      setPlaceIds(initialData?.places.map((place) => place.id) || []);
      setSearchTerm("");
    }
  }, [isOpen, initialData, reset]);

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

  function base64ToFile(base64String, filename) {
    const byteString = atob(base64String?.split(",")[1]);
    const mimeType = base64String?.split(",")[0].split(":")[1].split(";")[0];

    const uintArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new File([uintArray], filename, { type: mimeType });
  }

  const onSubmit = async (data) => {
    const file = base64ToFile(initialData.imageBase64, "image.png");
    console.log(placeIds);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("author", data.author);
      formData.append("placeIds", [placeIds]);
      if (typeof data.image === "undefined") {
        formData.append("image", file);
      } else {
        formData.append("image", data.image);
      }
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/blog/update/${initialData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content edit-blog-modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="modal-title">Edit Blog</h2>
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
          <button type="submit" className="modal-button save-button">
            Save
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

export default EditBlogModal;
