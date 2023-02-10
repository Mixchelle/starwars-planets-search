import React, { useContext } from 'react';
import { context } from '../context/Context';

export default function FilterApplied() {
  const { appliedFilters, handleEraseFilter } = useContext(context);
  return (
    <div>
      {appliedFilters?.map((filter, i) => (
        <section data-testid="filter" key={ i }>
          <span data-testid="column">{filter.column}</span>
          <span data-testid="comparison">{filter.comparison}</span>
          <span data-testid="value">{filter.value}</span>
          <button
            onClick={ () => handleEraseFilter(filter) }
          >
            X
          </button>
        </section>))}
    </div>
  );
}
