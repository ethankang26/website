"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, CheckCircle, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocumentUploader } from "@/components/document-uploader"
import { UnreppedLogo } from "@/components/unrepped-logo"
import Link from "next/link"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [1, 1, 0.8, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [1, 0.98, 0.95, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0, 20, 40, 60])

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [processingStarted, setProcessingStarted] = useState(false)

  const handleFilesUploaded = (files: string[]) => {
    setUploadedFiles(files)
  }

  const startProcessing = () => {
    if (uploadedFiles.length > 0) {
      setProcessingStarted(true)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black" ref={containerRef}>
      {/* Header with logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="transition-transform duration-200 hover:scale-105">
              <UnreppedLogo className="h-12 w-auto" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="text-gray-600 hover:text-gray-900 font-medium relative group cursor-pointer"
            >
              Features
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </button>
            <button
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="text-gray-600 hover:text-gray-900 font-medium relative group cursor-pointer"
            >
              Upload
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </button>
            <Button variant="outline" className="ml-2 transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 bg-white font-medium text-gray-800">
              Contact Us
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <motion.div
        className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20"
        style={{ opacity, scale, y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <UnreppedLogo className="h-16 w-auto" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 leading-tight py-1">
            Mortgage Automation
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your mortgage documents and watch our AI apply to multiple lenders simultaneously.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-14 text-lg"
              onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 blur-3xl -z-10"
        />
      </motion.div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Unrepped: One Upload, Multiple Applications
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our AI-powered platform applies to multiple mortgage lenders simultaneously, saving you time and effort.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-indigo-500" />,
                title: "Secure Processing",
                description: "Your documents are encrypted and protected with the highest security standards.",
              },
              {
                icon: <Sparkles className="h-8 w-8 text-indigo-500" />,
                title: "AI-Powered Applications",
                description: "Our advanced AI completes applications with incredible accuracy and speed.",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-indigo-500" />,
                title: "Real-time Monitoring",
                description: "Watch as our system applies to multiple lenders in real-time.",
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
                <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
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
            className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-3xl overflow-hidden shadow-2xl"
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
                          <div className="w-6 h-6 rounded-full bg-indigo-700 flex items-center justify-center text-white text-sm">
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

              {uploadedFiles.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-14 text-lg"
                      onClick={startProcessing}
                    >
                      Start Processing <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <UnreppedLogo className="h-6 w-auto text-white" />
              <p className="mt-1 text-gray-400">Revolutionizing mortgage applications</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-base font-semibold mb-2">Company</h3>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold mb-2">Resources</h3>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold mb-2">Legal</h3>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Unrepped. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
