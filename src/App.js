import { useState, useEffect } from 'react'
import './App.css';
import Navbar from './Components/Navbar.jsx'

function App() {
  const [ pokemonData, setPokemonData ] = useState([])
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [pokemon, setPokemon ] = useState()
  const [error, setError] = useState(null);
  //const [ pokemonList, setPokemonList ] = useState()
  const pokemonList = []

  async function getData() {
    const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon/`
    ).then(response => response.json());
    getPokemonData(data.results)
  }

  function getPokemonData(results) {
    setPokemonData([]) // delete this
    results.map(async pokemon => {
      const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then(res => res.json())

      setPokemonData(prevPokemon => [...prevPokemon, data])
    }, setIsLoaded(true))
  }

  useEffect(() => {
    getData()
    console.log('is fired once')
  }, [])

  console.log(pokemonData)

  //<img src={item.sprites.other["official-artwork"].front_default} alt="pokemon"/>
  return (
    <div className="App">
      <Navbar />
      { isLoaded ? pokemonData.map(item => (
      <li key={item.id}>
        <img src={item.sprites.front_default} alt="pokemon"/>
        {item.name} 
        {item.types[0].type.name}
      </li>)) 
      : 'Loading...' }
    </div>
  );
}

export default App;
