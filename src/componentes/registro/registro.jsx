import './registro.css';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import pokemonLogo from '../../assets/img/pokemon-logo.png';

export function Registro() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const registrarUsuario = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);
        setError('');

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return updateProfile(userCredential.user, {
                    displayName: usuario
                });
            })
            .then(() => {
                navigate('/');
                console.log("Registro correcto");
            })
            .catch((e) => {
                setError("Error en el registro: " + e.message);
                console.log('Failed register', e);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    
    return (
        <div className="registro-container">
            <div className="registro-card">
                <div className="registro-header">
                    <img 
                        src={pokemonLogo} 
                        alt="Pokemon Logo" 
                        className="pokemon-logo" 
                    />
                    <h1>Registro</h1>
                    <p className="registro-subtitle">
                        ¡Únete a la aventura Pokémon!
                    </p>
                </div>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={registrarUsuario} className="registro-form">
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Nombre de Usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="registro-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="button-spinner"></div>
                        ) : (
                            'Registrarse'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Registro;