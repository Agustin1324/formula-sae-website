'use client'; // Necesario para dynamic import con ssr: false

import React from 'react';
import dynamic from 'next/dynamic';

// Importar dinámicamente ScrollSequence asegurando que solo se renderice en el cliente
const ScrollSequence = dynamic(
    () => import('@/components/scroll-sequence/ScrollSequence'),
    {
        ssr: false, // Deshabilitar Server-Side Rendering para este componente
        loading: () => <p>Cargando animación...</p> // Mostrar un mensaje mientras carga
    }
);

export default function AeroPage() {
    return (
        <div>
            {/* Renderizar el componente cargado dinámicamente */}
            <ScrollSequence />
            {/* Aquí puedes añadir más contenido si es necesario, después de la secuencia */}
            {/* Por ejemplo, un div para continuar el scroll después de la animación */}
            {/* <div style={{ height: '100vh', background: 'lightblue' }}>
                <p>Contenido después de la animación</p>
            </div> */}
        </div>
    );
}
