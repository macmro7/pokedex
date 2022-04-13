import { useState, useEffect } from 'react'

function Pokemon(props) {
    const { name } = props
    const [ pokemon, setPokemon ] = useState()
    const [ isLoading, setIsLoading ] = useState(true)

    async function getData() {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json());
        console.log(data)
        setPokemon(data)
        setIsLoading(false)
        //getPokemonData(data.results)
        //setNextUrl(data.next)
        console.log('siema')
    }

    useEffect(() => {
        getData()
      }, [])

    console.log(pokemon)
    return (
        <div>
            { pokemon &&
            <ul>
                <li>
                    { pokemon.name }        
                </li>
                <li>
                    { pokemon.types[0].type.name }        
                </li>
                <li>
                    <img src={pokemon.sprites.front_default} alt="pokemon"/>     
                </li>
            </ul>
            }
        </div>
    )
}

export default Pokemon