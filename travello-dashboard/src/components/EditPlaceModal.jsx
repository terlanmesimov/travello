import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const EditPlaceModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  categories,
  regions,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const category = categories?.find(
      (cat) => cat.name === initialData.categoryName
    );
    const region = regions?.find((reg) => reg.name === initialData.regionName);
    if (isOpen && initialData) {
      reset();
      setImagePreview(initialData.imageBase64 || null);
      setLocation({
        lat: initialData.location?.latitude || 0,
        lng: initialData.location?.longitude || 0,
      });

      setValue("name", initialData.name);
      setValue("description", initialData.description);
      setValue("category", category.id);
      setValue("region", region.id);
      setValue("rating", initialData.rating);
    }
  }, [isOpen, initialData, reset, setValue, regions, categories]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLocation({ lat, lng });
        setValue("location", { lat, lng });
      },
    });

    return location.lat !== 0 && location.lng !== 0 ? (
      <Marker position={[location.lat, location.lng]} />
    ) : null;
  };

  const SearchByCoordinates = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      if (lat && lng) {
        map.setView([lat, lng], 13);
      }
    }, [lat, lng, map]);
    return null;
  };

  function base64ToFile(base64String, filename) {
    const byteString = atob(base64String?.split(",")[1]); // Base64 stringi deşifrə etmək
    const mimeType = base64String?.split(",")[0].split(":")[1].split(";")[0]; // MIME type çıxarmaq

    const uintArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new File([uintArray], filename, { type: mimeType });
  }

  const onSubmit = async (data) => {
    const file = base64ToFile(initialData.imageBase64, "image.png");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (typeof data.image === "undefined") {
        formData.append("image", file);
      } else {
        formData.append("image", data.image);
      }
      formData.append("categoryId", data.category);
      formData.append("regionId", data.region);
      formData.append("rating", data.rating);
      formData.append("latitude", location.lat);
      formData.append("longitude", location.lng);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/place/update/${initialData.id}`,
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
      console.error("Error updating place:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="modal-title">Edit Place</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="modal-input"
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}

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
        <select
          {...register("category", { required: "Category is required" })}
          className="modal-input"
        >
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="error-message">{errors.category.message}</p>
        )}
        <select
          {...register("region", { required: "Region is required" })}
          className="modal-input"
        >
          {regions?.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        {errors.region && (
          <p className="error-message">{errors.region.message}</p>
        )}

        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="Rating (0 - 5)"
          {...register("rating", {
            required: "Rating is required",
            min: { value: 0, message: "Rating must be at least 0" },
            max: { value: 5, message: "Rating cannot exceed 5" },
          })}
          className="modal-input"
        />
        {errors.rating && (
          <p className="error-message">{errors.rating.message}</p>
        )}

        <div className="coordinate-inputs">
          <input
            type="number"
            step="0.000001"
            placeholder="Latitude"
            value={location.lat}
            onChange={(e) =>
              setLocation({ ...location, lat: parseFloat(e.target.value) })
            }
            className="modal-input"
          />
          <input
            type="number"
            step="0.000001"
            placeholder="Longitude"
            value={location.lng}
            onChange={(e) =>
              setLocation({ ...location, lng: parseFloat(e.target.value) })
            }
            className="modal-input"
          />
        </div>

        <div className="map-container">
          <MapContainer
            center={[location.lat || 40.4093, location.lng || 49.8671]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
            <SearchByCoordinates lat={location.lat} lng={location.lng} />
          </MapContainer>
        </div>
        {location.lat === 0 && location.lng === 0 && (
          <p className="error-message">Location is required</p>
        )}

        <div className="modal-buttons">
          <button type="submit" className="modal-button add-button">
            Save Changes
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

export default EditPlaceModal;
