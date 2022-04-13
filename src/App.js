import { useState, useEffect } from 'react'
import './App.css';
import Navbar from './Components/Navbar.jsx'

function App() {
  const [ pokemonData, setPokemonData ] = useState()

  async function getData() {
    const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon/`
    ).then(response => response.json());
    setPokemonData(data.results)
    console.log(pokemonData)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <Navbar />
      { pokemonData && pokemonData.map(pokemon => <li>{pokemon.name}</li>) }
    </div>
  );
}

export default App;
