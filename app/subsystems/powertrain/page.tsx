import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PowertrainPage() {
  return (
    <div className="min-h-screen bg-white">
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

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">High-Performance Powertrain</h2>
              <p className="text-lg text-gray-700">
                Our powertrain system is engineered for maximum efficiency and power output. 
                We combine cutting-edge technology with innovative design to create a 
                powertrain that delivers exceptional performance on the track.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Key Components</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Custom-tuned engine management system</li>
                  <li>• Optimized intake and exhaust systems</li>
                  <li>• Advanced cooling solutions</li>
                  <li>• Lightweight drivetrain components</li>
                </ul>
              </div>
            </div>
            <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Powertrain Diagram Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Technical Specifications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Engine",
                specs: [
                  "600cc Inline-4",
                  "Power: ~85 HP",
                  "12,500 RPM Redline",
                  "Dry Sump Lubrication"
                ]
              },
              {
                title: "Drivetrain",
                specs: [
                  "Chain Drive",
                  "Custom Differential",
                  "Quick-shift System",
                  "Lightweight Flywheel"
                ]
              },
              {
                title: "Performance",
                specs: [
                  "0-100 km/h: 3.5s",
                  "Max Speed: 140 km/h",
                  "Power/Weight: 0.34 HP/kg",
                  "Fuel: 98 RON"
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h3>
                <ul className="space-y-2 text-gray-700">
                  {section.specs.map((spec, i) => (
                    <li key={i}>• {spec}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsystems */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Subsystems</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Intake System",
                desc: "Custom designed plenum and runners optimized through CFD analysis",
                features: ["Variable length runners", "Carbon fiber construction", "Optimized flow paths"]
              },
              {
                title: "Exhaust System",
                desc: "4-2-1 header design maximizing power output across the rev range",
                features: ["Stainless steel construction", "Thermal wrapped", "Tuned length"]
              },
              {
                title: "Cooling System",
                desc: "Dual radiator setup ensuring optimal operating temperatures",
                features: ["Custom radiators", "Electric fans", "Temperature monitoring"]
              },
              {
                title: "Fuel System",
                desc: "High-pressure direct injection system with custom fuel rail",
                features: ["Sequential injection", "Pressure regulation", "Fuel safety systems"]
              }
            ].map((system, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{system.title}</h3>
                <p className="text-gray-700 mb-4">{system.desc}</p>
                <ul className="space-y-1 text-gray-600">
                  {system.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
