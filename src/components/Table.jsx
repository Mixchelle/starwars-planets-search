import { useContext } from 'react';
import { context } from '../context/Context';
import Filter from './Filter';
import FilterInputOrder from './FilterInputOrder';
import FilterApplied from './FilterApplied';
import FilterText from './FilterTexr';

export default function Table() {
  const { filteredPlanets } = useContext(context);

  const dataPlanets = filteredPlanets.map((planet) => (
    <tr key={ planet.name }>
      <td data-testid="planet-name">{planet.name}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.population}</td>
      <td>{planet.created}</td>
      <td>{planet.edited}</td>
      <td>{planet.url}</td>
      <td>{planet.films.map((film) => <span key={ film }>{film}</span>)}</td>
    </tr>
  ));
  return (
    <div className="tabela">
      <FilterText />
      <div className="filtros">
        <Filter />
        <FilterInputOrder />
        <FilterApplied />
      </div>
      <table data-testid="table">
        <thead className="headTable">
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
            <th>Films</th>
          </tr>
        </thead>
        <tbody>
          { dataPlanets }
        </tbody>
      </table>
    </div>
  );
}
