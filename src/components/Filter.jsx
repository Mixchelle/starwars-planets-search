import { useContext } from 'react';
import Context from '../context/Context';

export default function Filter() {
  const {
    textFilterInput,
    handleChangeName,
    filters,
    handleChange,
    optionsColumn,
    handleApplyFilters,
    handleCleanAllFilters,
  } = useContext(Context);

  return (
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
      <select
        data-testid="column-filter"
        className="filter__numeric"
        value={ filters.column }
        onChange={ handleChange }
      >
        {optionsColumn
          .map((column) => (<option value={ column } key={ column }>{column}</option>))}
      </select>
      <select
        data-testid="comparison-filter"
        className="filter__comparison"
        value={ filters.comparison }
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a<">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        className="filter__number"
        value={ filters.value }
        onChange={ handleChange }
      />
      <button
        data-testid="button-filter"
        className="filter__remove"
        onClick={ handleApplyFilters }
      >
        Filtrar
      </button>
      <button
        data-testid="button-remove-filters"
        onClick={ handleCleanAllFilters }
      >
        Excluir filtros
      </button>
    </form>
  );
}
