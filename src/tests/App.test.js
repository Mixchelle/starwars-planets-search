import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';
import Data from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
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
  test('a tabela é renderizada na tela', async () => {
    const table = screen.findByRole('table');
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

});
