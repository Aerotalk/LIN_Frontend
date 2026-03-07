"use client"

import React, { useState } from "react"
import { useSignup } from "@/hooks/useSignup"
import { Step1PhoneVerification } from "@/components/signup/Step1PhoneVerification"
import { Step2PersonalDetails } from "@/components/signup/Step2PersonalDetails"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAffiliate } from "@/hooks/useAffiliate"
import {
  PhoneVerificationData,
  PersonalDetailsData,
} from "@/lib/types"

export const dynamic = "force-dynamic";

interface Step {
  id: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { id: 1, title: "Verifying number", description: "Sign Up & Get Loan Offers in Minutes" },
  { id: 2, title: "Creating account", description: "Get Instant Financial Support You Can Rely On" },
]

import { Suspense } from "react"
import { Loader2 } from "lucide-react"

function SignupContent() {
  const { getLinkWithRef } = useAffiliate();
  const {
    currentStep,
    formData,
    isLoading,
    error,
    setCurrentStep,
    updateFormData,
    submitStep,
  } = useSignup()

  const [otpSent, setOtpSent] = useState<boolean>(false)
  const [otpResendTimer, setOtpResendTimer] = useState<number>(0)

  const progress = (currentStep / STEPS.length) * 100

  const handleNext = (): void => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePhoneSubmit = async (data: PhoneVerificationData): Promise<void> => {
    updateFormData('phoneVerification', data)
    const success = await submitStep(1, data)
    if (success) {
      setOtpSent(true)
      setOtpResendTimer(30)
      startTimer(setOtpResendTimer)
    }
  }

  const handleOtpVerify = async (data: PhoneVerificationData): Promise<void> => {
    updateFormData('phoneVerification', data)
    const success = await submitStep(1, data)
    if (success) {
      handleNext()
    }
  }

  const router = useRouter();

  const handlePersonalDetailsSubmit = async (data: PersonalDetailsData): Promise<void> => {
    updateFormData('personalDetails', data)
    const success = await submitStep(2, data)
    if (success) {
      router.push(getLinkWithRef('/apply-now'))
    }
  }


  const handleGoToDashboard = (): void => {
    router.push(getLinkWithRef('/dashboard'))
  }


  const startTimer = (setter: React.Dispatch<React.SetStateAction<number>>): void => {
    const timer = setInterval(() => {
      setter(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resendOtp = (): void => {
    setOtpResendTimer(30)
    startTimer(setOtpResendTimer)
  }

  return (
    <div className="min-h-screen w-full max-w-7xl bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Panel - Branding */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="mb-8">
              <Link href={getLinkWithRef("/")} className="flex items-center">
                <Image src="/lin-logo.png" alt="Logo" width={120} height={40} />
              </Link>
            </div>


            {/* Main Heading */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 leading-tight">
              {STEPS[currentStep - 1].description}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              No paperwork. No waiting. Just quick approvals and easy access to instant funds, anytime, anywhere.
            </p>

            {/* Wallet Illustration */}
            <Image src="/signup-money.png" alt="Wallet Illustration" width={256} height={192} />
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="bg-white flex flex-col justify-center p-8 lg:p-12">
          <div className="max-w-md mx-auto w-full">
            {/* Step Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-red-600">{STEPS[currentStep - 1].title}</h3>
                <span className="text-sm text-gray-600">{currentStep}/2</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Form Content */}
            <div className="space-y-6">
              {currentStep === 1 && (
                <Step1PhoneVerification
                  onSubmit={otpSent ? handleOtpVerify : handlePhoneSubmit}
                  otpSent={otpSent}
                  resendTimer={otpResendTimer}
                  onResend={resendOtp}
                  formData={formData.phoneVerification}
                  setFormData={(data) => updateFormData('phoneVerification', data)}
                  isLoading={isLoading}
                />
              )}

              {currentStep === 2 && (
                <Step2PersonalDetails
                  onSubmit={handlePersonalDetailsSubmit}
                  onGoToDashboard={handleGoToDashboard}
                  formData={formData.personalDetails}
                  setFormData={(data) => updateFormData('personalDetails', data)}
                  phoneNumber={formData.phoneVerification.phoneNumber}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignupForm() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
      </div>
    }>
      <SignupContent />
    </Suspense>
  )
}
