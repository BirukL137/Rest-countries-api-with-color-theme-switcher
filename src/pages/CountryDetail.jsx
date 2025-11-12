import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CountryDetail.css";

const CountryDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await res.json();
        setCountry(data[0]);
        console.log("Data-details", data);
      } catch (err) {
        console.error("Failed to load country:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  if (loading) return <p className="detail__status">Loading country...</p>;
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
    borders,
  } = country;

  const nativeName =
    name.nativeName && Object.values(name.nativeName)[0].common;
  const currencyList =
    currencies &&
    Object.values(currencies)
      .map((c) => c.name)
      .join(", ");
  const languageList = languages && Object.values(languages).join(", ");

  return (
    <section className="detail">
      <button className="detail__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail__content">
        <img
          src={flags.svg}
          alt={flags.alt || `${name.common} flag`}
          className="detail__flag"
        />

        <div className="detail__info">
          <h2 className="detail__title">{name.common}</h2>
          <div className="detail__grid">
            <div>
              <p>
                <strong>Native Name:</strong> {nativeName}
              </p>
              <p>
                <strong>Population:</strong> {population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {region}
              </p>
              <p>
                <strong>Sub Region:</strong> {subregion}
              </p>
              <p>
                <strong>Capital:</strong> {capital?.[0]}
              </p>
            </div>

            <div>
              <p>
                <strong>Top Level Domain:</strong> {tld?.[0]}
              </p>
              <p>
                <strong>Currencies:</strong> {currencyList}
              </p>
              <p>
                <strong>Languages:</strong> {languageList}
              </p>
            </div>
          </div>

          {borders && (
            <div className="detail__borders">
              <strong>Border Countries:</strong>
              <div className="detail__borders-list">
                {borders.map((b) => (
                  <button
                    key={b}
                    onClick={() => navigate(`/country/${b}`)}
                    className="detail__border-btn"
                  >
                    {b}
                  </button>
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
