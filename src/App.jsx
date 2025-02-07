import './App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Landing from './componentes/landing/landing'
import Error404 from './componentes/error404/error404'
import Pokemons from './componentes/pokemons/pokemons'
import PokemonDetail from './componentes/pokemons/pokemonDetalle/pokemonDetalle'
import Jugar from './componentes/jugar/jugar'
import Login from './componentes/login/login'
import Registro from './componentes/registro/registro'

export function RutasPrivadas() {
    const [usuario, setUsuario] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsuario(<Outlet />);
            } else {
                setUsuario(<Navigate to="/"/>);
            }
        });
    }, [auth]);

    return usuario;
}

function App() {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, []);

    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/pokemons">Pokédex</Link></li>
                    {user && <li><Link to="/jugar">Jugar</Link></li>}
                    <div className="auth-section">
                        {user ? (
                            <>
                                <li className="user-info">
                                    <span>{user.displayName}</span>
                                </li>
                                <li>
                                    <button onClick={() => auth.signOut()} className="logout-btn">
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
                                <Link to="/registro">Registro</Link>
                            </li>
                        )}
                    </div>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/pokemons" element={<Pokemons />} />
                <Route path="/detalle/:id" element={<PokemonDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route element={<RutasPrivadas />}>
                    <Route path="/jugar" element={<Jugar />} />
                </Route>
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;