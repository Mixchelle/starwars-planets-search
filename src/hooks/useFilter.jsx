import { useState, useContext } from 'react';
import { context } from '../context/Context';

const colunas = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

const INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
  order: { column: 'population', sort: 'ASC' },
};

export default function useFilter() {
  const { filteredPlanets, setFilteredPlanets } = useContext(context);
  const [textFilterInput, setTextFilterInput] = useState('');
  const [optionsColumn, setOptionsColumn] = useState(colunas);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [filters, setFilters] = useState(INITIAL_STATE);

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

  const handleClickSort = () => {
    const { order: { column, sort } } = filters;
    const known = filteredPlanets.filter((planet) => planet[column] !== 'unknown');
    const unknown = filteredPlanets.filter((planet) => planet[column] === 'unknown');
    const sortedArr = known.sort((a, b) => ((sort === 'ASC')
      ? Number(a[column]) - Number(b[column])
      : Number(b[column]) - Number(a[column])));
    const sortedPlanets = [...sortedArr, ...unknown];
    setFilteredPlanets(sortedPlanets);
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
    textFilterInput,
    optionsColumn,
    appliedFilters,
    handleChangeName,
    handleChange,
    handleApplyFilters,
    handleEraseFilter,
    handleCleanAllFilters,
    filters,
    setOptionsColumn,
    setFilters,
    handleSort,
    handleClickSort,
  };
}
