import { Link } from "react-router-dom";
import "./CountryCard.css";

const CountryCard = ({ country }) => {
  const { name, flags, population, region, capital, cca3 } = country;

  return (
    <Link
      to={`/country/${cca3}`}
      className="card"
      aria-label={`View ${name.common}`}
    >
      <img
        src={flags.svg}
        alt={flags.alt || `${name.common} flag`}
        className="card__flag"
        loading="lazy"
      />
      <div className="card__body">
        <h2 className="card__title">{name.common}</h2>
        <ul className="card__details">
          <li>
            <strong>Population:</strong> {population.toLocaleString("en-US")}
          </li>
          <li>
            <strong>Region:</strong> {region}
          </li>
          <li>
            <strong>Capital:</strong> {capital?.[0] || "N/A"}
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default CountryCard;
