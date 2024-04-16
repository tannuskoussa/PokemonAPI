export default function PokemonCard(pokemon) {
    let typesPokemon = pokemon.types.map(type => {
        return <li style={{display: "flex", justifyContent: "center"}}>{type.type.name}</li>
    })
    return (
        <>
            <ul>
                <li>
                    <h3 style={{fontSize: 30}}>{pokemon.name}</h3>
                </li>
                {typesPokemon}
                <li>
                <img style={{display: "flex", justifyContent: "center"}} src={pokemon.sprite}></img>
                </li>
            </ul>
        </>
    );
}