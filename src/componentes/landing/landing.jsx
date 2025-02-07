import './landing.css';

export default function Landing() {
    return (
        <div className="landing-container">
            <div className="landing-bg-overlay"></div>
            <header className="landing-header">
                <h1>¡Bienvenido a PokéAPI!</h1>
                <p className="subtitle">Explora el mundo Pokémon</p>
            </header>

            <main className="landing-main">
                <div className="feature-cards">
                    <div className="feature-card">
                        <div className="card-icon">🔍</div>
                        <h2>Pokédex</h2>
                        <p className="feature-description">
                            Descubre todos los Pokémon y sus características únicas
                        </p>
                        <ul className="feature-list">
                            <li>Información detallada</li>
                            <li>Estadísticas completas</li>
                        </ul>
                    </div>

                    <div className="feature-card">
                        <div className="card-icon">🎮</div>
                        <h2>Juego del Ahorcado</h2>
                        <p className="feature-description">
                            Pon a prueba tu conocimiento Pokémon
                        </p>
                        <ul className="feature-list">
                            <li>Compite por la mejor puntuación</li>
                            <li>Ranking Top 10</li>
                        </ul>
                    </div>
                </div>

                <section className="about-section">
                    <h2>Características</h2>
                    <div className="about-content">
                        <div className="about-card">
                            <div className="card-icon">⚡</div>
                            <h3>API Oficial</h3>
                            <p>Datos actualizados de la PokéAPI</p>
                        </div>
                        <div className="about-card">
                            <div className="card-icon">💻</div>
                            <h3>React</h3>
                            <p>Tecnología moderna y eficiente</p>
                        </div>
                        <div className="about-card">
                            <div className="card-icon">🌟</div>
                            <h3>Open Source</h3>
                            <p>Código disponible en GitHub</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="landing-footer">
                <p>Desarrollado por Álvaro Gómez Moreno</p>
            </footer>
        </div>
    );
}