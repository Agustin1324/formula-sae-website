'use client';

import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function PowertrainPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="relative h-[50vh] bg-black">
        <Image
          src="https://images.pexels.com/photos/3846205/pexels-photo-3846205.jpeg"
          alt="Powertrain Design"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Powertrain</h1>
        </div>
      </div>

      {/* Scroll Animation Section */}
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-3xl font-semibold text-black dark:text-white">
              Powertrain <br />
              <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none">
                Analysis & Selection
              </span>
            </h1>
          </>
        }
      >
        <div className="flex flex-col md:flex-row justify-between w-full h-full">
          <div className="w-full md:w-1/2 h-full flex items-center justify-center p-2">
            <div className="relative w-full h-[80%] bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/powertrain/rated-power-fuel-consumption.png"
                alt="Powertrain Data Table"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-2 space-y-2">
            <h2 className="text-xl font-bold text-gray-800">Component Analysis</h2>
            <p className="text-gray-600">
              Our team meticulously analyzed numerous powertrain components, considering factors such as:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Power output</li>
              <li>Fuel consumption</li>
              <li>RPM range</li>
              <li>Efficiency ratings (IMO, EPA, CCNR, CE97/68)</li>
              <li>Duty cycle performance</li>
            </ul>
            <p className="text-gray-600">
              Through this comprehensive analysis, we selected components that perfectly align with our project specifications, ensuring optimal performance and efficiency for our Formula SAE vehicle.
            </p>
          </div>
        </div>
      </ContainerScroll>

      {/* Rest of the content */}
      {/* ... (keep the existing sections from the previous powertrain page) */}
    </div>
  );
}
