import { useState, useEffect } from 'react'
import './App.css';
import Navbar from './Components/Navbar.jsx'
import Pokemon from './Components/Pokemon.jsx'

function App() {
  const [ pokemonData, setPokemonData ] = useState()
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/`)
  const [ nextUrl, setNextUrl ] = useState()
  const [pokemon, setPokemon ] = useState()
  const [error, setError] = useState(null);
  const [ list, setList ] = useState([])
  //const [ pokemonList, setPokemonList ] = useState()
  const pokemonList = []

  async function getData() {
    const data = await fetch(url)
    .then(response => response.json());
    setPokemonData(data.results) 
    //getPokemonData(data.results)
    setNextUrl(data.next)
  }

  function getPokemonData(results) {
    //setPokemonData([]) // delete this
    const pokemons = []
    results.map(async pokemon => {
      const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then(res => res.json())

      }, setIsLoaded(true))
    setList(pokemons)
  }

  function loadMore() {
    setUrl( nextUrl )
    //console.log(click)
    console.log(nextUrl)
  }

  useEffect(() => {
    getData()
  }, [url])

  /*useEffect(() => {
    setPokemonData(list)
    console.log('tutaj')
  }, [list])*/

  //console.log(pokemonData)

  //<img src={item.sprites.other["official-artwork"].front_default} alt="pokemon"/>
  // <button onClick={loadMore}>Load more pokemons</button>
  // { isLoaded && pokemonData ? pokemonData.map(item => (
  //   <li key={item.id}>
  //   <img src={item.sprites.front_default} alt="pokemon"/>
  //   {item.name} 
  //   {item.types[0].type.name}
  // </li>)) 
  // : 'Loading...' }

  console.log(pokemonData)
  return (
    <div className="App">
      <Navbar />
      <button onClick={loadMore}>Load more pokemons</button>
      <div className="pokemon--list">
        {pokemonData ? pokemonData.map((pokemon) => (<Pokemon key={pokemon.name} name={pokemon.name} />)) : 'Loading...' }
      </div>
    </div>
  );
}

export default App;
