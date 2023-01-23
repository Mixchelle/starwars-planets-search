import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function ProviderContext({ children }) {
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
  return (
    <Context.Provider value={ { planetsData } }>
      { children }
    </Context.Provider>
  );
}

ProviderContext.propTypes = {
  children: PropTypes.element,
};

ProviderContext.defaultProps = {
  children: <>default</>,
};
