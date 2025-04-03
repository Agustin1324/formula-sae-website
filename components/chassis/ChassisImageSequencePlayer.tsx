'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom'; 
import { Play, Pause, Expand, X } from 'lucide-react'; 
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
  const isBoundaryPauseActive = useRef(false); 
  const [isClient, setIsClient] = useState(false);
  // No longer need scrollYRef or originalBodyStyles ref

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

  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `${IMAGE_PATH_PREFIX}${String(i).padStart(4, '0')}${IMAGE_EXTENSION}`;
    }
  }, []);

  useEffect(() => {
    if (isPlaying && !isPausedByUser && !isBoundaryPauseActive.current) {
      startInterval();
    } else {
      clearTimers();
    }
    return clearTimers;
  }, [isPlaying, isPausedByUser, startInterval, clearTimers]); 

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

  const renderContent = (isFs: boolean) => (
    <div className="relative h-full flex items-center justify-center"> {/* Removed w-full */}
      <Image
        src={currentImageSrc}
        alt={`Animación del Jig de Ensamblaje - Frame ${currentFrame}`}
        width={1920}
        height={1080}
        className={`object-contain ${isFs ? 'max-w-full max-h-full w-auto h-auto' : 'h-auto'}`} /* Removed w-full again when not fullscreen */
        priority={currentFrame === 1}
        unoptimized
      />
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
       {isFs && (
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
      <div
        className={`relative h-auto group ${isFullscreen ? 'hidden' : ''}`} /* Removed w-max */
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
