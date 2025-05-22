import { cn } from "@/lib/utils"
import Image from "next/image"

interface UnreppedLogoProps {
  className?: string
  textColor?: string
}

export function UnreppedLogo({ className }: UnreppedLogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/unrepped-logo.png"
        alt="Unrepped Logo"
        width={300}
        height={80}
        className="w-auto h-full"
        priority
      />
    </div>
  )
}
