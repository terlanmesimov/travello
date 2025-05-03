import axios from "axios";
import React, { useEffect, useState } from "react";
import AddPlaceModal from "../components/AddPlaceModal";
import EditPlaceModal from "../components/EditPlaceModal";

const Place = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchRegions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/region/list`
      );
      const data = response.data;
      setRegions(data);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/list`
      );
      const data = response.data;
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/place/list`
      );
      const data = response.data;
      setPlaces(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const handleClickAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleAddPlace = (newPlace) => {
    setPlaces((prevPlaces) => [...prevPlaces, { ...newPlace, id: Date.now() }]);
  };

  const handleClickEdit = (place) => {
    setSelectedPlace(place);
    setIsEditModalOpen(true);
  };

  const handleSavePlace = (updatedPlace) => {
    setPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === updatedPlace.id ? updatedPlace : place
      )
    );
  };

  const handleClickDelete = async (place) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/place/delete/${place.id}`
      );
      console.log(response.data);
      setPlaces((prevPlaces) => prevPlaces.filter((p) => p.id !== place.id));
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
    fetchRegions();
    fetchCategories();
  }, []);

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="place-page">
      <AddPlaceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPlace}
        regions={regions}
        categories={categories}
      />
      {selectedPlace && (
        <EditPlaceModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSavePlace}
          initialData={selectedPlace}
          regions={regions}
          categories={categories}
        />
      )}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search places..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <button onClick={handleClickAdd} className="add-button">
        Add Place
      </button>
      <div className="place-grid">
        {filteredPlaces.map((place) => (
          <div className="place-card" key={place.id}>
            <img
              src={
                place.imageBase64 &&
                typeof place.imageBase64 === "string" &&
                place.imageBase64.trim() !== ""
                  ? place.imageBase64.startsWith("data:")
                    ? place.imageBase64
                    : `data:image/png;base64,${place.imageBase64}`
                  : place.imageBase64
              }
              alt={place.name}
              className="place-image"
            />
            <h3 className="place-name">{place.name}</h3>
            <p className="place-description">{place.description}</p>
            <div className="place-actions">
              <button
                onClick={() => handleClickEdit(place)}
                className="edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => handleClickDelete(place)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Place;
