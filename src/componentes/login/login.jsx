import './login.css';
import pokemonLogo from '../../assets/img/pokemon-logo.png';
import googleIcon from '../../assets/img/google-icon.png';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    const auth = getAuth();
    const googleAuthProvider = new GoogleAuthProvider();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const iniciarSesionConUserYPass = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/');
            })
            .catch((e) => {
                setError("Error al iniciar sesión: " + e.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const iniciarSesionConGoogle = () => {
        setLoading(true);
        setError(null);
        
        signInWithPopup(auth, googleAuthProvider)
            .then(() => {
                navigate('/');
            })
            .catch((e) => {
                setError("Error al iniciar sesión: " + e.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src={pokemonLogo} alt="Pokemon Logo" className="pokemon-logo" />
                    <h1>¡Bienvenido Entrenador!</h1>
                    <p className="login-subtitle">
                        Inicia sesión para comenzar tu aventura Pokémon
                    </p>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={iniciarSesionConUserYPass} className="login-form">
                    <div className="form-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? <div className="button-spinner"></div> : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="separator">
                    <span>o</span>
                </div>

                <button 
                    onClick={iniciarSesionConGoogle} 
                    className="google-button"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="button-spinner"></div>
                    ) : (
                        <>
                            <img src={googleIcon} alt="Google" className="google-icon"/>
                            Iniciar con Google
                        </>
                    )}
                </button>   
            </div>
        </div>
    );
}

export default Login;