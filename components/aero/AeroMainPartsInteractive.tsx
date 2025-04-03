import { motion } from "framer-motion";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

const aeroComponents = [
  {
    title: "Alerón Delantero",
    description: `El alerón delantero es el primer elemento que interactúa con el flujo de aire, siendo 
    crucial para el rendimiento aerodinámico general del vehículo. Su diseño no solo genera carga aerodinámica 
    directa, sino que también condiciona el flujo de aire que llegará al resto del monoplaza. En competencias 
    FSAE, optimizamos su geometría para maximizar el downforce mientras minimizamos la resistencia al avance, 
    considerando también su interacción con los neumáticos delanteros.`,
    placeholder: "Imagen del Alerón Delantero"
  },
  {
    title: "Nariz",
    description: `La nariz del monoplaza cumple un rol fundamental tanto en la aerodinámica como en la 
    seguridad. Su diseño aerodinámico ayuda a canalizar el aire hacia las diferentes zonas del vehículo, 
    mientras que su estructura debe cumplir con los rigurosos requisitos de seguridad de FSAE. Trabajamos 
    en conjunto con el área de Chasis para lograr una nariz que combine eficiencia aerodinámica con la 
    capacidad de absorber energía en caso de impacto.`,
    placeholder: "Imagen de la Nariz"
  },
  {
    title: "Piso",
    description: `El piso es uno de los elementos más importantes y menos visibles del paquete aerodinámico. 
    Mediante el efecto suelo y la correcta canalización del flujo de aire, genera una significativa proporción 
    de la carga aerodinámica total. En FSAE, optimizamos su diseño para crear una zona de baja presión bajo el 
    auto, mejorando la adherencia sin comprometer la altura mínima requerida por reglamento.`,
    placeholder: "Imagen del Piso"
  },
  {
    title: "Difusor",
    description: `El difusor trabaja en conjunto con el piso para gestionar el flujo de aire que pasa por 
    debajo del auto. Su función principal es recuperar la presión del aire que viaja por debajo del vehículo 
    de manera controlada, minimizando la resistencia al avance. En nuestro monoplaza FSAE, el difusor está 
    diseñado para maximizar la extracción de aire, complementando el trabajo del piso y mejorando la eficiencia 
    aerodinámica general.`,
    placeholder: "Imagen del Difusor"
  },
  {
    title: "Alerón Trasero",
    description: `El alerón trasero es el elemento que genera la mayor carga aerodinámica directa en el 
    monoplaza. Su diseño debe balancear la generación de downforce con la resistencia al avance, considerando 
    además el balance aerodinámico del vehículo. Para FSAE, optimizamos su perfil y dimensiones para maximizar 
    el rendimiento en las velocidades típicas de competencia, prestando especial atención a su interacción con 
    el flujo de aire proveniente del resto del auto.`,
    placeholder: "Imagen del Alerón Trasero"
  }
];

export const AeroMainPartsInteractive = () => {
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
              Componentes <span className="text-[#00A3FF]">Aerodinámicos</span>
            </h2>
            <div className="w-20 h-1 bg-[#00A3FF]"></div>
          </div>

          <div className="space-y-8">
            {aeroComponents.map((component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-[#00A3FF]">
                      {component.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {component.description}
                    </p>
                  </div>
                  <ImagePlaceholder 
                    text={component.placeholder}
                    className="h-[250px] md:h-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
