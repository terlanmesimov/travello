const Search = () => {
  return (
    <>
      <section className="search-section">
        <div className="container">
          <input
            className="search-input"
            type="text"
            placeholder="Məkan axtar..."
          />
          <div className="filters">
            <select className="filter-regions">
              <option>Bütün Regionlar</option>
              <option>Bakı</option>
              <option>Şəki</option>
            </select>
            <select className="filter-categories">
              <option>Bütün Kateqoriyalar</option>
              <option>Tarixi</option>
              <option>Təbiət</option>
            </select>
            <select className="filter-ratings">
              <option>Bütün Reytinqlər</option>
              <option>0.5+</option>
              <option>1.0+</option>
              <option>1.5+</option>
              <option>2.0+</option>
              <option>2.5+</option>
              <option>3.0+</option>
              <option>3.5+</option>
              <option>4.0+</option>
              <option>4.5+</option>
            </select>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
