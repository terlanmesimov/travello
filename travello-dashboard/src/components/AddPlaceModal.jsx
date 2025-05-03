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

const AddPlaceModal = ({ isOpen, onClose, onAdd, categories, regions }) => {
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
    if (isOpen) {
      reset();
      setImagePreview(null);
      setLocation({ lat: 0, lng: 0 });
    }
  }, [isOpen, reset]);

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

    return location.lat !== 0 &&
      location.lng !== 0 &&
      !isNaN(location.lat) &&
      !isNaN(location.lng) ? (
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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("image", data.image);
      formData.append("categoryId", data.category);
      formData.append("regionId", data.region);
      formData.append("rating", data.rating);
      formData.append("latitude", location.lat);
      formData.append("longitude", location.lng);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/place/save`,
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
      className="modal-content add-place-modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="modal-title">Add Place</h2>
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
          <option value="">Select Category</option>
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
          <option value="">Select Region</option>
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
            {...register("latitude", {
              pattern: {
                value: /^-?([1-8]?[0-9](\.\d+)?|90(\.0+)?)$/,
                message: "Invalid Latitude. Must be between -90 and 90",
              },
            })}
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
            {...register("longitude", {
              pattern: {
                value: /^-?((1[0-7][0-9]|[1-9]?[0-9])(\.\d+)?|180(\.0+)?)$/,
                message: "Invalid Longitude. Must be between -180 and 180",
              },
            })}
            onChange={(e) =>
              setLocation({ ...location, lng: parseFloat(e.target.value) })
            }
            className="modal-input"
          />

          {(errors.latitude || errors.longitude) && (
            <p style={{ marginTop: "10px" }} className="error-message">
              {errors.latitude?.message || errors.longitude?.message}
            </p>
          )}
        </div>
        <div className="map-container">
          <MapContainer
            center={[40.4093, 49.8671]}
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

export default AddPlaceModal;
