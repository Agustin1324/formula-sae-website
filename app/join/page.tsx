"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import ApplicationForm from "../../components/ApplicationForm";

interface Position {
  id: string;
  department: string;
  role: string;
  isOpen: boolean;
}

const availablePositions: Position[] = [
  { id: "mech1", department: "Mechanical", role: "Suspension Engineer", isOpen: true },
  { id: "mech2", department: "Mechanical", role: "Powertrain Engineer", isOpen: false },
  { id: "mech3", department: "Mechanical", role: "Aerodynamics Engineer", isOpen: true },
  { id: "elec1", department: "Electrical", role: "Control Systems Engineer", isOpen: true },
  { id: "elec2", department: "Electrical", role: "Power Electronics Engineer", isOpen: false },
  { id: "soft1", department: "Software", role: "Telemetry Developer", isOpen: true },
  { id: "soft2", department: "Software", role: "Simulation Engineer", isOpen: false },
  { id: "busi1", department: "Business", role: "Marketing Manager", isOpen: true },
  { id: "busi2", department: "Business", role: "Sponsorship Coordinator", isOpen: true },
];

export default function Join() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative h-[40vh] bg-[#1B1F3B]">
        <Image
          src="https://images.pexels.com/photos/6894427/pexels-photo-6894427.jpeg"
          alt="Racing Team Working Together"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white animate-fade-in">Join Our Team</h1>
        </div>
      </div>

      {/* Available Positions */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#1B1F3B] text-center animate-fade-in">Available Positions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {availablePositions.map((position, index) => (
              <div 
                key={position.id} 
                className={`bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in ${position.isOpen ? 'border-[#00A3FF] border-2' : 'opacity-50'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-bold text-[#1B1F3B] mb-2">{position.role}</h3>
                <p className="text-gray-600 mb-4">{position.department} Department</p>
                <Button 
                  className={`w-full ${position.isOpen ? 'bg-[#00A3FF] hover:bg-[#0082CC]' : 'bg-gray-400'} text-white transition-all duration-300`}
                  onClick={() => position.isOpen && setSelectedPosition(position)}
                  disabled={!position.isOpen}
                >
                  {position.isOpen ? 'Apply Now' : 'Position Filled'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      {selectedPosition && (
        <ApplicationForm 
          position={selectedPosition} 
          onClose={() => setSelectedPosition(null)}
        />
      )}

      {/* Application Process */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#1B1F3B] text-center animate-fade-in">Application Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Submit Application", desc: "Fill out our online application form with your details and area of interest." },
              { step: "2", title: "Interview", desc: "Meet with department leads to discuss your experience and expectations." },
              { step: "3", title: "Welcome Aboard!", desc: "Join our team and start contributing to our next racing car!" }
            ].map((step, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl font-bold text-[#00A3FF] mb-4">Step {step.step}</div>
                <h3 className="text-xl font-bold text-[#1B1F3B] mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
