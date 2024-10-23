import Image from "next/image";

export default function SuspensionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative h-[50vh] bg-black">
        <Image
          src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg"
          alt="Suspension Design"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Suspension</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Advanced Suspension System</h2>
              <p className="text-lg text-gray-700">
                Our suspension system is designed to provide optimal handling and performance 
                on the track. We utilize a sophisticated design that balances comfort, 
                stability, and responsiveness to give our drivers the edge they need.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Double wishbone configuration</li>
                  <li>• Adjustable dampers and spring rates</li>
                  <li>• Anti-roll bar system</li>
                  <li>• Optimized geometry for maximum tire contact</li>
                </ul>
              </div>
            </div>
            <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Suspension Geometry Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections... */}
    </div>
  );
}
