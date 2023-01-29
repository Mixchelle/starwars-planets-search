import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { context } from './Context';
import useFetch from '../hooks/useFetch';
import useFilter from '../hooks/useFilter';

export default function ProviderContext({ children }) {
  const { planetsData } = useFetch();
  const [filteredPlanets, setFilteredPlanets] = useState(planetsData);

  const {
    textFilterInput,
    optionsColumn,
    appliedFilters,
    handleChangeName,
    handleChange,
    handleEraseFilter,
    handleCleanAllFilters,
    setFilters,
    filters,
    handleApplyFilters,
    setOptionsColumn,
    handleSort,
    handleClickSort,
  } = useFilter(planetsData);

  useEffect(() => {
    if (textFilterInput) {
      setFilteredPlanets(
        planetsData.filter(({ name }) => name.toLowerCase()
          .includes(textFilterInput.toLowerCase())),
      );
    } else if (appliedFilters.length) {
      let planets = [...planetsData];
      appliedFilters.forEach((filter) => {
        planets = planets.filter((planet) => {
          if (planet[filter.column] === 'unknown') return false;
          if (filter.comparison === 'maior que') {
            return (
              Number(planet[filter.column]) > Number(filter.value)
            );
          }
          if (filter.comparison === 'menor que') {
            return (
              Number(planet[filter.column]) < Number(filter.value)
            );
          }
          return (
            Number(planet[filter.column]) === Number(filter.value)
          );
        });
      });
      setOptionsColumn((columns) => columns
        .filter((column) => !appliedFilters.some((filter) => filter.column === column)));
      setFilteredPlanets(planets);
    } else {
      setFilteredPlanets(planetsData);
    }
  }, [planetsData, textFilterInput, appliedFilters, filters, setOptionsColumn]);

  useEffect(() => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      column: optionsColumn[0],
    }));
  }, [optionsColumn, setFilters]);

  const valores = useMemo(
    () => ({
      textFilterInput,
      optionsColumn,
      appliedFilters,
      handleChangeName,
      handleChange,
      handleApplyFilters,
      handleEraseFilter,
      handleCleanAllFilters,
      filteredPlanets,
      planetsData,
      filters,
      handleSort,
      handleClickSort,
    }),
    [
      textFilterInput,
      optionsColumn,
      appliedFilters,
      handleChangeName,
      handleChange,
      handleApplyFilters,
      handleEraseFilter,
      handleCleanAllFilters,
      filteredPlanets,
      planetsData,
      filters,
      handleSort,
      handleClickSort,
    ],
  );

  return (
    <context.Provider
      value={ valores }
    >
      { children }
    </context.Provider>
  );
}

ProviderContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
