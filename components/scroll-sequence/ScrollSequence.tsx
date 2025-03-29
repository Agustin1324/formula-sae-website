import React, { useEffect, useRef, useCallback, useState } from 'react';
import './scrollSequence.scss'; // Importar los estilos SCSS

function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef(new Image());
    const currentFrameRef = useRef(1);
    const animationFrameIdRef = useRef<number | null>(null);
    const isUpdatingRef = useRef(false);
    const [isHovering, setIsHovering] = useState(false);
    const [frameCount, setFrameCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const imageAspectRatioRef = useRef<number | null>(null); // Ref para guardar la relación de aspecto

    const currentFramePath = useCallback((index: number): string => {
        if (index < 1) return '';
        return `/aero/animaciones/TEST/TEST_${index.toString().padStart(4, '0')}.webp`;
    }, []);

    // Función para calcular dimensiones y posición manteniendo aspect ratio
    const calculateDrawParams = useCallback((canvas: HTMLCanvasElement, img: HTMLImageElement): { dx: number, dy: number, dw: number, dh: number } => {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;

        // Si no tenemos dimensiones de imagen, dibujar ocupando todo (fallback)
        if (!imgWidth || !imgHeight) {
            return { dx: 0, dy: 0, dw: canvasWidth, dh: canvasHeight };
        }

        const imgRatio = imgWidth / imgHeight;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth = canvasWidth;
        let drawHeight = canvasHeight;
        let dx = 0;
        let dy = 0;

        if (imgRatio > canvasRatio) {
            // Imagen más ancha que el canvas: ajustar por ancho
            drawHeight = drawWidth / imgRatio;
            dy = (canvasHeight - drawHeight) / 2; // Centrar verticalmente
        } else {
            // Imagen más alta o igual que el canvas: ajustar por alto
            drawWidth = drawHeight * imgRatio;
            dx = (canvasWidth - drawWidth) / 2; // Centrar horizontalmente
        }

        return { dx, dy, dw: drawWidth, dh: drawHeight };
    }, []);

    const updateImage = useCallback((index: number) => {
        if (frameCount === 0 || !canvasRef.current || isUpdatingRef.current) return;

        isUpdatingRef.current = true;
        const canvas = canvasRef.current; // Guardar referencia local
        const context = canvas.getContext('2d');
        if (!context) {
            isUpdatingRef.current = false;
            return;
        }

        const clampedIndex = Math.max(1, Math.min(Math.round(index), frameCount));
        const img = imageRef.current;
        const targetSrc = currentFramePath(clampedIndex);

        if (!targetSrc) {
             isUpdatingRef.current = false;
             return;
        }

        const redrawCurrentImage = () => {
            if (canvasRef.current && context && img.naturalWidth > 0) { // Asegurarse que la imagen tiene dimensiones
                const params = calculateDrawParams(canvasRef.current, img);
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                context.drawImage(img, params.dx, params.dy, params.dw, params.dh);
                // console.log(`Frame ${clampedIndex} redibujado con aspect ratio.`);
            }
             isUpdatingRef.current = false;
        };

        if (img.src.endsWith(targetSrc)) {
             redrawCurrentImage(); // Redibujar la imagen actual con el aspect ratio correcto
             return;
        }

        // console.log(`Intentando cargar frame: ${clampedIndex}, src: ${targetSrc}`);
        img.src = targetSrc;
        img.onload = () => {
            // Guardar aspect ratio si es la primera vez
            if (imageAspectRatioRef.current === null && img.naturalWidth > 0) {
                imageAspectRatioRef.current = img.naturalWidth / img.naturalHeight;
            }
            redrawCurrentImage(); // Dibujar la nueva imagen con aspect ratio
        };
        img.onerror = () => {
            console.error(`Error cargando imagen frame ${clampedIndex}: ${img.src}`);
            isUpdatingRef.current = false;
        };

    }, [currentFramePath, frameCount, calculateDrawParams]);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/aero-frame-count')
            .then(res => res.json())
            .then(data => {
                if (data.frameCount > 0) {
                    setFrameCount(data.frameCount);
                    console.log(`Frame count recibido de API: ${data.frameCount}`);
                } else {
                    console.error("API devolvió 0 frames o hubo un error.");
                    setFrameCount(0);
                }
            })
            .catch(error => {
                console.error("Error al llamar a la API de frame count:", error);
                setFrameCount(0);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (frameCount > 0) {
            console.log(`Precargando imágenes (hasta ${frameCount})...`);
            const preloadLimit = 50;
            for (let i = 1; i <= Math.min(frameCount, preloadLimit); i++) {
                const preloadImg = new Image();
                preloadImg.src = currentFramePath(i);
            }
            console.log(`Precarga iniciada para los primeros ${Math.min(frameCount, preloadLimit)} frames.`);
        }
    }, [frameCount, currentFramePath]);

    useEffect(() => {
        if (isLoading || frameCount === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Dibujar frame inicial (la función updateImage ahora maneja el aspect ratio)
        setTimeout(() => updateImage(currentFrameRef.current), 100);

        const handleWheel = (event: WheelEvent) => {
            if (isHovering) {
                event.preventDefault();
                const frameStep = 1;
                let newFrame;
                if (event.deltaY > 0) {
                    newFrame = currentFrameRef.current + frameStep;
                } else if (event.deltaY < 0) {
                    newFrame = currentFrameRef.current - frameStep;
                } else {
                    return;
                }
                const clampedFrame = Math.max(1, Math.min(newFrame, frameCount));
                if (Math.round(clampedFrame) !== Math.round(currentFrameRef.current)) {
                     currentFrameRef.current = clampedFrame;
                     if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
                     animationFrameIdRef.current = requestAnimationFrame(() => updateImage(currentFrameRef.current));
                     // console.log(`Wheel Delta: ${event.deltaY.toFixed(0)}, Hovering, Frame: ${currentFrameRef.current.toFixed(0)}`);
                }
            }
        };

        const handleResize = () => {
            if (canvasRef.current) {
                // Actualizar tamaño del canvas
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Redibujar la imagen actual con el nuevo tamaño y aspect ratio correcto
                updateImage(currentFrameRef.current);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('resize', handleResize);

        return () => {
            console.log("Limpiando componente ScrollSequence (hover/wheel mode)...");
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('resize', handleResize);
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [isLoading, frameCount, isHovering, updateImage, calculateDrawParams]); // Añadir calculateDrawParams

    if (isLoading) {
        return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', color: '#fff' }}>Cargando fotogramas...</div>;
    }
    if (frameCount === 0) {
         return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', color: 'red' }}>Error al cargar la secuencia de animación.</div>;
    }

    return (
        <section className="png__sequence">
            <canvas
                ref={canvasRef}
                className="png__sequence__canvas"
                id="canvas"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
            </canvas>
        </section>
    );
}

export default ScrollSequence;
