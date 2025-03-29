import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        // Construir la ruta al directorio dentro de 'public'
        // process.cwd() da la raíz del proyecto
        const dirPath = path.join(process.cwd(), 'public', 'aero', 'animaciones', 'TEST');

        // Leer los nombres de los archivos en el directorio
        const files = await fs.promises.readdir(dirPath);

        // Filtrar y contar los archivos que coinciden con el patrón
        const webpFiles = files.filter(file => /^TEST_\d{4}\.webp$/.test(file));
        const frameCount = webpFiles.length;

        if (frameCount === 0) {
            console.warn(`API: No se encontraron archivos .webp en ${dirPath}`);
        } else {
             console.log(`API: Encontrados ${frameCount} frames en ${dirPath}`);
        }

        // Devolver el conteo en formato JSON
        return NextResponse.json({ frameCount });

    } catch (error) {
        console.error("Error al leer el directorio de frames:", error);
        // Devolver un error si no se puede leer el directorio o contar los archivos
        return NextResponse.json({ error: 'Error al obtener el número de frames', frameCount: 0 }, { status: 500 });
    }
}
