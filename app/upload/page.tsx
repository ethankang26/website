"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Upload, CheckCircle, Shield, Sparkles, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocumentUploader } from "@/components/document-uploader"
import { DocumentVerification } from "@/components/document-verification"
import { AIProcessingVisual } from "@/components/ai-processing-visual"
import Link from "next/link"

export default function UploadPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [1, 1, 0.8, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [1, 0.98, 0.95, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0, 20, 40, 60])

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [processingComplete, setProcessingComplete] = useState(false)

  const handleFilesUploaded = (files: string[]) => {
    setUploadedFiles(files)

    // Simulate processing completion after 3 seconds
    setTimeout(() => {
      setProcessingComplete(true)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white text-black" ref={containerRef}>
      {/* Navigation header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <h2 className="text-lg font-medium">Document Upload</h2>
          <div className="w-[100px]"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Hero Section */}
      <motion.div
        className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-16"
        style={{ opacity, scale, y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
            Document Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your mortgage documents and let our AI handle the rest. Seamless, secure, and lightning fast.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white rounded-full px-8 h-14 text-lg"
              onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              Upload Documents <Upload className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full px-8 h-14 text-lg"
              >
                View Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-400 to-purple-400 blur-3xl -z-10"
        />
      </motion.div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Reimagining Mortgage Processing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our AI-powered platform transforms complex documents into actionable data in seconds.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-blue-500" />,
                title: "Bank-Level Security",
                description: "Your documents are encrypted and protected with the highest security standards.",
              },
              {
                icon: <Sparkles className="h-8 w-8 text-purple-500" />,
                title: "AI-Powered Analysis",
                description: "Our advanced AI extracts and verifies information with incredible accuracy.",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-green-500" />,
                title: "Instant Verification",
                description: "Get immediate feedback on document completeness and validity.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div id="upload-section" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Upload Your Documents</h2>
                  <p className="text-gray-300 mb-8">
                    Drag and drop your mortgage documents or browse your files. We support PDF, JPG, and PNG formats.
                  </p>

                  <div className="space-y-4">
                    {["Loan Application", "Income Verification", "Property Documents", "Bank Statements"].map(
                      (doc, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm">
                            {i + 1}
                          </div>
                          <span className="text-gray-200">{doc}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <DocumentUploader onFilesUploaded={handleFilesUploaded} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Processing Section */}
      {uploadedFiles.length > 0 && (
        <div className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Processing Your Documents</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI is analyzing your documents and extracting relevant information.
              </p>
            </motion.div>

            <AIProcessingVisual files={uploadedFiles} isComplete={processingComplete} />

            {processingComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-16 text-center"
              >
                <DocumentVerification files={uploadedFiles} />

                <div className="mt-12">
                  <Link href="/">
                    <Button size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-8 h-14 text-lg">
                      Return to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Floating back button */}
      <div className="fixed bottom-8 left-8 z-50">
        <Link href="/">
          <div className="bg-black hover:bg-gray-800 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors">
            <ArrowLeft size={24} />
          </div>
        </Link>
      </div>
    </div>
  )
}
