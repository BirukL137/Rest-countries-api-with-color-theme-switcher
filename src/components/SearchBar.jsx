import "./SearchBar.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search">
      <input
        className="search__input"
        type="search"
        placeholder="Search for a country..."
        aria-label="Search countries"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
