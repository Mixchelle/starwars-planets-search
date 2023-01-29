import { useState, useEffect } from 'react';

export default function useFetch() {
  const [planetsData, setPlanetsData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      data.results.forEach((planet) => {
        delete planet.residents;
      });
      setPlanetsData(data.results);
    };
    fetchApi();
  }, []);
  return { planetsData };
}
