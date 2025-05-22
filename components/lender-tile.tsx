"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, FileText, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BrowserSimulation } from "@/components/browser-simulation"

interface Lender {
  id: number
  name: string
  logo: string
  currentStep: number
  totalSteps: number
  stepName: string
  status: string
}

interface LenderTileProps {
  lender: Lender
}

export function LenderTile({ lender }: LenderTileProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  // Simulate typing animation
  useEffect(() => {
    if (lender.status === "in-progress") {
      const typingInterval = setInterval(() => {
        setIsTyping((prev) => !prev)
      }, 2000)

      return () => clearInterval(typingInterval)
    } else {
      setIsTyping(false)
    }
  }, [lender.status])

  const getStatusBadge = () => {
    switch (lender.status) {
      case "success":
        return (
          <div className="flex items-center gap-1 text-green-400">
            <CheckCircle size={16} />
            <span>Success</span>
          </div>
        )
      case "in-progress":
      default:
        return (
          <div className="flex items-center gap-1 text-yellow-400">
            <Clock size={16} />
            <span>In Progress</span>
          </div>
        )
    }
  }

  // Get lender-specific progress bar color
  const getProgressColor = () => {
    switch (lender.name) {
      case "Rocket Mortgage":
      case "Quicken Loans":
      case "Bank of America":
      case "Wells Fargo":
        return "bg-red-500"
      case "SoFi":
        return "bg-purple-600"
      case "Chase":
        return "bg-blue-900"
      case "Better":
      case "LoanDepot":
        return "bg-blue-600"
      default:
        return ""
    }
  }

  const progressPercentage = (lender.currentStep / lender.totalSteps) * 100

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-lg ${
        isExpanded ? "col-span-2 row-span-2" : ""
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center p-1">
              <img
                src={lender.logo || "/placeholder.svg"}
                alt={`${lender.name} logo`}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=32&width=32"
                }}
              />
            </div>
            <div>
              <h3 className="font-medium">{lender.name}</h3>
              {getStatusBadge()}
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsExpanded(!isExpanded)}>
              <Play size={16} />
              <span className="sr-only">Replay</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <FileText size={16} />
              <span className="sr-only">View Logs</span>
            </Button>
          </div>
        </div>

        <BrowserSimulation lender={lender} isTyping={isTyping} isExpanded={isExpanded} />

        <div className="mt-3">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>
              Step {lender.currentStep} of {lender.totalSteps}: {lender.stepName}
            </span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" indicatorClassName={getProgressColor()} />
        </div>
      </div>
    </motion.div>
  )
}
