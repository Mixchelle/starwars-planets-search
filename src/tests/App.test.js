import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { act } from 'react-dom/test-utils';
import Data from '../../cypress/mocks/testData';
import ContextProvider from '../context/Provider';


describe('Testa se ', () => {
  beforeEach(async () => {
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(Data)
    })

     await act(async () => {
      render(
        <ContextProvider>
          <App />
        </ContextProvider>      
    )});
  });
  test('a tabela é renderizada na tela',  () => {
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  test('os filtros são renderizados', async () => {
    const filterInput = screen.getByTestId("name-filter");
    const filterColumn = screen.getByTestId("column-filter");
    const filterComparison = screen.getByTestId("comparison-filter");
    const filterValue = screen.getByTestId("value-filter");
    const filterBtn = screen.getByTestId("button-filter");
    const sortColumnAsc = screen.getByTestId("column-sort-input-asc");
    const sortColumnDesc = screen.getByTestId("column-sort-input-desc");
    const sortColumn = screen.getByTestId("column-sort");
    const sortColumnBtn = screen.getByTestId("column-sort");

    expect(filterInput).toBeInTheDocument();
    expect(filterColumn).toBeInTheDocument();
    expect(filterComparison).toBeInTheDocument();
    expect(filterValue).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();
    expect(sortColumnAsc).toBeInTheDocument();
    expect(sortColumnDesc).toBeInTheDocument();
    expect(sortColumn).toBeInTheDocument();
    expect(sortColumnBtn).toBeInTheDocument();
  });
  test('Testa se tem campo search e se ele funciona', () => {
    const inputSearch = screen.getByTestId('name-filter');

    userEvent.type(inputSearch, 'tatoo')

    waitFor(() => {
      const planet = screen.getByText('Tatooine')
      expect(planet).toBeInTheDocument()
    })
  });

  test('Verifica se filtro de texto funciona junto do filtro de numerico', () => {
    const inputFilter = screen.getByRole('textbox');
    const selectColumn = screen.getByTestId("column-filter");
    const selectComparison = screen.getByTestId("comparison-filter");
    const inputNumber = screen.getByTestId("value-filter");
    const filterButton = screen.getByRole('button', {
      name: /filtrar/i
    });
  
    userEvent.type(inputFilter, 't');
    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'menor que')
    inputNumber.value = '';
    userEvent.type(inputNumber, '24');
    userEvent.click(filterButton);
  
    expect(screen.getByText(/tatooine/i)).toBeInTheDocument();
    expect(screen.getByText(/hoth/i)).toBeInTheDocument();
    expect(screen.queryByText(/alderaan/i)).not.toBeInTheDocument();
  });
  

  test("a tabela é ordenada corretamente", () => {
    const sortColumn = screen.getByTestId('column-sort');
    const sortAsc = screen.getByTestId('column-sort-input-asc');
    const sortDesc = screen.getByTestId('column-sort-input-desc');
    const sortBtn = screen.getByTestId('column-sort-button');

    act(() => {
      userEvent.selectOptions(sortColumn, 'population');
      userEvent.click(sortAsc);
      userEvent.click(sortBtn);
    });

    const planets = screen.getAllByTestId('planet-name');
    expect(planets[0]).toHaveTextContent('Yavin IV');

    act(() => {
      userEvent.selectOptions(sortColumn, 'orbital_period');
      userEvent.click(sortDesc);
      userEvent.click(sortBtn);
    });
    const planetsTwo = screen.getAllByTestId('planet-name');
    expect(planetsTwo[0]).toHaveTextContent('Bespin');
  });

  test.only("remove filtro", () => {
    const filterColumn = screen.getByTestId("column-filter");
    const filterComparison = screen.getByTestId("comparison-filter");
    const filterValue = screen.getByTestId("value-filter");
    const filterBtn = screen.getByTestId("button-filter");
    const planets = screen.getAllByTestId('planet-name');
    const removeFilter = screen.getByTestId('button-remove-filters');

    act(() => {
      userEvent.selectOptions(filterColumn, "diameter");
      userEvent.selectOptions(filterComparison, 'maior que');
      userEvent.type(filterValue, '8900');
      userEvent.click(filterBtn);
    });

    expect(planets).toHaveLength(10);
    act(() => {
      userEvent.click(removeFilter);
     });

 
    expect(planets).toHaveLength(10);
  });


  test("multiplos filtros", () => {
    const filterColumn = screen.getByTestId("column-filter");
    const filterComparison = screen.getByTestId("comparison-filter");
    const filterValue = screen.getByTestId("value-filter");
    const filterBtn = screen.getByTestId("button-filter");

    act(() => {
      userEvent.selectOptions(filterColumn, "diameter");
      userEvent.selectOptions(filterComparison, 'maior que');
      userEvent.type(filterValue, '8900');
      userEvent.click(filterBtn);

      userEvent.clear(filterValue);

      userEvent.selectOptions(filterColumn, "population");
      userEvent.selectOptions(filterComparison, 'menor que');
      userEvent.type(filterValue, '10000000');
      userEvent.click(filterBtn);
    });

    const filterApplied = screen.getAllByTestId("filter");
    expect(filterApplied).toHaveLength(2);

    const removeFilterBtn = screen.getAllByRole('button', {name: 'X'});
    userEvent.click(removeFilterBtn[1]);
    const filterAppliedTwo = screen.getAllByTestId("filter");
    expect(filterAppliedTwo).toHaveLength(1);
  });
});

