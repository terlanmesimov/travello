const SearchSection = () => {
  return (
    <>
      <section className="search-section">
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
        </div>
      </section>
    </>
  );
};

export default SearchSection;
