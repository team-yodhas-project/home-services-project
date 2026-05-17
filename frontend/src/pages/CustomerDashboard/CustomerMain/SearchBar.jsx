import { useEffect } from "react";

const SearchBar = ({
  keyword,
  setKeyword,
  location,
  setLocation,
  onSearch,
}) => {
  // Debounced live search
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch();
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword, location]);

  return (
    <div className="search-bar-card">
      <input
        type="text"
        placeholder="Search services or category"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;

