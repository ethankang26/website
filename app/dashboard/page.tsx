"use client"

import { useState, useEffect } from "react"
import { MissionControlDashboard } from "@/components/mission-control-dashboard"
import { CustomGifDisplay } from "@/components/custom-gif-display"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { UnreppedLogo } from "@/components/unrepped-logo"
import Link from "next/link"

export default function DashboardPage() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    // Auto-hide the intro after 5 seconds
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {showIntro ? (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
          <div className="mb-6">
            <UnreppedLogo className="h-12 w-auto text-white" textColor="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">AI Bot Processing Your Applications</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl text-center">
            Watch as our AI bot applies to multiple mortgage lenders simultaneously in real-time.
          </p>

          <CustomGifDisplay />

          <Button className="mt-8 bg-indigo-600 hover:bg-indigo-700" onClick={() => setShowIntro(false)}>
            Continue to Dashboard
          </Button>
        </div>
      ) : null}

      <MissionControlDashboard />

      {/* Back button */}
      <div className="fixed bottom-8 left-8">
        <Link href="/">
          <div className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors">
            <ArrowLeft size={24} />
          </div>
        </Link>
      </div>
    </div>
  )
}
