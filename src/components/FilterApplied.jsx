import React, { useContext } from 'react';
import { context } from '../context/Context';

export default function FilterApplied() {
  const { appliedFilters, handleEraseFilter } = useContext(context);
  console.log(appliedFilters);
  return (
    <form>
      {appliedFilters?.map((filter) => (
        <div data-testid="filter" key={ filter.column }>
          <span data-testid="column">{filter.column}</span>
          <span data-testid="comparison">{filter.comparison}</span>
          <span data-testid="value">{filter.value}</span>
          <button
            onClick={ () => handleEraseFilter(filter) }
            data-testid="button"
          >
            clear
          </button>
        </div>))}
    </form>
  );
}
