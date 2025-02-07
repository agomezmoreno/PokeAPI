import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, limit, where, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './jugar.css';

export default function Jugar() {
    const auth = getAuth();
    const usuario = auth.currentUser;
    const [pokemon, setPokemon] = useState(null);
    const [palabra, setPalabra] = useState("");
    const [letrasUsadas, setLetrasUsadas] = useState([]);
    const [intentos, setIntentos] = useState(6);
    const [mensaje, setMensaje] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [ranking, setRanking] = useState([]);
    const navigate = useNavigate();
    const [puntos, setPuntos] = useState(0);

    const calcularPuntos = () => {
        return 50;
    };
    
    useEffect(() => {
        obtenerPokemonAleatorio();
        cargarRanking();
    }, [usuario, navigate]);

    const cargarRanking = () => {
        const ref = collection(db, 'puntuaciones');
        const consultaTop10 = query(ref, orderBy('puntos', 'desc'), limit(10));
        
        getDocs(consultaTop10)
            .then(resultado => {
                const puntuaciones = resultado.docs.map(doc => {
                    return {
                        id: doc.id,
                        usuario: doc.data().usuario,
                        puntos: doc.data().puntos
                    };
                });
                setRanking(puntuaciones);
            })
            .catch(() => setRanking([]));
    };

    
    const guardarPuntuacion = () => { 
        const puntosNuevos = calcularPuntos();
        const ref = collection(db, 'puntuaciones');
        const buscarUsuario = query(ref, 
            where('usuario', '==', usuario.displayName),
            where('uid', '==', usuario.uid)
        );
    
        getDocs(buscarUsuario)
            .then(resultado => {
                if (resultado.empty) {
                    addDoc(ref, {
                        usuario: usuario.displayName,
                        uid: usuario.uid,
                        puntos: puntosNuevos
                    });
                } 
                else {
                    const documento = resultado.docs[0];
                    const puntosActuales = documento.data().puntos || 0;
                    
                    updateDoc(documento.ref, {
                        puntos: puntosActuales + puntosNuevos
                    });
                }
            })
            .then(cargarRanking);
    };

    const obtenerPokemonAleatorio = () => {
        const id = Math.floor(Math.random() * 151) + 1;
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(data => {
                setPokemon(data);
                setPalabra(data.name.toUpperCase());
            });
    };

    const comprobarLetra = (letra) => {
        if (gameOver || letrasUsadas.includes(letra)) {
            return;
        }

        const nuevasLetras = letrasUsadas.slice();
        nuevasLetras.push(letra);
        setLetrasUsadas(nuevasLetras);
    
        const letraCorrecta = palabra.includes(letra);
    
        if (letraCorrecta) {
            const todasLasLetras = palabra.split('');
            const palabraCompleta = todasLasLetras.every(letraPalabra => 
                letrasUsadas.includes(letraPalabra) || letraPalabra === letra
            );
    
            if (palabraCompleta) {
                const puntosGanados = calcularPuntos();
                setGameOver(true);
                setPuntos(puntosGanados);
                setMensaje(`¡Ganaste! Puntuación: ${puntosGanados}`);
                guardarPuntuacion();
            }
        } else {
            const intentosRestantes = intentos - 1;
            setIntentos(intentosRestantes);
    
            if (intentosRestantes === 0) {
                setGameOver(true);
                setMensaje(`¡Perdiste! El Pokémon era ${palabra}`);
            }
        }
    };

    const reiniciarJuego = () => {
        setLetrasUsadas([]);
        setIntentos(6);
        setGameOver(false);
        setMensaje("");
        setPuntos(0);
        obtenerPokemonAleatorio();
    };

    const mostrarPalabra = () => {
        const letras = palabra.split('');
        
        const letrasVisibles = letras.map((letra, posicion) => {
            const letraVisible = letrasUsadas.includes(letra) ? letra : '-';
            
            return (
                <span key={posicion} className="letra">
                    {letraVisible}
                </span>
            );
        });
    
        return letrasVisibles;
    };

    const teclado = () => {
        // Crear array con todas las letras del alfabeto
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        
        // Crear un botón para cada letra
        return letras.map(letra => {
            // Verificar si la letra ya fue usada
            const letraUsada = letrasUsadas.includes(letra);
            
            // Crear el botón
            return (
                <button 
                    key={letra}
                    onClick={() => comprobarLetra(letra)}
                    disabled={letraUsada || gameOver}
                    className={`tecla ${letraUsada ? 'usada' : ''}`}
                >
                    {letra}
                </button>
            );
        });
    };


    // clases parq los estilos
    const obtenerClaseMensaje = () => {
        if (!gameOver) return 'mensaje';
        
        if (intentos > 0) {
            return 'mensaje success';
        } else {
            return 'mensaje error';
        }
    };

    const obtenerEstiloPokemon = () => {
        if (gameOver) {
            return { filter: 'none' };
        } else {
            return { filter: 'brightness(0)' };
        }
    };

    return (
        // Contenedor principal del juego
        <div className="game-wrapper">
    
            {/* Contenido principal del juego */}
            <div className="game-content">
                {/* Zona de juego */}
                <div className="game-main">
                    {/* Imagen y palabra del Pokémon */}
                    {pokemon && (
                        <div className="pokemon-container">
                            {/* Imagen del Pokémon (oscura hasta que se adivine) */}
                            <div className="pokemon-imagen">
                                <img 
                                    src={pokemon.sprites.front_default} 
                                    alt="Pokemon" 
                                    style={obtenerEstiloPokemon()}
                                />
                            </div>
                            {/* Palabra a adivinar e intentos */}
                            <div className="palabra-container">
                                <div className="palabra">{mostrarPalabra()}</div>
                                <div className="intentos">Intentos restantes: {intentos}</div>
                            </div>
                        </div>
                    )}
    
                    {/* Mensaje de victoria o derrota */}
                    {mensaje && (
                        <div className={obtenerClaseMensaje()}>
                            {mensaje}
                        </div>
                    )}
    
                    {/* Teclado virtual */}
                    <div className="teclado-container">
                        <div className="teclado">{teclado()}</div>
                    </div>
    
                    {/* Botón para reiniciar el juego */}
                    {gameOver && (
                        <button className="reiniciar" onClick={reiniciarJuego}>
                            Jugar de nuevo
                        </button>
                    )}
                </div>
    
                {/* Tabla de clasificación */}
                <div className="ranking-container">
                    <div className="ranking">
                        <h2>🏆 Ranking Top 10</h2>
                        {ranking.length > 0 ? (
                            <ul className="ranking-list">
                                {ranking.map((score, index) => (
                                    <li key={score.id} className="ranking-item">
                                        <div className="ranking-info">
                                            <span className="ranking-position">{index + 1}º</span>
                                            <span className="ranking-user">{score.usuario}</span>
                                        </div>
                                        <span className="ranking-points">{score.puntos} pts</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="no-scores">No hay puntuaciones registradas</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

