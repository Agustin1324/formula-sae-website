"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DM_Sans } from 'next/font/google'
import timelineData from '@/data/timeline.json';

//Inicializo
const dmSans = DM_Sans({ subsets: ['latin'] })
const defaultDotColor = "bg-white/20";
const activeDotColor = "bg-[#00A3FF]";

interface TimelineEntry {
  title: string;
  heading: string;
  content: string[]; 
  image: {
    src: string;
    alt: string;
  };
}

const achievements: TimelineEntry[] = timelineData.achievements;

export const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculo que punto tiene que estar pintado basado en la posicion de scroll
    const newIndex = Math.floor(latest * achievements.length);
    setActiveIndex(newIndex);
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans md:px-10 pt-16"
      ref={containerRef}
    >

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
            initial={{ opacity: 0.6, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, ease: "easeOut" }
            }}
            viewport={{ once: false, margin: "-20%" }}
          >
            <motion.div 
              className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full"
              whileInView={{
                scale: 1.05,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
              viewport={{ once: false, margin: "-20%" }}
            >
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center">
                <div 
                  className={`h-4 w-4 rounded-full transition-colors duration-300 ${
                    index <= activeIndex ? activeDotColor : defaultDotColor
                  } border border-white/30 p-2`} 
                />
              </div>
              <h3 className={`hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-[#00A3FF] ${dmSans.className}`}>
                {item.title}
              </h3>
            </motion.div>

            <motion.div 
              className="relative pl-20 pr-4 md:pl-4 w-full"
              whileInView={{
                scale: 1.02,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
              viewport={{ once: false, margin: "-20%" }}
            >
              <h3 className={`md:hidden block text-2xl mb-4 text-left font-bold text-[#00A3FF] ${dmSans.className}`}>
                {item.title}
              </h3>
              <motion.div
                initial={{ opacity: 0.8, scale: 0.98 }}
                whileInView={{
                  opacity: 1,
                  scale: 1.02,
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
                viewport={{ once: false, margin: "-20%" }}
              >
                <div>
                  <h3 className={`text-lg font-bold mb-2 text-white ${dmSans.className}`}>
                    {item.heading}
                  </h3>
                  <ul className="mb-4 list-disc list-inside space-y-2">
                    {item.content.map((contentItem, contentIndex) => (
                      <li key={contentIndex} className="text-gray-300">
                        {contentItem}
                      </li>
                    ))}
                  </ul>
                  <Image 
                    src={item.image.src} 
                    alt={item.image.alt} 
                    width={300} 
                    height={200} 
                    className="rounded-lg" 
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/20 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-[#00A3FF] via-[#00A3FF] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
