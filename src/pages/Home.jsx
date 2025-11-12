import { useMemo, useState } from "react";
import CountryCard from "../components/CountryCard";
import RegionFilter from "../components/RegionFilter";
import SearchBar from "../components/SearchBar";
import { useCountries } from "../hooks/useCountries";
import { useDebounce } from "../hooks/useDebounce";
import "./Home.css";

const Home = () => {
  const { countries, loading, error } = useCountries();
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Combine filters using useMemo (for performance)
  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const matchesRegion = region ? c.region === region : true;
      const matchesName = c.name.common
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      return matchesRegion && matchesName;
    });
  }, [countries, debouncedSearch, region]);

  if (loading) return <p className="home__status">Loading countries...</p>;
  if (error) return <p className="home__status">Error: {error}</p>;

  return (
    <section className="home">
      <div className="home__controls">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <RegionFilter value={region} onChange={setRegion} />
      </div>

      {filtered.length === 0 ? (
        <p className="home__status">No countries found.</p>
      ) : (
        <div className="home__grid">
          {filtered.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
