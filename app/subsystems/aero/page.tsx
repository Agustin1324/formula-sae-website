import Image from "next/image";

export default function AerodynamicsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative h-[50vh] bg-black">
        <Image
          src="https://images.pexels.com/photos/3806754/pexels-photo-3806754.jpeg"
          alt="Aerodynamics Design"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Aerodynamics</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Comprehensive Aero Package</h2>
              <p className="text-lg text-gray-700">
                Our aerodynamics package is designed to maximize downforce while minimizing drag, 
                providing our car with superior handling and stability at high speeds. We utilize 
                advanced CFD simulations and wind tunnel testing to optimize every component.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Key Components</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Front wing with adjustable elements</li>
                  <li>• Rear wing with DRS capability</li>
                  <li>• Underbody diffuser</li>
                  <li>• Sidepod and bargeboard optimization</li>
                </ul>
              </div>
            </div>
            <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                CFD Simulation Results Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections... */}
    </div>
  );
}
