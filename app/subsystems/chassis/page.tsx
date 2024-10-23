import Image from "next/image";

export default function ChassisPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative h-[50vh] bg-black">
        <Image
          src="https://images.pexels.com/photos/3847770/pexels-photo-3847770.jpeg"
          alt="Chassis Design"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Chassis</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Innovative Chassis Design</h2>
              <p className="text-lg text-gray-700">
                Our chassis is the backbone of our race car, designed for optimal strength, 
                rigidity, and weight distribution. We utilize advanced materials and 
                manufacturing techniques to create a chassis that provides the perfect 
                foundation for high performance.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lightweight carbon fiber monocoque</li>
                  <li>• Optimized torsional rigidity</li>
                  <li>• Integrated safety structures</li>
                  <li>• Aerodynamic underbody design</li>
                </ul>
              </div>
            </div>
            <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Chassis CAD Model Placeholder
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
                title: "Material Properties",
                specs: [
                  "Material: AISI 4130",
                  "Yield Strength: 435 MPa",
                  "Main Hoop: 1.0\" x 0.095\"",
                  "Support Tubes: 0.75\" x 0.065\""
                ]
              },
              {
                title: "Design Targets",
                specs: [
                  "Torsional Stiffness: 2000 Nm/deg",
                  "Total Weight: 32 kg",
                  "CG Height: 280mm",
                  "Safety Factor: >3"
                ]
              },
              {
                title: "Manufacturing",
                specs: [
                  "TIG Welding",
                  "CNC Tube Bending",
                  "3D Printed Jigs",
                  "Heat Treatment"
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

      {/* Analysis & Testing */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Analysis & Validation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                FEA Analysis Results
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Finite Element Analysis</h3>
                <p className="text-gray-700">
                  Comprehensive FEA studies ensure our chassis meets all safety and 
                  performance requirements while maintaining optimal weight.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                Torsional Test Setup
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Physical Testing</h3>
                <p className="text-gray-700">
                  Rigorous physical testing validates our design calculations and 
                  ensures real-world performance matches simulation results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
