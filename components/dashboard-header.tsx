import { Activity, Zap } from "lucide-react"
import { UnreppedLogo } from "@/components/unrepped-logo"

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="flex items-center gap-3">
        <UnreppedLogo className="h-10" textColor="text-white" />
        <div>
          <h1 className="text-2xl font-bold">Lender Mission Control</h1>
          <p className="text-slate-400">Monitoring multiple applications in real-time</p>
        </div>
      </div>

      <div className="flex gap-4 mt-4 md:mt-0">
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg">
          <Activity size={18} className="text-green-400" />
          <span>8 Active Applications</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg">
          <Zap size={18} className="text-yellow-400" />
          <span>Real-time Mode</span>
        </div>
      </div>
    </div>
  )
}
