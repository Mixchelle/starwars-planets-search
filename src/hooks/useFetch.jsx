import { useState, useEffect } from 'react';

export default function useFetch() {
  const [planetsData, setplanetsData] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      data.results.forEach((planet) => {
        delete planet.residents;
      });
      setplanetsData(data.results);
    };
    getApi();
  }, []);
  return { planetsData };
}
