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
  const [ darkMode, setDarkMode ] = useState(false)
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
    setPokemonData(null)
    setUrl( nextUrl )
  }

  function loadPrevious() {
    setIsLoading(true)
    setPokemonData(null)
    prevUrl && setUrl( prevUrl )
  }

  function handleSubmit(name) {
    if(pokemonName != name) { // triggers api calls only once with the same name
      setIsLoading(true)
      setError(null)
      setPokemonData(null)
      setPokemonName(name)
    }
  }

  function refresh(){
    setUrl(`https://pokeapi.co/api/v2/pokemon/`)
    setPokemonName('')
    setError('')
  }

  function changeMode() {
    setDarkMode(prev => !prev)
  }

  useEffect(() => {
    getData()
  }, [url, pokemonName])

  return (
    <div className={darkMode ? "dark--mode" : "App"}>
      <Navbar 
        handleSubmit={handleSubmit} 
        refresh={refresh} 
        changeMode={changeMode}
        darkMode={darkMode}
      />
      <div className={pokemonName ? "hidden" : "pagination"}>
        <button 
          disabled={!prevUrl ? "disabled" : ""} 
          onClick={loadPrevious}
        >
          Previous page
        </button>
        <button 
          disabled={!nextUrl ? "disabled" : ""} 
          onClick={loadNext}
        >
          Next page
        </button>
      </div>
      <div className="pokemon--list">
        { error && <h1 className="error">{ error }</h1> }
        { isLoading && <h1 className="loading">Loading...</h1>}
        { pokemonData && pokemonData.map((pokemon) => (
          <Pokemon key={pokemon.name} name={pokemon.name} />))}
      </div>
    </div>
  );
}

export default App;
