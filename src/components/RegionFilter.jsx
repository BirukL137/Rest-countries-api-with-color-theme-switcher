import { useState, useRef, useEffect } from "react";
import "../styles/RegionFilter.css";

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const RegionFilter = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Toggle dropdown open/close
  const toggle = () => setOpen((prev) => !prev);

  // Select a region
  const handleSelect = (region) => {
    onChange(region);
    setOpen(false);
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onChange("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="filter" ref={ref}>
      {/* --- Control (custom select) --- */}
      <button
        className="filter__control"
        onClick={toggle}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="filter__value">{value || "Filter by Region"}</span>

        {value && (
          <>
            <span
              className="filter__clear"
              role="button"
              aria-label="Clear region filter"
              onClick={clearSelection}
            >
              ×
            </span>
            <span className="filter__divider"></span>
          </>
        )}

        <span
          className={`filter__arrow ${open ? "filter__arrow--open" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* --- Dropdown options --- */}
      {open && (
        <div className="filter__options" role="listbox">
          {REGIONS.map((region) => (
            <div
              key={region}
              role="option"
              tabIndex={0}
              className={`filter__option ${
                region === value ? "filter__option--active" : ""
              }`}
              onClick={() => handleSelect(region)}
              onKeyDown={(e) => e.key === "Enter" && handleSelect(region)}
            >
              {region}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegionFilter;
