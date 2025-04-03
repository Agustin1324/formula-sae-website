'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TOTAL_FRAMES = 60;
const FRAME_RATE = 30; // Frames per second
const FRAME_INTERVAL = 1000 / FRAME_RATE;
const PAUSE_DURATION = 2000; // 2 seconds pause
const IMAGE_PATH_PREFIX = '/chassis/animation/';
const IMAGE_EXTENSION = '.webp';

export function ChassisImageSequencePlayer() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');
  // isPlaying: Represents the active state of the animation interval/timeout loop.
  const [isPlaying, setIsPlaying] = useState(true); 
  const [isHovering, setIsHovering] = useState(false);
  // isPausedByUser: Tracks if the user *explicitly* clicked pause or used the slider.
  const [isPausedByUser, setIsPausedByUser] = useState(false); 
  // Ref to track if a boundary pause is currently active.
  const isBoundaryPauseActive = useRef(false); 

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to clear timers
  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
    isBoundaryPauseActive.current = false; // Reset flag when timers are cleared
  }, []);

  // Function to advance frame for the automatic loop
  const advanceFrame = useCallback(() => {
    // Check if user paused while interval was running
    if (isPausedByUser) {
        clearTimers();
        setIsPlaying(false); // Ensure isPlaying reflects user pause
        return;
    }

    setCurrentFrame((prevFrame) => {
      const nextFrame = prevFrame + (direction === 'forward' ? 1 : -1);

      // Check boundaries
      if (direction === 'forward' && nextFrame > TOTAL_FRAMES) {
        clearTimers(); // Stop interval for pause
        isBoundaryPauseActive.current = true; // Mark boundary pause active
        timeoutRef.current = setTimeout(() => {
          isBoundaryPauseActive.current = false; // Mark boundary pause finished
          setDirection('reverse');
          // If user hasn't paused, signal to restart the interval via useEffect by setting isPlaying
          if (!isPausedByUser) {
            setIsPlaying(true); 
          } else {
             setIsPlaying(false); // Ensure isPlaying remains false if user paused during boundary pause
          }
        }, PAUSE_DURATION);
        return TOTAL_FRAMES; // Stay on last frame
      } else if (direction === 'reverse' && nextFrame < 1) {
        clearTimers(); // Stop interval for pause
        isBoundaryPauseActive.current = true; // Mark boundary pause active
        timeoutRef.current = setTimeout(() => {
          isBoundaryPauseActive.current = false; // Mark boundary pause finished
          setDirection('forward');
           // If user hasn't paused, signal to restart the interval via useEffect by setting isPlaying
          if (!isPausedByUser) {
            setIsPlaying(true);
          } else {
             setIsPlaying(false); // Ensure isPlaying remains false if user paused during boundary pause
          }
        }, PAUSE_DURATION);
        return 1; // Stay on first frame
      } else {
        // Continue animation
        return nextFrame;
      }
    });
  }, [direction, isPausedByUser, clearTimers]); 

  // Effect for preloading images
  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `${IMAGE_PATH_PREFIX}${String(i).padStart(4, '0')}${IMAGE_EXTENSION}`;
    }
  }, []);

  // Effect to manage the animation interval timer
  useEffect(() => {
    // Start interval ONLY if isPlaying is true AND no boundary pause is active
    if (isPlaying && !isBoundaryPauseActive.current) {
      clearTimers(); // Ensure no duplicate timers before starting a new one
      intervalRef.current = setInterval(advanceFrame, FRAME_INTERVAL);
    } else {
      // Clear interval if isPlaying is false OR if a boundary pause is active
      clearTimers();
    }
    // Cleanup function
    return clearTimers;
  // This effect runs when isPlaying changes or indirectly when boundary pause finishes
  }, [isPlaying, advanceFrame, clearTimers]); 

  // --- Control Handlers ---
  const handlePlayPause = () => {
    const wasPlaying = isPlaying; 
    
    if (wasPlaying) {
      // If loop was running or intended to run, user wants to pause explicitly
      setIsPlaying(false); // Stop the loop intent
      setIsPausedByUser(true); // Mark as user paused
      clearTimers(); // Stop any active interval or boundary timeout
    } else {
      // If loop was stopped (either by user or boundary pause), user wants to play
      setIsPausedByUser(false); // Unmark user pause
      setIsPlaying(true); // Set intent to play
      // The useEffect will handle starting the interval if not currently in boundary pause.
      // If in boundary pause, setting isPlaying ensures it resumes after timeout finishes.
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false); // Stop automatic loop intent
    setIsPausedByUser(true); // Mark as user interaction
    clearTimers(); // Clear timers
    setCurrentFrame(parseInt(event.target.value, 10));
  };

  // Hover handlers only control visibility
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const currentImageSrc = `${IMAGE_PATH_PREFIX}${String(currentFrame).padStart(4, '0')}${IMAGE_EXTENSION}`;
  
  // Determine button icon: Show Pause if the loop is intended to run (isPlaying) AND not paused by user.
  const showPauseIcon = isPlaying && !isPausedByUser;

  return (
    <div
      className="relative w-full h-auto group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={currentImageSrc}
        alt={`Animación del Jig de Ensamblaje - Frame ${currentFrame}`}
        width={1920}
        height={1080}
        className="object-contain w-full h-auto"
        priority={currentFrame === 1}
        unoptimized
      />

      {/* Playback Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-center space-x-4 max-w-md mx-auto">
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
          <span className="text-sm text-white font-mono w-16 text-right flex-shrink-0">
            {String(currentFrame).padStart(2, '0')} / {TOTAL_FRAMES}
          </span>
        </div>
      </div>
    </div>
  );
}
