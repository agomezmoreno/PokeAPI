import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pokemons.css';

const Pokemons = () => {
    const navigate = useNavigate();
    const [pokemons, setPokemons] = useState([]); 
    const [offset, setOffset] = useState(0);    
    const [busqueda, setBusqueda] = useState('');
    const limit = 8;                           

    const peticionAPI = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            .then(response => response.json())
            .then(data => setPokemons([...pokemons, ...data.results]));
    };

    useEffect(() => {
        peticionAPI();
    }, [offset]);

    const idPokemon = (url) => {
        return url.split('/')[6];
    };

    const cargarMas = () => {
        setOffset(valorPrevio => valorPrevio + limit);
    };

    const mostrarDetalle = (pokemon) => {
        const id = idPokemon(pokemon.url);
        navigate(`/detalle/${id}`);
    };

    
    return (
        <div className="pokemon-page">
            {/* Título */}
            <h1>Pokédex</h1>

            {/* Lista de pokemons */}
            <div className="container-pokemons">
                {pokemons.map(pokemon => (
                    <div key={pokemon.name} className="lista-pokemons">
                        <img 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon(pokemon.url)}.png`} 
                            alt={pokemon.name} 
                        />
                        <p>{pokemon.name}</p>
                        <button onClick={() => mostrarDetalle(pokemon)}>
                            Saber Más
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Botón para cargar más */}
            <div className="cargar-mas-container">
                <button className="cargar-mas" onClick={cargarMas}>
                    Cargar Más
                </button>
            </div>
        </div>
    );
};

export default Pokemons;