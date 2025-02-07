import { Navigate, Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

export function RutasPrivadas() {
    const [estaAutenticado, setEstaAutenticado] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        // Vigilar cambios en la autenticación
        onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                // Si hay usuario, mostrar contenido protegido
                setEstaAutenticado(<Outlet />);
                console.log("Usuario conectado:", usuario.displayName);
            } else {
                // Si no hay usuario, redirigir a inicio
                setEstaAutenticado(<Navigate to="/" />);
                console.log("Usuario desconectado");
            }
        });
    }, [auth]);

    // Mientras se verifica, mostrar loading
    if (estaAutenticado === null) {
        return <div>Cargando...</div>;
    }

    return estaAutenticado;
}