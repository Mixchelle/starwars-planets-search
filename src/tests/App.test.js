import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Data from './Data';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import ContextProvider from '../context/Provider';

describe('Testa se ', () => {
  beforeEach(() => {
    render(<App />)
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(Data)
    })
  });
  test('a tabela é renderizada na tela', async () => {
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
  test ('a os dados da Api são renderizados na tela',async () => { 
    const tatooine = await screen.findByRole('cell', {
      name: /tatooine/i
    });
    expect(tatooine).toBeInTheDocument();
  });
});
