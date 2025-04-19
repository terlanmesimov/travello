import axios from "axios";
import { useEffect, useState } from "react";

const Search = () => {
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefult();
    
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_REST_API_URL + "/region/list")
      .then((response) => setRegions(response.data))
      .catch((error) => console.error("Data fetch error: " + error));
    axios
      .get(process.env.REACT_APP_REST_API_URL + "/category/list")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Data fetch error: " + error));
  }, []);

  return (
    <>
      <section className="search-section">
        <div className="container">
          <form>
            <input
              className="search-input"
              type="text"
              placeholder="Məkan axtar..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="filters">
              <select
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="filter-regions"
              >
                <option>Bütün Regionlar</option>
                {regions.map((region) => {
                  return <option key={region.id}>{region.name}</option>;
                })}
              </select>
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-categories"
              >
                <option>Bütün Kateqoriyalar</option>
                {categories.map((category) => {
                  return <option key={category.id}>{category.name}</option>;
                })}
              </select>
              <select
                onChange={(e) => setSelectedRating(e.target.value)}
                className="filter-ratings"
              >
                <option>Bütün Reytinqlər</option>
                <option>0 - 1</option>
                <option>1 - 2</option>
                <option>2 - 3</option>
                <option>3 - 4</option>
                <option>4 +</option>
              </select>
              <button type="submit" onSubmit={handleSubmit}>
                Axtar
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Search;
