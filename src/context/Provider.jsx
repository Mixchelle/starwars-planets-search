import PropTypes from 'prop-types';
import Context from './Context';
import useFetch from '../hooks/useFetch';

export default function ProviderContext({ children }) {
  const { planetsData } = useFetch();
  return (
    <Context.Provider value={ { planetsData } }>
      { children }
    </Context.Provider>
  );
}

ProviderContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
