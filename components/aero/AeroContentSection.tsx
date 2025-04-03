import { motion } from "framer-motion";
import { AeroKeyPoints } from "./AeroKeyPoints";

export const AeroContentSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl space-y-12"
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Principios de la <span className="text-[#00A3FF]">Aerodinámica</span>
            </h2>
            <div className="w-20 h-1 bg-[#00A3FF]"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                La aerodinámica es una de las áreas más importantes en el desarrollo de un auto de competición. 
                Se encarga del diseño de todos los elementos que interactúan con el flujo de aire alrededor del vehículo, 
                buscando dos objetivos principales: minimizar la resistencia al avance (drag) y maximizar la carga 
                aerodinámica (downforce).
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                En nuestro auto, el trabajo aerodinámico cobra aún más relevancia. Un buen diseño aerodinámico permite 
                mejorar considerablemente el agarre en curvas, la estabilidad en frenadas y el comportamiento general del vehículo.
              </p>
              <AeroKeyPoints />
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Dentro del equipo, el área de Aerodinámica se dedica al diseño de alerones, difusores, canalizadores y 
                carrocería, utilizando herramientas de simulación CFD (Computational Fluid Dynamics), validaciones 
                experimentales y pruebas en pista.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                El CFD (Dinámica de Fluidos Computacional) es una herramienta de simulación que permite analizar cómo 
                fluye el aire alrededor del vehículo sin necesidad de un túnel de viento. Esto nos brinda la posibilidad 
                de iterar diseños de forma rápida y precisa, evaluar diferentes configuraciones y optimizar cada componente 
                aerodinámico antes de su fabricación.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                La constante iteración entre diseño, simulación y testeo es clave para lograr un paquete eficiente y 
                competitivo. Desarrollar una buena aerodinámica no es solo una cuestión de velocidad, sino también de 
                eficiencia: permite aprovechar mejor la potencia del motor, reducir el consumo y mejorar la confiabilidad 
                del auto durante toda la competencia.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
