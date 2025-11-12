import "./RegionFilter.css";

const RegionFilter = ({ value, onChange }) => {
  return (
    <div className="filter">
      <select
        className="filter__select"
        aria-label="Filter by region"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled hidden>
          Filter by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default RegionFilter;
