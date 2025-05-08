import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = ({ setResultData }) => {
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);

    try {
      const filterResponse = await axios.get(
        `${process.env.REACT_APP_REST_API_URL}/place/filter`,
        {
          params: {
            "region-id": selectedRegion,
            "category-id": selectedCategory,
            rating: selectedRating,
          },
        }
      );

      const searchResponse = await axios.get(
        `${process.env.REACT_APP_REST_API_URL}/place/search`,
        {
          params: { "place-name": searchQuery },
        }
      );

      const filterData = filterResponse.data;
      const searchData = searchResponse.data;

      setFilterResults(filterData);
      setSearchResults(searchData);
      if (
        [searchQuery, selectedCategory, selectedRating, selectedRegion].every(
          (state) => state.length === 0
        )
      ) {
        setResultData([]);
      } else if (searchQuery.length === 0) {
        setFinalResults(filterData);
        setResultData(filterData);
      } else {
        const intersection = filterData.filter((place) =>
          searchData.some((s) => s.id === place.id)
        );
        setFinalResults(intersection);
        setResultData(intersection);
      }
      
      setIsSearching(false);
    } catch (error) {
      console.error(error);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_REST_API_URL + "/region/list")
      .then((response) => setRegions(response.data))
      .catch((error) => console.error("Regionlar yüklənmədi:", error));

    axios
      .get(process.env.REACT_APP_REST_API_URL + "/category/list")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Kateqoriyalar yüklənmədi:", error));
  }, []);

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Məkan axtar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="filter-select"
        >
          <option value="">Bütün Regionlar</option>
          {regions.map((region) => (
            <option value={region.id} key={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">Bütün Kateqoriyalar</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="filter-select"
        >
          <option value="">Bütün Reytinqlər</option>
          <option value="0">0 - 1</option>
          <option value="1">1 - 2</option>
          <option value="2">2 - 3</option>
          <option value="3">3 - 4</option>
          <option value="4">4 +</option>
        </select>
        
        <button
          type="submit"
          className={`search-button ${isSearching ? 'searching' : ''}`}
          disabled={isSearching}
        >
          {isSearching ? (
            <span className="search-spinner"></span>
          ) : (
            "Axtar"
          )}
        </button>
      </form>
    </div>
  );
};

export default Search;
