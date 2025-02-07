import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './pokemonDetalle.css';

const PokemonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(data => setPokemon(data));
    }, [id]);

    if (!pokemon) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="pokemon-detail-container">
            <div className="pokemon-detail-card">
                {/* Nombre e imagen */}
                <h2>{pokemon.name}</h2>
                <img 
                    src={pokemon.sprites.front_default} 
                    alt={pokemon.name} 
                />

                {/* Estadísticas */}
                <h3>Estadísticas</h3>
                <div className="stat-container">
                    {pokemon.stats.map(stat => (
                        <div key={stat.stat.name} className="stat-item">
                            <span>{stat.stat.name}</span>
                            <span>{stat.base_stat}</span>
                        </div>
                    ))}
                </div>

                {/* Habilidades */}
                <h3>Habilidades</h3>
                <ul className="abilities-list">
                    {pokemon.abilities.map(ability => (
                        <li key={ability.ability.name}>
                            {ability.ability.name}
                        </li>
                    ))}
                </ul>

                {/* Botón para volver */}
                <button className="back-button" onClick={() => navigate('/pokemons')}>
                    Volver
                </button>
            </div>
        </div>
    );
};

export default PokemonDetail;