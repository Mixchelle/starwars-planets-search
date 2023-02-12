import React, { useContext } from 'react';
import { context } from '../context/Context';

export default function FilterText() {
  const {
    textFilterInput,
    handleChangeName,
  } = useContext(context);

  return (
    <section className="filtertext">
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
  );
}
