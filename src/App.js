import { useState, useEffect } from 'react'
import './App.css';
import Navbar from './Components/Navbar.jsx'
import Pokemon from './Components/Pokemon.jsx'

function App() {
  const [ pokemonData, setPokemonData ] = useState()
  const [ isLoading, setIsLoading ] = useState(true)
  const [ url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/`)
  const [ nextUrl, setNextUrl ] = useState()
  const [ prevUrl, setPrevUrl ] = useState()
  const [ pokemonName, setPokemonName ] = useState()
  const [ error, setError ] = useState()
  //const [ pokemonList, setPokemonList ] = useState()
  const pokemonList = []

  /*async function getData() {
    const data = await fetch(`${url + pokemonName}`)
    .then(response => response.json());

    if(data.results) {
      setPokemonData(data.results) 
      setNextUrl(data.next)
      setPrevUrl(data.previous)
    } 
    else {  // allows filtering by name
      setPokemonData([data]) 
    }

    //getPokemonData(data.results)
  }*/

  async function getData() {
    if(pokemonName) {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(res => {
        if(!res.ok) {
          setPokemonData(null)
          setIsLoading(null)
          throw Error(`Pokemon ${pokemonName} could not be found`)
        }
        return res.json()
      })
      .then(data => {
        setPokemonData([data])
        setIsLoading(false)
        setError('')
      })
      .catch(err => {
        setError(err.message)
      })
    }
    else {
      await fetch(url)
      .then(res => {
        if(!res.ok) {
          throw Error(`Error`)
        }
        return res.json()
      })
      .then(data => {
        setPokemonData(data.results)
        setNextUrl(data.next)
        setPrevUrl(data.previous)

        setIsLoading(false)
        setError('')
      })
      .catch(err => {
        setError(err.message)
      })
    }
  }


  function loadNext() {
    setIsLoading(true)
    setUrl( nextUrl )
    console.log(nextUrl)
  }

  function loadPrevious() {
    setIsLoading(true)
    prevUrl && setUrl( prevUrl )
  }

  function handleSubmit(name) {
    setIsLoading(true)
    setError(null)
    name && setPokemonName(name)
  }

  function refresh(){
    setUrl(`https://pokeapi.co/api/v2/pokemon/`)
    setPokemonName('')
    setError('')
  }

  useEffect(() => {
    getData()
  }, [url, pokemonName])

  // {error ? error :
  //   (<div className="pokemon--list">
  //     {pokemonData ? pokemonData.map((pokemon) => (
  //       <Pokemon key={pokemon.name} name={pokemon.name} />)) 
  //       : 'Loading...' }
  //   </div>)
  // } 
  return (
    <div className="App">
      <Navbar handleSubmit={handleSubmit} refresh={refresh} />
      <div className="pagination">
        <button onClick={loadPrevious}>Previous page</button>
        <button onClick={loadNext}>Next page</button>
      </div>
      <div className="pokemon--list">
        { error && error }
        { isLoading && <h1>Loading...</h1>}
        { pokemonData && pokemonData.map((pokemon) => (
          <Pokemon key={pokemon.name} name={pokemon.name} />))}
      </div>
    </div>
  );
}

export default App;
