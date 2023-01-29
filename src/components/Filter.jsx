import React, { useContext } from 'react';
import { context } from '../context/Context';
import FilterApplie from './FilterApplied';

export default function Filter() {
  const {
    handleCleanAllFilters,
    textFilterInput,
    handleChange,
    handleChangeName,
    filters,
    handleApplyFilters,
  } = useContext(context);

  console.log(filters);

  return (
    <div>
      <form>
        <p>Coluna:</p>
        <select
          data-testid="column-filter"
          className="filter__numeric"
          value={ filters.column }
          name="column"
          onChange={ handleChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <p>comparação:</p>
        <select
          data-testid="comparison-filter"
          className="filter__comparison"
          value={ filters.comparison }
          name="comparison"
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a<">igual a</option>
        </select>

        <p>Valor:</p>
        <input
          data-testid="value-filter"
          type="number"
          className="filter__number"
          value={ filters.value }
          name="value"
          onChange={ handleChange }
        />
        <button data-testid="button-filter" type="button" onClick={ handleApplyFilters }>
          Filtrar
        </button>
        <FilterApplie />
        <button
          data-testid="button-remove-filters"
          onClick={ handleCleanAllFilters }
        >
          Excluir filtros
        </button>
      </form>
      <form>
        <section>
          <label htmlFor="name-filter">
            Filtro
            <input
              type="text"
              id="name-filter"
              className="filter__name"
              data-testid="name-filter"
              value={ textFilterInput }
              onChange={ handleChangeName }
            />
          </label>
        </section>
      </form>
    </div>
  );
}
