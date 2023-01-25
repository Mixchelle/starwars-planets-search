import React from 'react';
import './App.css';
import Header from './components/Header';
import Filter from './components/Filter';
import Table from './components/Table';
import ContextProvider from './context/Provider';

function App() {
  return (
    <ContextProvider>
      <Header />
      <Filter />
      <Table />
    </ContextProvider>
  );
}

export default App;
