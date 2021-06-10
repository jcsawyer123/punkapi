import React, {useState} from 'react'
import BeerInfo from './BeerInfo';
import BeerList from './BeerList';

function App() {

  return (

    <div id='AppID' className="App">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

   
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 mb-12">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Punk API</span>{' '}
              <span className="block text-indigo-600 xl:inline">React Demo</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Look through the details of all of your favourite beers, courtesty of <a href="https://punkapi.com/">www.punkapi.com</a>
            </p>
          </div>
        </main>
        
        <BeerList /> 
        </div>
    </div>
  );
}

export default App;
