import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Projects() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative h-[40vh] bg-black">
        <Image
          src="https://images.pexels.com/photos/12795/pexels-photo-12795.jpeg"
          alt="Projects Header"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our First Project</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </div>
      </nav>

      {/* Current Car */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">FR-24: Our First Formula SAE Vehicle</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[400px] bg-gray-200 rounded-lg">
              {/* Placeholder for CAD render */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                CAD Render Coming Soon
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">Design Goals</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Target Weight: 250kg</li>
                <li>• Electric Powertrain</li>
                <li>• Custom Aerodynamics Package</li>
                <li>• Advanced Data Acquisition System</li>
              </ul>
              <div className="pt-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Project Timeline</h3>
                <p className="text-gray-700">Currently in the design phase, with manufacturing scheduled to begin in early 2024.</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white mt-4">
                Follow Our Progress
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Development Phases */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Development Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                phase: "Design",
                status: "In Progress",
                details: "CAD modeling, simulations, and component selection"
              },
              { 
                phase: "Manufacturing",
                status: "Upcoming",
                details: "Component fabrication and vehicle assembly"
              },
              { 
                phase: "Testing",
                status: "Future Phase",
                details: "Vehicle validation and driver training"
              }
            ].map((phase, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{phase.phase}</h3>
                <div className="text-red-600 font-semibold mb-2">{phase.status}</div>
                <p className="text-gray-600">{phase.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Electric Powertrain",
                desc: "High-efficiency motor with advanced control systems"
              },
              {
                title: "Composite Chassis",
                desc: "Lightweight design with optimal rigidity"
              },
              {
                title: "Aerodynamics",
                desc: "CFD-optimized aero package"
              },
              {
                title: "Safety Systems",
                desc: "Exceeding FSAE safety requirements"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
