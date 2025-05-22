"use client"

import { Play, Pause, RefreshCw, LayoutGrid, Columns } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardControlsProps {
  isSimulating: boolean
  onToggleSimulation: () => void
  onResetSimulation: () => void
}

export function DashboardControls({ isSimulating, onToggleSimulation, onResetSimulation }: DashboardControlsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6 p-3 bg-slate-800 rounded-lg">
      <Button variant="outline" size="sm" onClick={onToggleSimulation} className="flex items-center gap-2">
        {isSimulating ? (
          <>
            <Pause size={16} />
            <span>Pause Simulation</span>
          </>
        ) : (
          <>
            <Play size={16} />
            <span>Resume Simulation</span>
          </>
        )}
      </Button>

      <Button variant="outline" size="sm" onClick={onResetSimulation} className="flex items-center gap-2">
        <RefreshCw size={16} />
        <span>Reset All</span>
      </Button>

      <div className="ml-auto flex gap-2">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <LayoutGrid size={16} />
          <span className="hidden sm:inline">Grid View</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Columns size={16} />
          <span className="hidden sm:inline">Split View</span>
        </Button>
      </div>
    </div>
  )
}
