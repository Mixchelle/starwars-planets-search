import React, { useContext } from 'react';
import { context } from '../context/Context';

export default function FilterInputOrder() {
  const {
    filters,
    handleSort,
    handleClickSort,
  } = useContext(context);

  return (
    <div className="sort">
      <select
        className="select_sort"
        name="column"
        value={ filters.order.column }
        data-testid="column-sort"
        onChange={ handleSort }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <p>Ordem:</p>
      <div className="form-check">
        <label className="form-check-label" htmlFor="ASC">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="ASC"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ handleSort }
          />
          Ascendente
        </label>
        <br />
        <label className="form-check-label" htmlFor="DESC">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            value="DESC"
            id="DESC"
            data-testid="column-sort-input-desc"
            onChange={ handleSort }
          />
          Decrescente
        </label>
      </div>
      <button
        className="btnFilter"
        type="button"
        data-testid="column-sort-button"
        onClick={ handleClickSort }
      >
        Ordenar
      </button>
    </div>
  );
}
