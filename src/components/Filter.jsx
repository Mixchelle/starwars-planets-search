export default function Filter() {
  return (
    <form>
      <select data-testid="column-filter" className="filter__numeric">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select data-testid="comparison-filter" className="filter__comparison">
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a<">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        className="filter__number"
      />
      <button
        data-testid="button-filter"
        className="filter__remove"
      >
        Filtrar
      </button>
    </form>
  );
}
