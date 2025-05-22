"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Check, ChevronDown, ChevronRight, CreditCard, Home, User } from "lucide-react"

interface BrowserSimulationProps {
  lender: {
    name: string
    status: string
    currentStep: number
    id: number
  }
  isTyping: boolean
  isExpanded: boolean
}

export function BrowserSimulation({ lender, isTyping, isExpanded }: BrowserSimulationProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 })
  const [currentField, setCurrentField] = useState("name")

  // Simulate cursor movement
  useEffect(() => {
    if (lender.status !== "in-progress") return

    const interval = setInterval(() => {
      const fields = {
        name: { x: 150, y: 50 },
        email: { x: 150, y: 80 },
        phone: { x: 150, y: 110 },
        address: { x: 150, y: 140 },
        income: { x: 150, y: 170 },
      }

      const fieldKeys = Object.keys(fields)
      const currentIndex = fieldKeys.indexOf(currentField)
      const nextIndex = (currentIndex + 1) % fieldKeys.length
      const nextField = fieldKeys[nextIndex] as keyof typeof fields

      setCursorPosition(fields[nextField])
      setCurrentField(nextField)
    }, 4000)

    return () => clearInterval(interval)
  }, [lender.status, currentField])

  // Get lender-specific styling and content
  const lenderStyle = getLenderStyle(lender.name)
  const formTitle = getFormTitle(lender.currentStep, lender.name)

  return (
    <div className={`relative ${lenderStyle.bgColor} rounded-md overflow-hidden ${isExpanded ? "h-80" : "h-40"}`}>
      {/* Browser chrome */}
      <div className="bg-slate-200 h-6 flex items-center px-2 gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        <div className="ml-4 bg-slate-100 rounded h-4 w-full max-w-64 text-xs text-slate-500 px-2 truncate flex items-center">
          {lenderStyle.url}
        </div>
      </div>

      {/* Browser content */}
      <div className={`p-3 relative ${lenderStyle.textColor}`}>
        {/* Lender-specific header */}
        {lenderStyle.showHeader && (
          <div
            className={`absolute top-0 left-0 right-0 h-8 ${lenderStyle.headerColor} flex items-center px-3 text-white text-xs font-medium`}
          >
            {lender.name} {lenderStyle.headerText}
          </div>
        )}

        <div className={`text-sm font-medium mb-2 ${lenderStyle.showHeader ? "mt-8" : ""} ${lenderStyle.titleColor}`}>
          {formTitle}
        </div>

        {/* Progress steps for some lenders */}
        {lenderStyle.showProgressSteps && (
          <div className="flex mb-3 text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`flex items-center ${i < lender.currentStep ? lenderStyle.activeStepColor : "text-gray-400"}`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center mr-1 ${
                    i < lender.currentStep ? lenderStyle.activeStepBg : "bg-gray-100"
                  }`}
                >
                  {i < lender.currentStep ? <Check size={12} /> : i + 1}
                </div>
                {i < 4 && <ChevronRight size={12} className="mx-1 text-gray-300" />}
              </div>
            ))}
          </div>
        )}

        {/* Form fields - customized per lender */}
        <div className="space-y-2 text-xs">{renderFormFields(lender.name, currentField, isTyping)}</div>

        {/* Lender-specific UI elements */}
        {lenderStyle.showExtraUI && (
          <div className={`absolute bottom-2 right-2 ${lenderStyle.buttonColor} text-white text-xs px-3 py-1 rounded`}>
            {lenderStyle.buttonText}
          </div>
        )}

        {/* Animated cursor */}
        {lender.status === "in-progress" && (
          <motion.div
            className="absolute w-3 h-3 bg-blue-500 rounded-full opacity-70 z-10"
            animate={{
              x: cursorPosition.x,
              y: cursorPosition.y,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </div>
  )
}

// Helper function to get lender-specific styling
function getLenderStyle(lenderName: string) {
  const defaultStyle = {
    bgColor: "bg-white",
    textColor: "text-black",
    titleColor: "text-gray-800",
    url: "apply.lender.com/mortgage",
    showHeader: false,
    headerColor: "bg-blue-600",
    headerText: "Mortgage Application",
    showProgressSteps: false,
    activeStepColor: "text-blue-600",
    activeStepBg: "bg-blue-100",
    showExtraUI: false,
    buttonColor: "bg-blue-600",
    buttonText: "Continue",
  }

  switch (lenderName) {
    case "Rocket Mortgage":
      return {
        ...defaultStyle,
        bgColor: "bg-gray-50",
        url: "www.rocketmortgage.com/apply",
        showHeader: true,
        headerColor: "bg-red-600",
        headerText: "Rocket Mortgage Application",
        showProgressSteps: true,
        activeStepColor: "text-red-600",
        activeStepBg: "bg-red-100",
        showExtraUI: true,
        buttonColor: "bg-red-600",
        buttonText: "Rocket Ahead",
      }
    case "SoFi":
      return {
        ...defaultStyle,
        bgColor: "bg-purple-50",
        textColor: "text-gray-800",
        titleColor: "text-purple-800",
        url: "www.sofi.com/mortgage/apply",
        showHeader: true,
        headerColor: "bg-purple-700",
        headerText: "Home Loans",
        showExtraUI: true,
        buttonColor: "bg-purple-700",
        buttonText: "Next Step",
      }
    case "Better":
      return {
        ...defaultStyle,
        bgColor: "bg-blue-50",
        textColor: "text-gray-900",
        titleColor: "text-blue-900",
        url: "better.com/mortgage/apply",
        showProgressSteps: true,
        activeStepColor: "text-blue-700",
        activeStepBg: "bg-blue-100",
        showExtraUI: true,
        buttonColor: "bg-blue-700",
        buttonText: "Continue",
      }
    case "Quicken Loans":
      return {
        ...defaultStyle,
        bgColor: "bg-white",
        textColor: "text-gray-800",
        titleColor: "text-red-700",
        url: "www.quickenloans.com/apply",
        showHeader: true,
        headerColor: "bg-red-700",
        headerText: "Mortgage Application",
        showExtraUI: true,
        buttonColor: "bg-red-700",
        buttonText: "Save & Continue",
      }
    case "LoanDepot":
      return {
        ...defaultStyle,
        bgColor: "bg-blue-50",
        textColor: "text-gray-800",
        titleColor: "text-blue-800",
        url: "www.loandepot.com/mortgage/apply",
        showHeader: true,
        headerColor: "bg-blue-800",
        headerText: "Home Loan Application",
        showExtraUI: true,
        buttonColor: "bg-blue-800",
        buttonText: "Submit",
      }
    case "Chase":
      return {
        ...defaultStyle,
        bgColor: "bg-white",
        textColor: "text-gray-900",
        titleColor: "text-blue-900",
        url: "apply.chase.com/mortgage",
        showHeader: true,
        headerColor: "bg-blue-900",
        headerText: "Chase Home Lending",
        showProgressSteps: true,
        activeStepColor: "text-blue-900",
        activeStepBg: "bg-blue-100",
        showExtraUI: true,
        buttonColor: "bg-blue-900",
        buttonText: "Continue",
      }
    case "Bank of America":
      return {
        ...defaultStyle,
        bgColor: "bg-red-50",
        textColor: "text-gray-900",
        titleColor: "text-red-900",
        url: "www.bankofamerica.com/mortgage/apply",
        showHeader: true,
        headerColor: "bg-red-900",
        headerText: "Home Loans",
        showExtraUI: true,
        buttonColor: "bg-red-900",
        buttonText: "Next",
      }
    case "Wells Fargo":
      return {
        ...defaultStyle,
        bgColor: "bg-red-50",
        textColor: "text-gray-900",
        titleColor: "text-red-800",
        url: "www.wellsfargo.com/mortgage/apply",
        showHeader: true,
        headerColor: "bg-red-800",
        headerText: "Home Mortgage",
        showProgressSteps: true,
        activeStepColor: "text-red-800",
        activeStepBg: "bg-red-100",
        showExtraUI: true,
        buttonColor: "bg-red-800",
        buttonText: "Continue Application",
      }
    default:
      return defaultStyle
  }
}

// Helper function to get form title based on step and lender
function getFormTitle(step: number, lenderName: string) {
  const defaultTitles = [
    "Personal Information",
    "Income Verification",
    "Property Details",
    "Review & Submit",
    "Confirmation",
  ]

  // Customize titles for specific lenders
  const lenderTitles: Record<string, string[]> = {
    "Rocket Mortgage": [
      "Tell Us About Yourself",
      "Income & Employment",
      "Property Information",
      "Review Your Application",
      "Application Complete!",
    ],
    SoFi: ["Your Information", "Verify Your Income", "Property Details", "Final Review", "Application Submitted"],
    Chase: [
      "Personal Details",
      "Employment Information",
      "Property Information",
      "Review Application",
      "Submission Confirmed",
    ],
  }

  const titles = lenderTitles[lenderName] || defaultTitles
  return titles[step - 1] || "Application Form"
}

// Helper function to render form fields based on lender
function renderFormFields(lenderName: string, currentField: string, isTyping: boolean) {
  // Default form fields
  const defaultFields = (
    <>
      <FormField
        label="Full Name"
        value={currentField === "name" && isTyping ? "John Doe|" : "John Doe"}
        isActive={currentField === "name"}
      />
      <FormField
        label="Email"
        value={currentField === "email" && isTyping ? "john.doe@example.com|" : "john.doe@example.com"}
        isActive={currentField === "email"}
      />
      <FormField
        label="Phone"
        value={currentField === "phone" && isTyping ? "(555) 123-4567|" : "(555) 123-4567"}
        isActive={currentField === "phone"}
      />
      <FormField
        label="Address"
        value={currentField === "address" && isTyping ? "123 Main St, Anytown, US|" : "123 Main St, Anytown, US"}
        isActive={currentField === "address"}
      />
      <FormField
        label="Annual Income"
        value={currentField === "income" && isTyping ? "$85,000|" : "$85,000"}
        isActive={currentField === "income"}
      />
    </>
  )

  // Lender-specific form fields
  switch (lenderName) {
    case "Rocket Mortgage":
      return (
        <>
          <div className="flex gap-2 items-center mb-2">
            <User size={14} className="text-red-600" />
            <span className="font-medium text-red-600">Personal Details</span>
          </div>
          <FormField
            label="Full Name"
            value={currentField === "name" && isTyping ? "John Doe|" : "John Doe"}
            isActive={currentField === "name"}
            style="rounded-lg border-red-200 bg-white"
            labelStyle="text-red-700"
          />
          <FormField
            label="Email Address"
            value={currentField === "email" && isTyping ? "john.doe@example.com|" : "john.doe@example.com"}
            isActive={currentField === "email"}
            style="rounded-lg border-red-200 bg-white"
            labelStyle="text-red-700"
          />
          <FormField
            label="Phone Number"
            value={currentField === "phone" && isTyping ? "(555) 123-4567|" : "(555) 123-4567"}
            isActive={currentField === "phone"}
            style="rounded-lg border-red-200 bg-white"
            labelStyle="text-red-700"
          />
        </>
      )
    case "SoFi":
      return (
        <>
          <div className="flex gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-purple-700 text-white flex items-center justify-center text-xs">
              1
            </div>
            <span className="font-medium text-purple-700">Your Information</span>
          </div>
          <FormField
            label="Legal Name"
            value={currentField === "name" && isTyping ? "John Doe|" : "John Doe"}
            isActive={currentField === "name"}
            style="rounded-md border-purple-200 bg-white shadow-sm"
            labelStyle="text-purple-700"
          />
          <FormField
            label="Email"
            value={currentField === "email" && isTyping ? "john.doe@example.com|" : "john.doe@example.com"}
            isActive={currentField === "email"}
            style="rounded-md border-purple-200 bg-white shadow-sm"
            labelStyle="text-purple-700"
          />
          <FormField
            label="Mobile Phone"
            value={currentField === "phone" && isTyping ? "(555) 123-4567|" : "(555) 123-4567"}
            isActive={currentField === "phone"}
            style="rounded-md border-purple-200 bg-white shadow-sm"
            labelStyle="text-purple-700"
          />
        </>
      )
    case "Chase":
      return (
        <>
          <div className="flex items-center gap-2 mb-3 bg-blue-50 p-2 rounded-md">
            <Home size={14} className="text-blue-900" />
            <span className="text-blue-900 font-medium">Home Purchase Application</span>
          </div>
          <FormField
            label="Applicant Name"
            value={currentField === "name" && isTyping ? "John Doe|" : "John Doe"}
            isActive={currentField === "name"}
            style="rounded-md border-blue-200 bg-white"
            labelStyle="text-blue-900"
          />
          <FormField
            label="Contact Email"
            value={currentField === "email" && isTyping ? "john.doe@example.com|" : "john.doe@example.com"}
            isActive={currentField === "email"}
            style="rounded-md border-blue-200 bg-white"
            labelStyle="text-blue-900"
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <FormField
                label="Phone"
                value={currentField === "phone" && isTyping ? "(555) 123-4567|" : "(555) 123-4567"}
                isActive={currentField === "phone"}
                style="rounded-md border-blue-200 bg-white"
                labelStyle="text-blue-900"
              />
            </div>
            <div className="flex-1">
              <FormField
                label="ZIP Code"
                value="90210"
                isActive={false}
                style="rounded-md border-blue-200 bg-white"
                labelStyle="text-blue-900"
              />
            </div>
          </div>
        </>
      )
    case "Bank of America":
      return (
        <>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={14} className="text-red-900" />
            <span className="text-red-900 font-medium">Applicant Information</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <FormField
                label="First Name"
                value="John"
                isActive={currentField === "name"}
                style="rounded-md border-red-200 bg-white"
                labelStyle="text-red-900"
              />
            </div>
            <div className="flex-1">
              <FormField
                label="Last Name"
                value={currentField === "name" && isTyping ? "Doe|" : "Doe"}
                isActive={currentField === "name"}
                style="rounded-md border-red-200 bg-white"
                labelStyle="text-red-900"
              />
            </div>
          </div>
          <FormField
            label="Email Address"
            value={currentField === "email" && isTyping ? "john.doe@example.com|" : "john.doe@example.com"}
            isActive={currentField === "email"}
            style="rounded-md border-red-200 bg-white"
            labelStyle="text-red-900"
          />
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <FormField
                label="Phone Number"
                value={currentField === "phone" && isTyping ? "(555) 123-4567|" : "(555) 123-4567"}
                isActive={currentField === "phone"}
                style="rounded-md border-red-200 bg-white"
                labelStyle="text-red-900"
              />
            </div>
            <div className="flex items-center h-8 text-red-900">
              <span>Mobile</span>
              <ChevronDown size={14} className="ml-1" />
            </div>
          </div>
        </>
      )
    case "Wells Fargo":
      return (
        <>
          <div className="bg-red-100 p-2 rounded-md mb-3 text-red-800 font-medium">Please provide your information</div>
          <div className="flex gap-2">
            <div className="flex-1">
              <FormField
                label="First Name"
                value="John"
                isActive={currentField === "name"}
                style="rounded-md border-red-300 bg-white"
                labelStyle="text-red-800"
              />
            </div>
            <div className="flex-1">
              <FormField
                label="Last Name"
                value={currentField === "name" && isTyping ? "Doe|" : "Doe"}
                isActive={currentField === "name"}
                style="rounded-md border-red-300 bg-white"
                labelStyle="text-red-800"
              />
            </div>
          </div>
          <FormField
            label="Email"
            value={currentField === "email" && isTyping ? "john.doe@example.com|" : "john.doe@example.com"}
            isActive={currentField === "email"}
            style="rounded-md border-red-300 bg-white"
            labelStyle="text-red-800"
          />
          <FormField
            label="Phone"
            value={currentField === "phone" && isTyping ? "(555) 123-4567|" : "(555) 123-4567"}
            isActive={currentField === "phone"}
            style="rounded-md border-red-300 bg-white"
            labelStyle="text-red-800"
          />
        </>
      )
    default:
      return defaultFields
  }
}

interface FormFieldProps {
  label: string
  value: string
  isActive: boolean
  style?: string
  labelStyle?: string
}

function FormField({
  label,
  value,
  isActive,
  style = "border-slate-200",
  labelStyle = "text-slate-500",
}: FormFieldProps) {
  return (
    <div className={`flex flex-col ${isActive ? "opacity-100" : "opacity-80"}`}>
      <label className={`text-xs ${labelStyle}`}>{label}</label>
      <div className={`border px-2 py-1 text-xs ${isActive ? "border-blue-400 bg-blue-50" : style}`}>{value}</div>
    </div>
  )
}
