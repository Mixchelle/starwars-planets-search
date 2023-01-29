import { useState, useEffect } from 'react';

const colunas = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

const INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

function useFilter(dataFetch) {
  const [filteredPlanets, setFilteredPlanets] = useState(dataFetch);
  const [textFilterInput, setTextFilterInput] = useState('');
  const [optionsColumn, setOptionsColumn] = useState(colunas);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [filters, setFilters] = useState(INITIAL_STATE);

  const handleChangeName = ({ target: { value } }) => setTextFilterInput(value);

  const handleChange = ({ target: { value, name } }) => {
    setFilters((oldFilters) => ({ ...oldFilters, [name]: value }));
  };

  useEffect(() => {
    if (textFilterInput === '') {
      setFilteredPlanets(dataFetch);
    } else if (textFilterInput) {
      setFilteredPlanets((data) => data
        .filter(({ name }) => name.toLowerCase()
          .includes(textFilterInput.toLowerCase())));
    } else {
      setFilteredPlanets('');
    }
  }, [dataFetch, textFilterInput]);

  useEffect(() => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      column: optionsColumn[0],
    }));
  }, [optionsColumn]);

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
  const handleCleanAllFilters = () => {
    setAppliedFilters([], setOptionsColumn([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water']));
  };

  return {
    setFilteredPlanets,
    appliedFilters,
    filteredPlanets,
    textFilterInput,
    handleChangeName,
    filters,
    handleChange,
    optionsColumn,
    handleCleanAllFilters,
    handleEraseFilter,
    handleApplyFilters,
  };
}

export default useFilter;
