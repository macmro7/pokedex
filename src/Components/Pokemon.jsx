import { useState, useEffect } from 'react'

function Pokemon(props) {
    const { name } = props
    const [ pokemon, setPokemon ] = useState()
    const [ display, setDisplay ] = useState("none")

    function handleClick() {
        if (display === "none") {
            setDisplay("block")
        }
        else {
            setDisplay("none")
        }
    }

    useEffect(() => {
        async function getData() {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => response.json());
            setPokemon(data)
        }

        getData()
      }, [name])
  
    return (
        <>
            { pokemon && 
            <button className="pokemon--container" onClick={handleClick}>
                <ul>
                    <li>
                        <img src={pokemon.sprites.other["official-artwork"].front_default} alt="pokemon"/>     
                    </li>
                    <li className="pokemon--name">
                        { pokemon.name }        
                    </li>
                    <li className="pokemon--type">
                        <ul>
                            { pokemon.types.map(item => <li>{item.type.name}</li>)}       
                        </ul>
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