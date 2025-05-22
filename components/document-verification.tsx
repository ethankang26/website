"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, FileText, ChevronDown, ChevronUp } from "lucide-react"

interface DocumentVerificationProps {
  files: string[]
}

export function DocumentVerification({ files }: DocumentVerificationProps) {
  const [expandedFile, setExpandedFile] = useState<string | null>(null)

  // Generate verification results for each file
  const verificationResults = files.reduce(
    (acc, file) => {
      const fileType = getFileType(file)

      // Generate verification items based on file type
      const items = generateVerificationItems(fileType)

      acc[file] = items
      return acc
    },
    {} as Record<string, VerificationItem[]>,
  )

  const toggleExpand = (file: string) => {
    if (expandedFile === file) {
      setExpandedFile(null)
    } else {
      setExpandedFile(file)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Document Verification Results</h3>
          <p className="text-gray-500 mt-1">All documents have been processed and verified.</p>
        </div>

        <div className="divide-y divide-gray-100">
          {files.map((file, index) => (
            <motion.div
              key={file}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => toggleExpand(file)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{file}</h4>
                      <p className="text-sm text-gray-500">{getFileType(file)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified
                    </div>
                    {expandedFile === file ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded verification details */}
              {expandedFile === file && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4"
                >
                  <div className="ml-12 bg-gray-50 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-3">Verification Details</h5>

                    <div className="space-y-2">
                      {verificationResults[file].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          {item.status === "success" ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                          )}
                          <div>
                            <p className="text-sm text-gray-700">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface VerificationItem {
  name: string
  description: string
  status: "success" | "warning"
}

function getFileType(fileName: string): string {
  const name = fileName.toLowerCase()

  if (name.includes("application")) {
    return "Loan Application"
  } else if (name.includes("income") || name.includes("pay")) {
    return "Income Verification"
  } else if (name.includes("bank") || name.includes("statement")) {
    return "Bank Statement"
  } else if (name.includes("property") || name.includes("home")) {
    return "Property Document"
  } else if (name.includes("tax") || name.includes("return")) {
    return "Tax Return"
  } else if (name.includes("id") || name.includes("license")) {
    return "Identification Document"
  } else {
    return "Supporting Document"
  }
}

function generateVerificationItems(fileType: string): VerificationItem[] {
  switch (fileType) {
    case "Loan Application":
      return [
        {
          name: "Document Authenticity",
          description: "Document has been verified as authentic",
          status: "success",
        },
        {
          name: "Applicant Information",
          description: "All required applicant information is present",
          status: "success",
        },
        {
          name: "Signature Verification",
          description: "Digital signature has been verified",
          status: "success",
        },
      ]
    case "Income Verification":
      return [
        {
          name: "Document Authenticity",
          description: "Document has been verified as authentic",
          status: "success",
        },
        {
          name: "Income Amount",
          description: "Monthly income amount has been extracted",
          status: "success",
        },
        {
          name: "Employment Verification",
          description: "Employment details have been verified",
          status: "success",
        },
      ]
    case "Bank Statement":
      return [
        {
          name: "Document Authenticity",
          description: "Document has been verified as authentic",
          status: "success",
        },
        {
          name: "Account Verification",
          description: "Account details have been verified",
          status: "success",
        },
        {
          name: "Balance Verification",
          description: "Account balance has been extracted",
          status: "success",
        },
        {
          name: "Transaction Analysis",
          description: "Recent transactions have been analyzed",
          status: "warning",
        },
      ]
    case "Property Document":
      return [
        {
          name: "Document Authenticity",
          description: "Document has been verified as authentic",
          status: "success",
        },
        {
          name: "Property Details",
          description: "Property information has been extracted",
          status: "success",
        },
        {
          name: "Ownership Verification",
          description: "Ownership details have been verified",
          status: "success",
        },
      ]
    default:
      return [
        {
          name: "Document Authenticity",
          description: "Document has been verified as authentic",
          status: "success",
        },
        {
          name: "Content Extraction",
          description: "Document content has been extracted",
          status: "success",
        },
      ]
  }
}
