"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

const achievements: TimelineEntry[] = [
  {
    title: "Mayo 2023",
    content: (
      <div>
        <h3 className="text-lg font-bold mb-2">Fundación</h3>
        <p className="mb-4">An important milestone for our team, allowing us to work more efficiently.</p>
        <Image src="https://images.unsplash.com/photo-1572204292164-b35ba943fca7" alt="Our workshop" width={300} height={200} className="rounded-lg" />
      </div>
    ),
  },
  {
    title: "Diciembre 2023",
    content: (
      <div>
        <h3 className="text-lg font-bold mb-2">Conseguimos el aval de la facultad</h3>
        <p className="mb-4">Official recognition of our project by the institution.</p>
        <Image src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1" alt="Academic approval" width={300} height={200} className="rounded-lg" />
      </div>
    ),
  },
  {
    title: "Julio 2024",
    content: (
      <div>
        <h3 className="text-lg font-bold mb-2">Obtuvimos el taller</h3>
        <p className="mb-4">Finalization of the chassis design, ready for the construction phase.</p>
        <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="Chassis design" width={300} height={200} className="rounded-lg" />
      </div>
    ),
  },
  {
    title: "Octubre 2024",
    content: (
      <div>
        <h3 className="text-lg font-bold mb-2">1er chasis prototipo</h3>
        <p className="mb-4">First physical model of the chassis, crucial for testing and adjustments.</p>
        <Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837" alt="Scale prototype" width={300} height={200} className="rounded-lg" />
      </div>
    ),
  },
  {
    title: "Enero 2025",
    content: (
      <div>
        <h3 className="text-lg font-bold mb-2">Diseño de la dinámica del vehículo</h3>
        <p className="mb-4">Construction of the full-size chassis, an important step towards the final vehicle.</p>
        <Image src="https://images.unsplash.com/photo-1581092162384-8987c1d64718" alt="Full chassis" width={300} height={200} className="rounded-lg" />
      </div>
    ),
  },
];


export const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

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

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10 pt-16"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Nuestro viaje en FIUBA Racing
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          From our first steps to our future goals, here's the timeline of our project.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl text-[#1E2A4A] font-montserrat">Nuestros Logros</h3>
        {achievements.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}


        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
