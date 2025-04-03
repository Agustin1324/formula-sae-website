'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const TOTAL_FRAMES = 60;
const FRAME_RATE = 30; // Frames per second
const FRAME_INTERVAL = 1000 / FRAME_RATE;
const PAUSE_DURATION = 2000; // 2 seconds pause
const IMAGE_PATH_PREFIX = '/chassis/animation/';
const IMAGE_EXTENSION = '.webp';

export function ChassisImageSequencePlayer() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward'); // State for direction
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for pause timeout

  // Function to clear both interval and timeout
  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  };

  // Function to start the animation interval
  const startInterval = () => {
    clearTimers(); // Clear existing timers first

    intervalRef.current = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        const nextFrame = prevFrame + (direction === 'forward' ? 1 : -1);

        // Check boundaries and handle pause/direction change
        if (direction === 'forward' && nextFrame > TOTAL_FRAMES) {
          // Reached end going forward: Pause, then reverse
          clearTimers();
          timeoutRef.current = setTimeout(() => {
            setDirection('reverse'); // Change direction after pause
          }, PAUSE_DURATION);
          return TOTAL_FRAMES; // Stay on last frame during pause
        } else if (direction === 'reverse' && nextFrame < 1) {
          // Reached start going reverse: Pause, then forward
          clearTimers();
          timeoutRef.current = setTimeout(() => {
            setDirection('forward'); // Change direction after pause
          }, PAUSE_DURATION);
          return 1; // Stay on first frame during pause
        } else {
          // Continue animation in the current direction
          return nextFrame;
        }
      });
    }, FRAME_INTERVAL);
  };

  // Effect for preloading images (runs only once)
  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `${IMAGE_PATH_PREFIX}${String(i).padStart(4, '0')}${IMAGE_EXTENSION}`;
    }
  }, []);

  // Effect to manage the animation interval based on direction
  useEffect(() => {
    startInterval(); // Start animation when direction changes (or on initial mount)
    
    // Cleanup function to clear timers on unmount or before effect re-runs
    return clearTimers; 
  }, [direction]); // Re-run this effect when the direction changes

  const currentImageSrc = `${IMAGE_PATH_PREFIX}${String(currentFrame).padStart(4, '0')}${IMAGE_EXTENSION}`;

  return (
    <div className="relative w-full h-full">
      <Image
        src={currentImageSrc}
        alt={`Animación del Jig de Ensamblaje - Frame ${currentFrame}`}
        width={1920} // Set explicit width
        height={1080} // Set explicit height
        className="object-contain w-full h-auto" // Use w-full h-auto for responsiveness, keep object-contain
        priority={currentFrame === 1} // Prioritize loading the first frame
        unoptimized // Useful for sequences to avoid Next.js optimization limits/costs if many images
      />
    </div>
  );
}
