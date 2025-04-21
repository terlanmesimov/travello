import axios from "axios";
import { useEffect, useState } from "react";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (error) {
      console.error(error);
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
    <section className="search-section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Məkan axtar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="filters">
            <select
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="filter-regions"
            >
              <option value="">Bütün Regionlar</option>
              {regions.map((region) => (
                <option value={region.id} key={region.id}>
                  {region.name}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-categories"
            >
              <option value="">Bütün Kateqoriyalar</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setSelectedRating(e.target.value)}
              className="filter-ratings"
            >
              <option value="">Bütün Reytinqlər</option>
              <option value="0">0 - 1</option>
              <option value="1">1 - 2</option>
              <option value="2">2 - 3</option>
              <option value="3">3 - 4</option>
              <option value="4">4 +</option>
            </select>
            <button type="submit">Axtar</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Search;
