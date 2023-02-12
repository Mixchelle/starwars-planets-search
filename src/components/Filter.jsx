import React, { useContext } from 'react';
import { context } from '../context/Context';

export default function Filter() {
  const {
    handleCleanAllFilters,
    handleChange,
    filters,
    optionsColumn,
    handleApplyFilters,
  } = useContext(context);

  return (
    <div>
      <form>
        <p className="coluna">Coluna:</p>
        <select
          data-testid="column-filter"
          className="filter__numeric"
          value={ filters.column }
          name="column"
          onChange={ handleChange }
        >
          {optionsColumn
            .map((column) => (<option value={ column } key={ column }>{column}</option>))}
        </select>
        <p className="compare">comparação:</p>
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
        <button
          className="btnFilter"
          data-testid="button-filter"
          type="button"
          onClick={ handleApplyFilters }
        >
          Filtrar
        </button>
        <button
          className="btnFilter"
          data-testid="button-remove-filters"
          onClick={ handleCleanAllFilters }
        >
          Excluir filtros
        </button>
      </form>
    </div>
  );
}
