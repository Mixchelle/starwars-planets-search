import { useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import useFetch from '../hooks/useFetch';
import useFilter from '../hooks/useFilter';

export default function ProviderContext({ children }) {
  const { planetsData } = useFetch();
  const {
    filteredPlanets,
    textFilterInput,
    handleChangeName,
    filters,
    handleChange,
    optionsColumn,
    handleApplyFilters,
    handleCleanAllFilters,
    setFilteredPlanets,
    filterByNumerics,
  } = useFilter({ planetsData });

  console.log(textFilterInput);

  const valores = useMemo(
    () => ({
      filters,
      handleChange,
      textFilterInput,
      handleChangeName,
      planetsData,
      filteredPlanets,
      optionsColumn,
      handleApplyFilters,
      handleCleanAllFilters,
      setFilteredPlanets,
      filterByNumerics,
    }),
    [
      filters,
      handleChange,
      textFilterInput,
      handleChangeName,
      planetsData,
      filteredPlanets,
      optionsColumn,
      handleApplyFilters,
      handleCleanAllFilters,
      setFilteredPlanets,
      filterByNumerics,
    ],
  );

  return (
    <Context.Provider
      value={ valores }
    >
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
