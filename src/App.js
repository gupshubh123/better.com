import React, { useState, useRef } from 'react';
import PokemonSearch from './components/pokemonSearchPage';
import AppHeader from './components/header'
    
  function App() {
    
    return (
      <>
        <AppHeader />
        <PokemonSearch />
      </>
      
    )
  }
export default App;
