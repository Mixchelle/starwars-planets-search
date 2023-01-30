import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { context } from './Context';
import useFetch from '../hooks/useFetch';

const colunas = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
  order: { column: 'population', sort: 'ASC' },
};

export default function ProviderContext({ children }) {
  const { planetsData } = useFetch();
  const [filteredPlanets, setFilteredPlanets] = useState(planetsData);
  const [textFilterInput, setTextFilterInput] = useState('');
  const [optionsColumn, setOptionsColumn] = useState(colunas);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [filters, setFilters] = useState(INITIAL_STATE);

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

  const handleChangeName = ({ target: { value } }) => setTextFilterInput(value);

  const handleChange = ({ target: { value, name } }) => {
    setFilters((oldFilters) => ({ ...oldFilters, [name]: value }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters((oldFilters) => [...oldFilters, filters]);
  };

  const handleEraseFilter = (filter) => {
    setAppliedFilters(
      (oldFilters) => oldFilters
        .filter((oldFilter) => oldFilter !== filter),
      setOptionsColumn((columns) => [...columns, filter.column]),
    );
  };

  const handleSort = ({ target: { value, name } }) => {
    setFilters({
      ...filters,
      order: {
        ...filters.order,
        [name]: value,
      },
    });
  };

  const handleCleanAllFilters = () => {
    setAppliedFilters([], setOptionsColumn(colunas));
  };

  const handleClickSort = () => {
    const { order: { column, sort } } = filters;
    const unknown = filteredPlanets.filter((planet) => planet[column] === 'unknown');
    const planets = filteredPlanets.filter((planet) => planet[column] !== 'unknown');
    const ArraySort = planets.sort((a, b) => ((sort === 'ASC')
      ? Number(a[column]) - Number(b[column])
      : Number(b[column]) - Number(a[column])));
    const sortedPlanets = [...ArraySort, ...unknown];
    setFilteredPlanets(sortedPlanets);
  };

  const value = {
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
  };

  return (
    <context.Provider
      value={ value }
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
