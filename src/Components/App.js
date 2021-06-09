import React, {useState} from 'react'
import BeerList from './BeerList';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Punk Beers</h1>

        <BeerList />
      </header>
    </div>
  );
}

export default App;
