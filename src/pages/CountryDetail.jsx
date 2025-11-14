import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/CountryDetail.css";

const CountryDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await res.json();
        setCountry(data[0]);
      } catch (err) {
        console.error("Failed to load country details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  // Fetch border country names once the main country is loaded
  useEffect(() => {
    if (!country || !country.borders) return;

    const fetchBorders = async () => {
      try {
        const borderQuery = country.borders.join(",");
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${borderQuery}`
        );
        const data = await res.json();
        setBorderCountries(data);
      } catch (err) {
        console.error("Failed to load borders", err);
      }
    };

    fetchBorders();
  }, [country]);

  if (loading) return <p className="detail__status">Loading country...</p>;
  // if (error) return <p className="detail__status">{error}</p>;
  if (!country) return <p className="detail__status">Country not found.</p>;

  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
  } = country;

  const nativeName =
    name.nativeName && Object.values(name.nativeName)?.[0]?.common;
  const currencyList = currencies
    ? Object.values(currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";
  const languageList = languages ? Object.values(languages).join(", ") : "N/A";

  return (
    <section className="country-detail">
      <button className="country-detail__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="country-detail__content">
        {/* Flag */}
        <img
          src={flags.svg}
          alt={flags.alt || `${name.common} flag`}
          className="country-detail__flag"
        />

        {/* Main Info */}
        <div className="country-detail__info">
          <h2 className="country-detail__title">{name.common}</h2>

          <div className="country-detail__lists">
            {/* LEFT LIST */}
            <ul className="country-detail__list">
              <li className="country-detail__list-item">
                <strong>Native Name: </strong>
                {nativeName}
              </li>
              <li className="country-detail__list-item">
                <strong>Population: </strong>
                {population.toLocaleString()}
              </li>
              <li className="country-detail__list-item">
                <strong>Region: </strong>
                {region}
              </li>
              <li className="country-detail__list-item">
                <strong>Sub Region: </strong>
                {subregion}
              </li>
              <li className="country-detail__list-item">
                <strong>Capital: </strong>
                {capital?.join(", ")}
              </li>
            </ul>

            {/* RIGHT LIST */}
            <ul className="country-detail__list">
              <li className="country-detail__list-item">
                <strong>Top Level Domain: </strong>
                {tld?.join(", ")}
              </li>
              <li className="country-detail__list-item">
                <strong>Currencies: </strong>
                {currencyList}
              </li>
              <li className="country-detail__list-item">
                <strong>Languages: </strong>
                {languageList}
              </li>
            </ul>
          </div>

          {/* Border countries */}
          {borderCountries.length > 0 && (
            <div className="country-detail__borders">
              <div className="country-detail__borders-label">
                Border Countries:
              </div>

              <div className="country-detail__borders-list">
                {borderCountries.map((b) => (
                  <Link
                    to={`/country/${b.cca3}`}
                    key={b.cca3}
                    className="country-detail__border-btn"
                  >
                    {b.name.common}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CountryDetail;
