import { useState } from "react";
import "../styles/SearchBar.css";
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <form
      className={`search ${focused ? "search--focused" : ""}`}
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="countrySearch" className="sr-only">
        Search for a country
      </label>

      <Search className="search__icon" aria-hidden="true" />

      <input
        type="text"
        id="countrySearch"
        className="search__input"
        placeholder="Search for a country..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </form>
  );
};

export default SearchBar;
