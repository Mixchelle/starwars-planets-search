import { useContext } from 'react';
import Context from '../context/Context';

export default function TableRow() {
  const {
    filteredPlanets,
    filters,
    textFilterInput,
  } = useContext(Context);

  const filtredPlanetsNyName = filteredPlanets.planetData
    .filter((planet) => planet.name.includes(textFilterInput));

  const filterIteration = (array, coluna, comparador, valor) => {
    switch (comparador) {
    case 'maior que':
      return array.filter((planet) => planet[coluna] * 1 > valor);
    case 'menor que':
      return array.filter((planet) => planet[coluna] * 1 < valor);
    case 'igual a':
      return array.filter((planet) => planet[coluna] === valor);
    default:
      return array;
    }
  };

  const teste2 = (array, arrayFilter) => {
    if (arrayFilter !== undefined && arrayFilter.length > 0) {
      let currentArray = array;
      let newArray = [];
      arrayFilter.forEach((filter) => {
        const coluna = filter.column;
        const comparador = filter.comparison;
        const valor = filter.value;
        newArray = filterIteration(currentArray, coluna, comparador, valor);
        currentArray = newArray;
      });
      return newArray;
    } return array;
  };

  const filtredPlanets = teste2(filtredPlanetsNyName, filters);

  const tableRows = () => filtredPlanets
    .map((planet, index) => (
      <tr key={ index }>
        <td>{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
        <td>{planet.residents}</td>
        <td>{planet.films}</td>
        <td>{planet.created}</td>
        {/* <td>{planet.edited}</td> */}
        <td>{planet.url}</td>
      </tr>
    ));

  return (
    <tbody>
      {tableRows()}
    </tbody>
  );
}
