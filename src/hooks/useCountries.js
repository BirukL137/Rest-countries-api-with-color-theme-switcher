import { useEffect, useMemo, useState } from "react";

const API_URL =
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3";

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        setCountries(data);
        console.log("data: ", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Memoized sort to keep UI consistent and performant
  const sorted = useMemo(() => {
    return [...countries].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
  }, [countries]);

  return { countries: sorted, loading, error };
};
