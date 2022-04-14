import { useState } from 'react'
import pokeballSvg from '../img/pokeball.svg'

function Navbar(props) {
    const { handleSubmit, refresh } = props
    const [ pokemonName, setPokemonName ] = useState('')

    //console.log(pokemonName)

    function handleInput(event) {
        setPokemonName(event.target.value)
    }

    function onSubmit(event) {
        event.preventDefault()
        handleSubmit(pokemonName)
    }
    //<input type="submit" onClick={onSubmit} />
    /*return (
        <nav>
            <ul>
                <li>
                    <button className="logo" onClick={refresh}>
                        <img src={ pokeballSvg } alt="pokeball"/>
                        Pokedex
                    </button>
                </li>
                <li>
                    <form className="search--bar" onSubmit={onSubmit}>
                        <input type="text" name="pokemonName" onChange={handleInput} placeholder="Search..." />
                    </form>
                </li>
            </ul>
            
        </nav>
    )*/

    return (
        <nav>
            <button className="logo" onClick={refresh}>
                <img src={ pokeballSvg } alt="pokeball"/>
                Pokedex
            </button>
            <form className="search--bar" onSubmit={onSubmit}>
                <input type="text" name="pokemonName" onChange={handleInput} placeholder="Search..." />
            </form>
        </nav>
    )
}

export default Navbar