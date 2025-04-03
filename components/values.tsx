import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Compass, Eye, Heart } from "lucide-react"

export default function ValuesSection() {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-[#00A3FF] transition-all duration-300 group-hover:text-white group-hover:stroke-white" />,
      title: "Objetivo",
      description: (
        <>
          Nuestro objetivo es competir en <strong className="font-bold">Interlagos en 2026</strong>. Sin embargo, a largo plazo buscamos que este proyecto perdure y se consolide como un referente dentro de nuestra universidad, donde alumnos, profesores y empresas colaboren mutuamente para fomentar el desarrollo y progreso del capital humano.
        </>
      ),
    },
    {
      icon: <Eye className="h-8 w-8 text-[#00A3FF] transition-all duration-300 group-hover:text-white group-hover:stroke-white" />,
      title: "Visión",
      description: (
        <>
          Buscamos como equipo fomentar la <strong className="font-bold">creatividad</strong> y la <strong className="font-bold">innovación</strong> en la ingeniería para tener una visión integral del proyecto. esto incluye el control de costos, la <strong className="font-bold">calidad ingenieril</strong> y la búsqueda de términos de efectividad económica sin excluir el rendimiento.
        </>
      ),
    }
  ]

  return (
    <section className="w-full py-8 md:py-16 lg:py-24 overflow-hidden">
      <div className="container px-4 md:px-6 max-w-full">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-[#00A3FF] font-montserrat">
              Acerca de Nosotros
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12 w-full">
          {values.map((item, index) => (
            <Card 
              key={index} 
              className="group h-full transition-all duration-300 hover:shadow-lg hover:scale-105 bg-white/5 backdrop-blur-lg hover:bg-white/10 border border-white/10 w-full"
            >
              <CardHeader className="pb-2">
                <div className="mb-2">{item.icon}</div>
                <CardTitle className="text-xl text-white font-montserrat group-hover:text-[#00A3FF] break-words">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-300 group-hover:text-white/90 break-words">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
