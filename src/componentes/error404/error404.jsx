import './error404.css';
import psyduckConfused from '../../assets/img/psyduck-confused.png';
import { Link } from 'react-router-dom';

export default function Error404() {
    return (
        <div className="error-container">
            <div className="error-content">
                <img 
                    src={psyduckConfused}
                    alt="Psyduck confundido" 
                    className="error-image" 
                />
                <h1>¡Ups! Error 404</h1>
                <p>Parece que te has perdido en el mundo Pokémon</p>
                <Link to="/" className="return-button">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}


