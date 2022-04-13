import { useState, useEffect } from 'react'

function Pokemon(props) {
    const { name } = props
    const [ pokemon, setPokemon ] = useState()
    const [ display, setDisplay ] = useState("none")
    const [ isLoading, setIsLoading ] = useState(true)

    async function getData() {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json());
        //console.log(data)
        setPokemon(data)
        setIsLoading(false)
        //getPokemonData(data.results)
        //setNextUrl(data.next)
        //console.log('siema')
    }

    function handleClick() {
        if (display == "none") {
            setDisplay("block")
        }
        else {
            setDisplay("none")
        }
    }

    useEffect(() => {
        getData()
      }, [])

    //console.log(pokemon)
    //<img src={pokemon.sprites.front_default} alt="pokemon"/>    
    return (
        <>
            { pokemon && 
            <button className="pokemon--container" onClick={handleClick}>
                <ul className="pokemon">
                    <li>
                        <img src={pokemon.sprites.other["official-artwork"].front_default} alt="pokemon"/>     
                    </li>
                    <li>
                        { pokemon.name }        
                    </li>
                    <li>
                        { pokemon.types[0].type.name }        
                    </li>
                    <ul className="content" style={{'display': display}}>
                        <li>height: { pokemon.height }</li>
                        <li>weight: { pokemon.weight }</li>
                    </ul>
                </ul>
            </button>
            }
        </>
    )
}

export default Pokemon