'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { Play, Pause, Expand, X, Loader2 } from 'lucide-react'; // Import Loader2
import { Button } from '@/components/ui/button';
import { RemoveScroll } from 'react-remove-scroll'; // Import the library

const TOTAL_FRAMES = 60;
const FRAME_RATE = 30; // Frames per second
const FRAME_INTERVAL = 1000 / FRAME_RATE;
const PAUSE_DURATION = 2000; // 2 seconds pause
const IMAGE_PATH_PREFIX = '/chassis/animation/';
const IMAGE_EXTENSION = '.webp';

export function ChassisImageSequencePlayer() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0); // State for loaded images count
  const isBoundaryPauseActive = useRef(false);
  const [isClient, setIsClient] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
    isBoundaryPauseActive.current = false;
  }, []);

  const startInterval = useCallback(() => {
    clearTimers();
    if (isPausedByUser) {
        setIsPlaying(false);
        return;
    }
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        if (isPausedByUser) {
            clearTimers();
            setIsPlaying(false);
            return prevFrame;
        }
        const nextFrame = prevFrame + (direction === 'forward' ? 1 : -1);
        if (direction === 'forward' && nextFrame > TOTAL_FRAMES) {
          clearTimers();
          isBoundaryPauseActive.current = true;
          timeoutRef.current = setTimeout(() => {
            isBoundaryPauseActive.current = false;
            setDirection('reverse');
            if (!isPausedByUser) setIsPlaying(true);
          }, PAUSE_DURATION);
          return TOTAL_FRAMES;
        } else if (direction === 'reverse' && nextFrame < 1) {
          clearTimers();
          isBoundaryPauseActive.current = true;
          timeoutRef.current = setTimeout(() => {
            isBoundaryPauseActive.current = false;
            setDirection('forward');
            if (!isPausedByUser) setIsPlaying(true);
          }, PAUSE_DURATION);
          return 1;
        } else {
          return nextFrame;
        }
      });
    }, FRAME_INTERVAL);
  }, [direction, isPausedByUser, clearTimers]);

  // Preload images and track loading progress
  useEffect(() => {
    // Ensure this runs only once on the client
    if (!isClient) return;

    // Reset loading state if component re-renders and isClient becomes true again
    setIsLoading(true);
    setImagesLoadedCount(0);

    let loadedCount = 0;
    const imageLoadPromises = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const promise = new Promise<void>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => {
          loadedCount++;
          setImagesLoadedCount(loadedCount); // Update state for potential progress display
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${img.src}`);
          // Still count it to potentially finish loading state, but resolve
          loadedCount++;
          setImagesLoadedCount(loadedCount);
          resolve(); // Resolve even on error to not block loading completion indefinitely
        };
        img.src = `${IMAGE_PATH_PREFIX}${String(i).padStart(4, '0')}${IMAGE_EXTENSION}`;
      });
      imageLoadPromises.push(promise);
    }

    // Wait for all images to attempt loading
    Promise.all(imageLoadPromises).then(() => {
      setIsLoading(false); // All images attempted loading
    });

  }, [isClient]); // Depend on isClient to ensure window.Image is available

  // Start animation only when not loading and playing conditions are met
  useEffect(() => {
    // Only start interval if not loading AND playing conditions are met
    if (!isLoading && isPlaying && !isPausedByUser && !isBoundaryPauseActive.current) {
      startInterval();
    } else {
      // Ensure timers are cleared if loading, paused, or not playing
      clearTimers();
    }
    // Cleanup timers on unmount or when dependencies change
    return clearTimers;
    // Add isLoading to dependencies to re-evaluate when loading finishes
  }, [isLoading, isPlaying, isPausedByUser, startInterval, clearTimers]);

  // Effect for Escape key ONLY (scroll lock handled by RemoveScroll)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    // Add listener only when fullscreen
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  const handlePlayPause = () => {
    const wasPlaying = isPlaying && !isPausedByUser;
    if (wasPlaying) {
      setIsPausedByUser(true);
      setIsPlaying(false);
      clearTimers();
    } else {
      setIsPausedByUser(false);
      setIsPlaying(true);
      // No need to call startInterval here, the useEffect will handle it when isLoading is false
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);
    setIsPausedByUser(true);
    clearTimers();
    setCurrentFrame(parseInt(event.target.value, 10));
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const currentImageSrc = `${IMAGE_PATH_PREFIX}${String(currentFrame).padStart(4, '0')}${IMAGE_EXTENSION}`;
  const showPauseIcon = isPlaying && !isPausedByUser;

  // Loading Indicator Component
  const LoadingIndicator = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white z-10">
      <Loader2 className="h-8 w-8 animate-spin mb-2" />
      <span>Cargando animación... ({imagesLoadedCount}/{TOTAL_FRAMES})</span>
    </div>
  );

  const renderContent = (isFs: boolean) => (
    // Ensure the container itself doesn't collapse when loading
    <div className={`relative flex items-center justify-center ${isFs ? 'w-full h-full' : 'w-auto h-auto min-h-[200px]'}`}>
      {/* Loading indicator - always rendered when loading, positioned absolutely */}
      {isLoading && <LoadingIndicator />}

      {/* Conditionally render Image based on loading state */}
      {/* Use opacity to hide/show image smoothly once loaded */}
      <Image
        src={currentImageSrc}
        alt={`Animación del Jig de Ensamblaje - Frame ${currentFrame}`}
        width={1920}
        height={1080}
        className={`object-contain transition-opacity duration-300 ${isFs ? 'max-w-full max-h-full w-auto h-auto' : 'h-auto'} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        priority={currentFrame === 1}
        unoptimized
      />

      {/* Controls overlay - visible when hovering or fullscreen, and NOT loading */}
      {!isLoading && (
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/50 to-transparent transition-opacity duration-300 ${
            (isHovering || isFs) ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 max-w-xl mx-auto">
            <Button variant="ghost" size="icon" onClick={handlePlayPause} className="text-white hover:bg-white/20 flex-shrink-0">
              {showPauseIcon ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            <input
              type="range"
              min="1"
              max={TOTAL_FRAMES}
              value={currentFrame}
              onChange={handleSliderChange}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#00A3FF]"
            />
            <span className="text-sm text-white font-mono w-12 sm:w-16 text-right flex-shrink-0">
              {String(currentFrame).padStart(2, '0')}/{TOTAL_FRAMES}
            </span>
            {!isFs && (
               <Button variant="ghost" size="icon" onClick={handleToggleFullscreen} className="text-white hover:bg-white/20 flex-shrink-0">
                 <Expand size={20} />
               </Button>
            )}
          </div>
        </div>
      )}

       {/* Fullscreen close button - visible when fullscreen and NOT loading */}
       {!isLoading && isFs && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleFullscreen}
            className="fixed top-5 right-5 text-white bg-black/40 hover:bg-white/30 z-[60]"
            aria-label="Cerrar pantalla completa"
          >
            <X size={28} />
          </Button>
        )}
    </div>
  );

  return (
    <>
      {/* Container for the non-fullscreen player */}
      <div
        // Apply a minimum height and background while loading to prevent layout shifts
        className={`relative group ${isFullscreen ? 'hidden' : ''} ${isLoading ? 'h-[200px] w-full bg-black/20 flex items-center justify-center rounded-lg border border-white/10' : 'h-auto'}`} /* Adjust loading style/size */
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {renderContent(false)}
      </div>

      {/* Fullscreen View (Modal style) Container - Using Portal and RemoveScroll */}
      {isClient && isFullscreen && createPortal(
        <RemoveScroll enabled={isFullscreen}> {/* Wrap modal content with RemoveScroll */}
          <div
            className="fixed inset-0 w-screen h-screen z-[55] bg-black/95 flex items-center justify-center p-4"
          >
             {renderContent(true)}
          </div>
        </RemoveScroll>,
        document.body
      )}
    </>
  );
}
