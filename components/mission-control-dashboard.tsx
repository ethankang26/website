"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LenderTile } from "@/components/lender-tile"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardControls } from "@/components/dashboard-controls"

// Sample lender data
const lenders = [
  {
    id: 1,
    name: "Rocket Mortgage",
    logo: "/images/rocket-logo.png",
    currentStep: 1,
    totalSteps: 5,
    stepName: "Personal Information",
    status: "in-progress",
  },
  {
    id: 2,
    name: "SoFi",
    logo: "/images/sofi-logo.png",
    currentStep: 1,
    totalSteps: 5,
    stepName: "Personal Information",
    status: "in-progress",
  },
  {
    id: 3,
    name: "Better",
    logo: "/images/better-logo.png",
    currentStep: 1,
    totalSteps: 5,
    stepName: "Personal Information",
    status: "in-progress",
  },
  {
    id: 4,
    name: "Quicken Loans",
    logo: "/images/quicken-logo.png",
    currentStep: 1,
    totalSteps: 5,
    stepName: "Personal Information",
    status: "in-progress",
  },
  {
    id: 5,
    name: "LoanDepot",
    logo: "/images/loandepot-logo.png",
    currentStep: 1,
    totalSteps: 5,
    stepName: "Personal Information",
    status: "in-progress",
  },
  {
    id: 6,
    name: "Chase",
    logo: "/images/chase-logo.png",
    currentStep: 1,
    totalSteps: 5,
    stepName: "Personal Information",
    status: "in-progress",
  },
  {
    id: 7,
    name: "Bank of America",
    logo: "/images/boa-logo.png",
    currentStep: 1,
    totalSteps: 5,
    stepName: "Personal Information",
    status: "in-progress",
  },
  {
    id: 8,
    name: "Wells Fargo",
    logo: "/images/wellsfargo-logo.png",
    currentStep: 1,
    totalSteps: 5,
    stepName: "Personal Information",
    status: "in-progress",
  },
]

export function MissionControlDashboard() {
  const [activeLenders, setActiveLenders] = useState(lenders)
  const [isSimulating, setIsSimulating] = useState(true)

  // Simulate progress updates
  useEffect(() => {
    if (!isSimulating) return

    const interval = setInterval(() => {
      setActiveLenders((current) =>
        current.map((lender) => {
          // Randomly update some lenders
          if (Math.random() > 0.7) {
            const newStep = Math.min(lender.currentStep + 1, lender.totalSteps)
            let newStatus = lender.status

            if (newStep === lender.totalSteps) {
              newStatus = "success" // Always set to success, never error
            }

            return {
              ...lender,
              currentStep: newStep,
              status: newStatus,
              stepName: getStepName(newStep),
            }
          }
          return lender
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [isSimulating])

  const getStepName = (step: number) => {
    const steps = ["Personal Information", "Income Verification", "Property Details", "Review & Submit", "Confirmation"]
    return steps[step - 1]
  }

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating)
  }

  const resetSimulation = () => {
    setActiveLenders(
      lenders.map((lender) => ({
        ...lender,
        currentStep: 1,
        stepName: "Personal Information",
        status: "in-progress",
      })),
    )
    setIsSimulating(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <DashboardControls
        isSimulating={isSimulating}
        onToggleSimulation={toggleSimulation}
        onResetSimulation={resetSimulation}
      />

      <div className="bg-slate-800 rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-indigo-600 p-2 rounded-lg mr-3">
            <span className="text-white font-bold">U</span>
          </div>
          <div>
            <h2 className="font-medium">Unrepped AI Processing</h2>
            <p className="text-sm text-slate-400">Automating mortgage applications across multiple lenders</p>
          </div>
        </div>
        <div className="text-sm text-slate-400">
          Powered by <span className="text-indigo-400 font-medium">Unrepped</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
      >
        {activeLenders.map((lender) => (
          <LenderTile key={lender.id} lender={lender} />
        ))}
      </motion.div>
    </div>
  )
}
