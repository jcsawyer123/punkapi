import logo from './Assets/logo.svg';
import BeerList from './BeerList';
import '../Assets/logo.svg';

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
