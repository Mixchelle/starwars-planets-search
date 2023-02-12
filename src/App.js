import React from 'react';
import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import ContextProvider from './context/Provider';
import Intro from './components/Intro';

function App() {
  return (
    <ContextProvider>
      <Intro />
      <Header />
      <Table />
    </ContextProvider>
  );
}

export default App;
