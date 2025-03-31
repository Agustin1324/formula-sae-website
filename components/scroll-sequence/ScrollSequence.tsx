import React, { useEffect, useRef, useCallback, useState } from 'react';
import './scrollSequence.scss'; // Importar los estilos SCSS

const ANIMATION_DURATION = 2000; // Duración de la animación entre zonas
const KEYFRAMES = [1, 31, 61, 91, 115, 160]; // Zonas clave (último frame corregido)

function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef(new Image());
    const currentFrameRef = useRef(KEYFRAMES[0]); // Frame estable actual
    const targetFrameRef = useRef(KEYFRAMES[0]); // Frame al que la animación ACTIVA se dirige
    const currentZoneIndexRef = useRef(0); // Índice de la zona actual en KEYFRAMES
    // pendingZoneChangeRef eliminado
    const animationFrameIdRef = useRef<number | null>(null); // ID para saber si hay animación activa
    const animationStartTimeRef = useRef<number | null>(null);
    const animationStartFrameRef = useRef(KEYFRAMES[0]);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const isUpdatingImageRef = useRef(false);
    const [frameCount, setFrameCount] = useState(0); // Todavía necesario para clamping y path
    const [isLoading, setIsLoading] = useState(true);
    const imageAspectRatioRef = useRef<number | null>(null);

    const currentFramePath = useCallback((index: number): string => {
        if (!frameCount || index < 1) return '';
        const clampedIndex = Math.max(1, Math.min(Math.round(index), frameCount));
        return `/aero/animaciones/TEST/TEST_${clampedIndex.toString().padStart(4, '0')}.webp`;
    }, [frameCount]);

    const calculateDrawParams = useCallback(/* ... (sin cambios) ... */
    (logicalWidth: number, logicalHeight: number, img: HTMLImageElement): { dx: number, dy: number, dw: number, dh: number } => {
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;

        if (!imgWidth || !imgHeight) {
            return { dx: 0, dy: 0, dw: logicalWidth, dh: logicalHeight };
        }

        const imgRatio = imgWidth / imgHeight;
        const canvasRatio = logicalWidth / logicalHeight;

        let drawWidth = logicalWidth;
        let drawHeight = logicalHeight;
        let dx = 0;
        let dy = 0;

        if (imgRatio > canvasRatio) {
            drawHeight = drawWidth / imgRatio;
            dy = (logicalHeight - drawHeight) / 2;
        } else {
            drawWidth = drawHeight * imgRatio;
            dx = (logicalWidth - drawWidth) / 2;
        }

        return { dx, dy, dw: drawWidth, dh: drawHeight };
    }, []);

    const updateScrollIndicatorPosition = useCallback(() => {
        if (!scrollIndicatorRef.current || frameCount <= 1) return;
        // ... (lógica sin cambios) ...
        const indicator = scrollIndicatorRef.current;
        const container = indicator.parentElement;
        const navbarElement = document.querySelector('nav');
        const footerElement = document.querySelector('footer');

        if (!container) return;

        const indicatorHeight = indicator.offsetHeight;
        const totalContainerHeight = container.offsetHeight;
        const currentNavbarHeight = navbarElement ? navbarElement.offsetHeight : 0;
        const currentFooterHeight = footerElement ? footerElement.offsetHeight : 0;

        const availableScrollHeight = Math.max(0, totalContainerHeight - currentNavbarHeight - currentFooterHeight - indicatorHeight);
        const progress = frameCount > 1 ? (currentFrameRef.current - 1) / (frameCount - 1) : 0;
        const topPosition = currentNavbarHeight + (progress * availableScrollHeight);

        indicator.style.top = `${topPosition}px`;
    }, [frameCount]);

    // Función dedicada a dibujar un frame específico
    const drawFrame = useCallback((frameIndex: number) => {
        // ... (sin cambios) ...
        const canvas = canvasRef.current;
        if (!canvas || isUpdatingImageRef.current || !frameCount) return;

        const frameToShow = Math.max(1, Math.min(Math.round(frameIndex), frameCount));
        const targetSrc = currentFramePath(frameToShow);
        if (!targetSrc) return;

        isUpdatingImageRef.current = true;

        const context = canvas.getContext('2d');
        const img = imageRef.current;

        if (!context) {
            isUpdatingImageRef.current = false;
            return;
        }

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        const performDraw = () => {
            if (canvasRef.current && context && img.naturalWidth > 0) {
                 const logicalWidth = parseFloat(canvas.style.width) || canvas.width;
                 const logicalHeight = parseFloat(canvas.style.height) || canvas.height;
                 const params = calculateDrawParams(logicalWidth, logicalHeight, img);

                 context.save();
                 context.setTransform(1, 0, 0, 1, 0, 0);
                 context.clearRect(0, 0, canvas.width, canvas.height);
                 context.restore();

                 context.drawImage(img, params.dx, params.dy, params.dw, params.dh);
                 // DEBUG: Mostrar frame dibujado
                 console.log(`Drawing frame: ${frameToShow.toFixed(2)}`);
            }
            isUpdatingImageRef.current = false;
        };

        if (img.src.endsWith(targetSrc)) {
             requestAnimationFrame(performDraw);
        } else {
            img.src = targetSrc;
            img.onload = () => {
                if (imageAspectRatioRef.current === null && img.naturalWidth > 0) {
                    imageAspectRatioRef.current = img.naturalWidth / img.naturalHeight;
                }
                 requestAnimationFrame(performDraw);
            };
            img.onerror = () => {
                console.error(`Error cargando imagen frame ${frameToShow}: ${img.src}`);
                isUpdatingImageRef.current = false;
            };
        }
    }, [frameCount, currentFramePath, calculateDrawParams]);


    // Función de animación
    const runAnimation = useCallback((timestamp: number) => { // Ya no necesita startAnimationFunc
        if (animationStartTimeRef.current === null) {
            animationStartTimeRef.current = timestamp;
        }

        const elapsedTime = timestamp - animationStartTimeRef.current;
        let progress = Math.min(1, elapsedTime / ANIMATION_DURATION);
        progress = progress * (2 - progress); // EaseOutQuad

        const intermediateFrame = animationStartFrameRef.current + (targetFrameRef.current - animationStartFrameRef.current) * progress;

        drawFrame(intermediateFrame);

        if (progress < 1) {
            animationFrameIdRef.current = requestAnimationFrame(runAnimation); // Llama a sí misma
        } else {
            // Animación completada
            currentFrameRef.current = targetFrameRef.current;
            const finalZoneIndex = KEYFRAMES.findIndex(kf => kf === targetFrameRef.current);
            if (finalZoneIndex !== -1) {
                currentZoneIndexRef.current = finalZoneIndex;
            }
            console.log(`Animation ended. Stable frame: ${currentFrameRef.current} (Zone index: ${currentZoneIndexRef.current})`);
            updateScrollIndicatorPosition();
            animationFrameIdRef.current = null; // Marcar animación como terminada
            animationStartTimeRef.current = null;
            // Ya no se revisa el buffer
        }
    }, [drawFrame, updateScrollIndicatorPosition]);

    // Función para iniciar la animación
    const startAnimation = useCallback((newTargetFrame: number) => { // Ya no necesita targetZoneIndex aquí
        // Esta función ahora solo configura e inicia el rAF
        animationStartFrameRef.current = currentFrameRef.current;
        targetFrameRef.current = newTargetFrame; // Asume que ya está clampeado

        if (targetFrameRef.current === animationStartFrameRef.current) {
            return;
        }

        // console.log(`Starting animation from ${animationStartFrameRef.current} to ${targetFrameRef.current}`);
        animationStartTimeRef.current = null;
        animationFrameIdRef.current = requestAnimationFrame(runAnimation); // Inicia el loop

    }, [runAnimation]); // Solo depende de runAnimation


    // Efecto para obtener frame count
    useEffect(() => {
        // ... (sin cambios) ...
        setIsLoading(true);
        fetch('/api/aero-frame-count')
            .then(res => res.json())
            .then(data => {
                if (data.frameCount > 0) {
                    setFrameCount(data.frameCount);
                    const lastKeyframeIndex = KEYFRAMES.length - 1;
                    if (KEYFRAMES[lastKeyframeIndex] > data.frameCount) {
                        KEYFRAMES[lastKeyframeIndex] = data.frameCount;
                    }
                    currentFrameRef.current = KEYFRAMES[0];
                    targetFrameRef.current = KEYFRAMES[0];
                    currentZoneIndexRef.current = 0;
                } else {
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

    // Efecto para precargar imágenes
    useEffect(() => {
        // ... (sin cambios) ...
        if (frameCount > 0) {
            KEYFRAMES.forEach(kf => {
                const preloadImg = new Image();
                preloadImg.src = currentFramePath(kf);
            });
            const preloadLimit = 20;
            for (let i = 1; i <= Math.min(frameCount, preloadLimit); i++) {
                 if (!KEYFRAMES.includes(i)) {
                     const preloadImg = new Image();
                     preloadImg.src = currentFramePath(i);
                 }
            }
            console.log("Keyframes preloaded.");
        }
    }, [frameCount, currentFramePath]);

    // Efecto principal para canvas, scroll y resize
    useEffect(() => {
        if (isLoading || frameCount === 0) return;

        const canvas = canvasRef.current;
        // ... (resto de setup inicial sin cambios) ...
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        context.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        drawFrame(currentFrameRef.current);
        setTimeout(() => updateScrollIndicatorPosition(), 150);


        const handleWheel = (event: WheelEvent) => {
            // IGNORAR si hay una animación en curso
            if (animationFrameIdRef.current !== null) {
                // Opcional: podrías querer prevenir el default incluso si ignoras,
                // para evitar que la página scrollee mientras la anim interna está bloqueada.
                // event.preventDefault();
                // console.log("Animation in progress, scroll ignored.");
                return;
            }

            let zoneChange = 0;
            let shouldPreventDefault = false;

            // Calcular índice de zona potencial (ahora solo basado en la zona actual estable)
            const potentialZoneIndex = currentZoneIndexRef.current;

            if (event.deltaY > 0) { // Scroll hacia abajo
                if (potentialZoneIndex < KEYFRAMES.length - 1) {
                     zoneChange = 1;
                     shouldPreventDefault = true;
                }
            } else if (event.deltaY < 0) { // Scroll hacia arriba
                 if (potentialZoneIndex > 0) {
                     zoneChange = -1;
                     shouldPreventDefault = true;
                 }
            }

            if (shouldPreventDefault) {
                event.preventDefault();
                // Calcular directamente el target sin buffer
                const nextZoneIndex = currentZoneIndexRef.current + zoneChange;
                // Clamp index (aunque la lógica anterior ya lo previene)
                const clampedNextZoneIndex = Math.max(0, Math.min(KEYFRAMES.length - 1, nextZoneIndex));
                const nextTargetFrame = KEYFRAMES[clampedNextZoneIndex];

                // Iniciar animación solo si el target es diferente del frame actual
                if (nextTargetFrame !== currentFrameRef.current) {
                    startAnimation(nextTargetFrame); // Ya no necesita el índice
                }
            }
        };

        const handleResize = () => {
             // ... (sin cambios) ...
             const currentCanvas = canvasRef.current;
             if (currentCanvas) {
                 const currentRect = currentCanvas.getBoundingClientRect();
                 const currentDpr = window.devicePixelRatio || 1;
                 currentCanvas.width = currentRect.width * currentDpr;
                 currentCanvas.height = currentRect.height * currentDpr;
                 currentCanvas.style.width = `${currentRect.width}px`;
                 currentCanvas.style.height = `${currentRect.height}px`;

                 const currentContext = currentCanvas.getContext('2d');
                 if (currentContext) {
                     currentContext.scale(currentDpr, currentDpr);
                 }
                 drawFrame(currentFrameRef.current);
                 setTimeout(() => updateScrollIndicatorPosition(), 50);
             }
        };

        canvas.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('resize', handleResize);

        return () => {
            // ... (sin cambios) ...
            if (canvas) {
                canvas.removeEventListener('wheel', handleWheel);
            }
            window.removeEventListener('resize', handleResize);
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [isLoading, frameCount, drawFrame, startAnimation, updateScrollIndicatorPosition]);

    if (isLoading) {
        return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', color: '#fff' }}>Cargando fotogramas...</div>;
    }
    if (frameCount === 0) {
         return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', color: 'red' }}>Error al cargar la secuencia de animación.</div>;
    }

    return (
        // ... (JSX sin cambios) ...
        <section className="png__sequence" style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <canvas
                ref={canvasRef}
                className="png__sequence__canvas"
                id="canvas"
                style={{ width: '100%', height: '100%', display: 'block' }}
            >
            </canvas>
            {frameCount > 1 && !isLoading && (
                 <div ref={scrollIndicatorRef} className="scroll-indicator"></div>
            )}
        </section>
    );
}

export default ScrollSequence;
