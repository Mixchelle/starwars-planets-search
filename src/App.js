import React from 'react';
import './App.css';
import Table from './components/Table';
import ContextProvider from './context/Provider';

function App() {
  return (
    <ContextProvider>
      <Table />
    </ContextProvider>
  );
}

export default App;
