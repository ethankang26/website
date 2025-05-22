"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, File, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentUploaderProps {
  onFilesUploaded: (files: string[]) => void
}

export function DocumentUploader({ onFilesUploaded }: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [uploadComplete, setUploadComplete] = useState<Record<string, boolean>>({})

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(
      (file) => file.type === "application/pdf" || file.type === "image/jpeg" || file.type === "image/png",
    )

    setFiles((prev) => [...prev, ...validFiles])

    // Initialize progress for each file
    const newProgress: Record<string, number> = {}
    const newComplete: Record<string, boolean> = {}

    validFiles.forEach((file) => {
      newProgress[file.name] = 0
      newComplete[file.name] = false
    })

    setUploadProgress((prev) => ({ ...prev, ...newProgress }))
    setUploadComplete((prev) => ({ ...prev, ...newComplete }))

    // Simulate upload progress
    validFiles.forEach((file) => {
      simulateFileUpload(file.name)
    })
  }

  const simulateFileUpload = (fileName: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)

        setUploadComplete((prev) => ({ ...prev, [fileName]: true }))

        // Check if all files are uploaded
        setTimeout(() => {
          const allComplete =
            Object.values(uploadComplete).every((status) => status) &&
            Object.keys(uploadComplete).length === files.length

          if (allComplete) {
            onFilesUploaded(files.map((f) => f.name))
          }
        }, 500)
      }

      setUploadProgress((prev) => ({ ...prev, [fileName]: progress }))
    }, 200)
  }

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName))

    // Also remove from progress and complete states
    const newProgress = { ...uploadProgress }
    const newComplete = { ...uploadComplete }

    delete newProgress[fileName]
    delete newComplete[fileName]

    setUploadProgress(newProgress)
    setUploadComplete(newComplete)
  }

  const allFilesComplete = files.length > 0 && files.every((file) => uploadComplete[file.name])

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0.8, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: isDragging ? "0 0 0 3px rgba(99, 102, 241, 0.5)" : "0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
        transition={{ duration: 0.2 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full h-64 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-6 transition-colors ${
          isDragging ? "border-indigo-400 bg-indigo-50/10" : "border-gray-600 bg-gray-800/50"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
        />

        <Upload className="h-10 w-10 text-gray-400 mb-4" />
        <p className="text-gray-300 text-center mb-2">Drag and drop your documents here</p>
        <p className="text-gray-500 text-sm text-center mb-4">Supports PDF, JPG, PNG</p>

        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Browse Files
        </Button>
      </motion.div>

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-gray-300 font-medium mb-2">Uploaded Documents</h3>

          {files.map((file, index) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-lg p-3 flex items-center"
            >
              <div className="bg-gray-700 rounded p-2 mr-3">
                <File className="h-5 w-5 text-gray-300" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-gray-300 text-sm truncate">{file.name}</p>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${uploadProgress[file.name] || 0}%` }}
                    className={`h-1.5 rounded-full ${uploadComplete[file.name] ? "bg-green-500" : "bg-indigo-500"}`}
                  />
                </div>
              </div>

              <div className="ml-3 flex items-center">
                {uploadComplete[file.name] ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <p className="text-gray-400 text-sm mr-2">{Math.round(uploadProgress[file.name] || 0)}%</p>
                )}

                <button onClick={() => removeFile(file.name)} className="ml-2 text-gray-400 hover:text-gray-200">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}

          {allFilesComplete && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center">
              <p className="text-green-400 mb-2">All files uploaded successfully!</p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
