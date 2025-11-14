import { Link } from "react-router-dom";
import "../styles/CountryCard.css";

const CountryCard = ({ country }) => {
  const { name, flags, population, region, capital, cca3 } = country;

  return (
    <Link
      to={`/country/${cca3}`}
      className="card"
      aria-label={`View ${name.common}`}
    >
      <img
        src={flags.png}
        alt={flags.alt || `${name.common} flag`}
        className="card__flag"
        // loading="lazy"
      />

      <div className="card__body">
        <h2 className="card__title">{name.common}</h2>
        <div className="card__list">
          <p>
            <span>Population:</span> {population.toLocaleString("en-US")}
          </p>
          <p>
            <span>Region:</span> {region}
          </p>
          <p>
            <span>Capital:</span> {capital?.[0] || "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
