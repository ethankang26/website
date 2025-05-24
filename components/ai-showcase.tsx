import { motion } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const screens = [
  {
    title: "Document Analysis",
    description: "AI-powered extraction and validation of mortgage documents with real-time accuracy checks",
    color: "from-blue-500/20 to-indigo-500/20",
    position: "top-[5%] left-[5%]",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    title: "Multi-Lender Processing",
    description: "Simultaneous application processing across multiple lenders for optimal rates",
    color: "from-purple-500/20 to-pink-500/20",
    position: "top-[8%] left-[55%]",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Income & Credit Analysis",
    description: "Comprehensive financial assessment including income verification and credit analysis",
    color: "from-emerald-500/20 to-teal-500/20",
    position: "top-[35%] left-[20%]",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    title: "Real-time Updates",
    description: "Live tracking of application status with instant notifications on progress",
    color: "from-orange-500/20 to-amber-500/20",
    position: "top-[32%] left-[70%]",
    gradient: "from-orange-500 to-amber-500"
  },
  {
    title: "Smart Approval System",
    description: "Intelligent approval process with automated underwriting and risk assessment",
    color: "from-rose-500/20 to-red-500/20",
    position: "top-[15%] left-[30%]",
    gradient: "from-rose-500 to-red-500"
  }
]

export function AIShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black py-24 md:py-32 overflow-hidden min-h-screen"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-500/10 rounded-full blur-3xl opacity-20" />
      
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            AI-Powered Mortgage Processing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience our cutting-edge AI technology streamlining every aspect of your mortgage application
          </p>
        </motion.div>

        <div className="relative h-[700px]">
          {screens.map((screen, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className={`absolute ${screen.position} w-[500px] group hover:z-50 transition-all duration-300`}
              style={{
                perspective: "1000px",
                zIndex: index
              }}
            >
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 ease-out transform hover:scale-110 hover:-translate-y-2 cursor-pointer bg-gray-900"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${screen.color} opacity-50`} />
                <div className="aspect-[16/9] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <div className={`w-full h-full bg-gradient-to-br ${screen.gradient} animate-pulse`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 animate-ping" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <h3 className="text-2xl font-semibold text-white mb-3 opacity-90 group-hover:opacity-100">
                      {screen.title}
                    </h3>
                    <p className="text-gray-300 text-base opacity-80 group-hover:opacity-100">
                      {screen.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/2 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl opacity-20" />
      </div>
    </div>
  )
} 