"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { FileText, Cpu, CheckCircle } from "lucide-react"

interface AIProcessingVisualProps {
  files: string[]
  isComplete: boolean
}

export function AIProcessingVisual({ files, isComplete }: AIProcessingVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [activeFileIndex, setActiveFileIndex] = useState(0)
  const [extractedData, setExtractedData] = useState<Record<string, string[]>>({})

  // Animation frame reference
  const animationRef = useRef<number>()

  // Canvas dimensions
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Initialize canvas and particles
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const container = canvas.parentElement

        if (container) {
          const { width, height } = container.getBoundingClientRect()
          setDimensions({ width, height })

          canvas.width = width
          canvas.height = height

          // Create particles
          const newParticles: Particle[] = []
          const particleCount = Math.floor((width * height) / 10000) // Adjust density

          for (let i = 0; i < particleCount; i++) {
            newParticles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              size: Math.random() * 3 + 1,
              speedX: (Math.random() - 0.5) * 1,
              speedY: (Math.random() - 0.5) * 1,
              color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(
                Math.random() * 100 + 100,
              )}, 255, ${Math.random() * 0.5 + 0.2})`,
            })
          }

          setParticles(newParticles)
        }
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Animate particles
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "rgba(100, 100, 255, 0.05)"
      ctx.lineWidth = 1

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particles, dimensions])

  // Simulate data extraction
  useEffect(() => {
    if (files.length === 0) return

    const extractionData: Record<string, string[]> = {}

    // Simulate data extraction for each file
    files.forEach((file) => {
      const dataPoints = []

      // Generate random data points based on file name
      if (file.toLowerCase().includes("application")) {
        dataPoints.push("Applicant Name: John Doe")
        dataPoints.push("SSN: XXX-XX-1234")
        dataPoints.push("Application Date: 05/22/2025")
      } else if (file.toLowerCase().includes("income") || file.toLowerCase().includes("bank")) {
        dataPoints.push("Monthly Income: $8,500")
        dataPoints.push("Employer: Tech Innovations Inc.")
        dataPoints.push("Employment Duration: 4 years")
      } else if (file.toLowerCase().includes("property")) {
        dataPoints.push("Property Address: 123 Main St")
        dataPoints.push("Property Value: $750,000")
        dataPoints.push("Property Type: Single Family")
      } else {
        dataPoints.push("Document Type: Supporting Document")
        dataPoints.push("Date: 05/15/2025")
      }

      extractionData[file] = dataPoints
    })

    // Simulate progressive data extraction
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex >= files.length) {
        clearInterval(interval)
        return
      }

      setActiveFileIndex(currentIndex)
      currentIndex++
    }, 2000)

    setExtractedData(extractionData)

    return () => clearInterval(interval)
  }, [files])

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-white shadow-lg">
      {/* Particle background */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Central AI node */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Cpu className="h-10 w-10 text-white" />
          </div>

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="absolute -inset-4 rounded-full border-4 border-blue-400/30"
          />

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 0.5,
            }}
            className="absolute -inset-8 rounded-full border-4 border-purple-400/20"
          />
        </div>
      </motion.div>

      {/* Document nodes */}
      {files.map((file, index) => {
        // Calculate position around the circle
        const angle = (index / files.length) * Math.PI * 2
        const radius = Math.min(dimensions.width, dimensions.height) * 0.35
        const x = Math.cos(angle) * radius + dimensions.width / 2
        const y = Math.sin(angle) * radius + dimensions.height / 2

        const isActive = index <= activeFileIndex
        const isCurrentlyActive = index === activeFileIndex

        return (
          <motion.div
            key={file}
            initial={{ opacity: 0, x, y }}
            animate={{
              opacity: 1,
              x,
              y,
              scale: isCurrentlyActive ? 1.1 : 1,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
            }}
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  boxShadow: isCurrentlyActive ? "0 0 20px rgba(59, 130, 246, 0.5)" : "0 0 0px rgba(59, 130, 246, 0)",
                }}
                className={`w-16 h-16 rounded-lg ${
                  isActive ? "bg-white" : "bg-gray-100"
                } flex items-center justify-center shadow-md`}
              >
                {isActive && isComplete ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : (
                  <FileText className={`h-8 w-8 ${isActive ? "text-blue-500" : "text-gray-400"}`} />
                )}
              </motion.div>

              <p className="mt-2 text-sm font-medium text-gray-700 max-w-[120px] text-center truncate">{file}</p>

              {/* Connection line to center */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 left-1/2 w-[200px] h-0 border-t-2 border-dashed border-blue-300 z-0"
                  style={{
                    width: radius,
                    transform: `rotate(${angle + Math.PI}rad)`,
                    transformOrigin: "left center",
                  }}
                />
              )}

              {/* Extracted data */}
              {isCurrentlyActive && extractedData[file] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute mt-2 bg-white rounded-lg shadow-lg p-3 w-[200px] z-30"
                  style={{
                    left: angle > Math.PI ? "-220px" : "20px",
                    top: "0px",
                  }}
                >
                  <p className="text-xs font-semibold text-gray-500 mb-2">Extracted Data:</p>
                  <ul className="space-y-1">
                    {extractedData[file].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.1 }}
                        className="text-xs text-gray-700"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        )
      })}

      {/* Processing status */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-2 shadow-lg z-30">
        <p className="text-sm font-medium text-gray-700">
          {isComplete ? (
            <span className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              Processing Complete
            </span>
          ) : (
            <span className="flex items-center text-blue-600">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mr-2"
              >
                <Cpu className="h-4 w-4" />
              </motion.span>
              Processing Documents...
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}
