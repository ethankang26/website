"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentUploaderProps {
  onFilesUploaded: (files: string[]) => void
}

export function DocumentUploader({ onFilesUploaded }: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [uploadComplete, setUploadComplete] = useState<Record<string, boolean>>({})
  const [invalidFiles, setInvalidFiles] = useState<string[]>([])
  const [showMaxFilesWarning, setShowMaxFilesWarning] = useState(false)
  const MAX_FILES = 10

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

  const isValidFileType = (file: File) => {
    return file.type === "application/pdf" || file.type === "image/jpeg" || file.type === "image/png"
  }

  const handleFiles = (newFiles: File[]) => {
    // Check if adding new files would exceed the limit
    if (files.length + newFiles.length > MAX_FILES) {
      setShowMaxFilesWarning(true)
      setTimeout(() => setShowMaxFilesWarning(false), 5000)
      // Only take the first N files that would fit under the limit
      newFiles = newFiles.slice(0, MAX_FILES - files.length)
    }

    const validFiles = newFiles.filter(isValidFileType)
    const invalidFileNames = newFiles.filter(file => !isValidFileType(file)).map(file => file.name)
    
    if (invalidFileNames.length > 0) {
      setInvalidFiles(invalidFileNames)
      setTimeout(() => setInvalidFiles([]), 5000)
    }

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
        <p className="text-gray-500 text-sm text-center mb-4">Supports PDF, JPG, PNG (Max {MAX_FILES} files)</p>

        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
          disabled={files.length >= MAX_FILES}
        >
          Browse Files
        </Button>
      </motion.div>

      {showMaxFilesWarning && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-2"
        >
          <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-500 font-medium text-sm">Maximum files reached</p>
            <p className="text-yellow-400 text-sm mt-1">
              You can upload a maximum of {MAX_FILES} files. Some files were not added.
            </p>
          </div>
        </motion.div>
      )}

      {invalidFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2"
        >
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-red-500 font-medium text-sm">Invalid file type{invalidFiles.length > 1 ? 's' : ''}</p>
            <p className="text-red-400 text-sm mt-1">
              {invalidFiles.join(', ')} {invalidFiles.length > 1 ? 'are' : 'is'} not supported. Please use PDF, JPG, or PNG files only.
            </p>
          </div>
        </motion.div>
      )}

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
