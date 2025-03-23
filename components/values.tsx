import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Compass, Eye, Heart } from "lucide-react"

export default function ValuesSection() {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-[#00A3FF] transition-all duration-300 group-hover:text-[#1E2A4A] group-hover:stroke-[#1E2A4A]" />,
      title: "Objetivos",
      description:
        "Ponerlos.",
    },
    {
      icon: <Compass className="h-8 w-8 text-[#00A3FF] transition-all duration-300 group-hover:text-[#1E2A4A] group-hover:stroke-[#1E2A4A]" />,
      title: "Mision",
      description:
        "Ponerlos.",
    },
    {
      icon: <Eye className="h-8 w-8 text-[#00A3FF] transition-all duration-300 group-hover:text-[#1E2A4A] group-hover:stroke-[#1E2A4A]" />,
      title: "Vision",
      description:
        "Ponerlos.",
    },
    {
      icon: <Heart className="h-8 w-8 text-[#00A3FF] transition-all duration-300 group-hover:text-[#1E2A4A] group-hover:stroke-[#1E2A4A]" />,
      title: "Valores",
      description:
        "Ponerlos.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1E2A4A] font-montserrat">
              Acerca de Nosotros
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {values.map((item, index) => (
            <Card 
              key={index} 
              className="group h-full transition-all duration-300 hover:shadow-lg hover:scale-105 bg-[#1E2A4A] hover:bg-[#00A3FF] border-none"
            >
              <CardHeader className="pb-2">
                <div className="mb-2">{item.icon}</div>
                <CardTitle className="text-xl text-white font-montserrat">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-300 group-hover:text-[#1E2A4A]">
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

