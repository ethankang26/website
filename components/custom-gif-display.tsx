"use client"

import { useState, useEffect } from "react"

export function CustomGifDisplay() {
  // This component is a placeholder for where you'll add your custom GIFs/videos
  // showing the AI bot applying to mortgage lenders

  const [currentGifIndex, setCurrentGifIndex] = useState(0)

  // This is where you would add your actual GIF URLs
  const placeholderGifs = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

  // Auto-rotate through GIFs
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGifIndex((prev) => (prev + 1) % placeholderGifs.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [placeholderGifs.length])

  return (
    <div className="relative w-full max-w-3xl rounded-lg overflow-hidden shadow-2xl">
      <div className="absolute top-4 left-4 z-10 bg-black/50 px-3 py-1 rounded-full text-white text-sm font-medium">
        Unrepped AI Bot
      </div>

      {/* This is where you'll replace with your actual GIFs */}
      <img
        src={placeholderGifs[currentGifIndex] || "/placeholder.svg"}
        alt="Unrepped AI bot applying to mortgage lenders"
        className="w-full h-auto"
      />

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {placeholderGifs.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentGifIndex ? "bg-white" : "bg-white/30"}`}
            onClick={() => setCurrentGifIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
