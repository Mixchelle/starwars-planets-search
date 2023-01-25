function useFilter() {
  const filterByName = (array, search) => array.filter(({ name }) => name.toUpperCase()
    .includes(search.toUpperCase()));

  const filterByNumbers = (
    { columnForFilter, comparison, value },
    array,
  ) => array.filter((planet) => ({
    iguala: Number(value) === Number(planet[columnForFilter]),
    maiorque: Number(value) < Number(planet[columnForFilter]),
    menorque: Number(value) > Number(planet[columnForFilter]),
  })[comparison.replace(' ', '')]);

  return {
    filterByName,
    filterByNumbers,
  };
}

export default useFilter;
