import { useState } from 'react'
import pokeballSvg from '../img/pokeball.svg'
import moonSvg from '../img/moon.svg'
import sunSvg from '../img/sun.svg'

function Navbar(props) {
    const { handleSubmit, refresh, changeMode, darkMode } = props
    const [ pokemonName, setPokemonName ] = useState('')

    function handleInput(event) {
        setPokemonName(event.target.value)
    }

    function onSubmit(event) {
        event.preventDefault()
        handleSubmit(pokemonName)
    }

    return (
        <nav>
            <button className="logo" onClick={refresh}>
                <img src={ pokeballSvg } alt="pokeball"/>
                Pokedex
            </button>
            <form className="search--bar" onSubmit={onSubmit}>
                <input type="text" name="pokemonName" onChange={handleInput} placeholder="Search..." />
            </form>
            <button className="toggle--dark" onClick={changeMode}>                
                <img src={darkMode ? sunSvg : moonSvg} alt="switch"/>
            </button>
        </nav>
    )
}

export default Navbar