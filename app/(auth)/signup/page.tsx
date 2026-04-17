"use client"

import React, { useState } from "react"
import { useSignup } from "@/hooks/useSignup"
import { Step0EligibilityCheck } from "@/components/signup/Step0EligibilityCheck"
import { Step1PhoneVerification } from "@/components/signup/Step1PhoneVerification"
import { Step2PersonalDetails } from "@/components/signup/Step2PersonalDetails"
import { useRouter } from "next/navigation"
import { useAffiliate } from "@/hooks/useAffiliate"
import {
  PhoneVerificationData,
  PersonalDetailsData,
} from "@/lib/types"
import { EligibilityForm } from "@/lib/signup-schemas"
import { Suspense } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"

export const dynamic = "force-dynamic";

interface Step {
  id: number;
  title: string;
}

const STEPS: Step[] = [
  { id: 1, title: "Verify Mobile" },
  { id: 2, title: "Check Eligibility" },
  { id: 3, title: "Complete Application" },
  { id: 4, title: "Review & Submit" },
  { id: 5, title: "Approval" },
]

function SignupContent() {
  const { getLinkWithRef } = useAffiliate();
  const {
    currentStep, // 1 to 5
    formData,
    isLoading,
    error,
    setCurrentStep,
    updateFormData,
    submitStep,
  } = useSignup()

  const [otpSent, setOtpSent] = useState<boolean>(false)
  const [otpResendTimer, setOtpResendTimer] = useState<number>(0)
  const [eligibilityStatus, setEligibilityStatus] = useState<'pending' | 'eligible' | 'rejected'>('pending')
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false)

  const handleNext = (): void => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
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
      handleNext() // Go to Step 2 (Eligibility)
    }
  }

  const handleEligibilitySubmit = async (data: EligibilityForm) => {
    setIsCheckingEligibility(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/loans/check-eligibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salaryReceivedIn: data.salaryReceivedIn,
          // Sending dummy or simplified values to keep logic consistent
        })
      });
      const result = await response.json();
      if (result.eligible) {
        setEligibilityStatus('eligible');
        handleNext(); // Go to Step 3
      } else {
        setEligibilityStatus('rejected');
      }
    } catch (e) {
      console.error("Eligibility check failed", e);
      // Local fallback logic
      if (
        data.salaryReceivedIn !== "Bank Transfer" ||
        data.monthlySalaryRange === "Less than Rs.25,000/-"
      ) {
        setEligibilityStatus('rejected')
      } else {
        setEligibilityStatus('eligible')
        handleNext(); // Go to Step 3
      }
    } finally {
      setIsCheckingEligibility(false);
    }
  }

  const router = useRouter();

  const handlePersonalDetailsSubmit = async (data: PersonalDetailsData): Promise<void> => {
    updateFormData('personalDetails', data)
    const success = await submitStep(2, data) // Step 2 in hook corresponds to personal details registration
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

  // Current Step UI Data
  const getSubTitle = () => {
    if (currentStep === 1) return "Quick & Easy Application"
    if (currentStep === 2) return "Almost There! Just a Few Details Left"
    return "You're almost there! Please fill in your details to get final approval."
  }

  const getBadges = () => {
    if (currentStep === 1) {
      return (
        <div className="flex gap-4 justify-center mt-2 pb-6">
          <span className="flex items-center text-sm text-green-600 font-medium">
            <CheckCircle2 className="w-4 h-4 mr-1" /> Instant Approval
          </span>
          <span className="flex items-center text-sm text-green-600 font-medium">
            <CheckCircle2 className="w-4 h-4 mr-1" /> No Hidden Fees
          </span>
        </div>
      )
    }
    return (
      <div className="flex gap-4 justify-center mt-2 pb-6">
        <span className="flex items-center text-sm text-green-600 font-medium">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Mobile Verified
        </span>
        <span className="flex items-center text-sm text-green-600 font-medium">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Safe & Secure
        </span>
      </div>
    )
  }

  const getBottomTrustBadges = () => {
    if (currentStep === 1) {
      return (
        <div className="mt-6 bg-green-50 rounded-xl p-4 flex justify-between items-center text-center">
          <div>
            <div className="text-green-600 flex justify-center mb-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="text-xs font-bold text-gray-800">Quick Process</div>
            <div className="text-[10px] text-gray-500">Takes less than 5 minutes</div>
          </div>
          <div>
            <div className="text-green-600 flex justify-center mb-1">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-gray-800">Safe & Secure</div>
            <div className="text-[10px] text-gray-500">Bank-level security</div>
          </div>
          <div>
            <div className="text-green-600 flex justify-center mb-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
            </div>
            <div className="text-xs font-bold text-gray-800">100% Digital</div>
            <div className="text-[10px] text-gray-500">Paperless application</div>
          </div>
        </div>
      )
    }
    if (currentStep === 2) {
      return (
        <div className="mt-6 bg-green-50 rounded-xl p-4 flex justify-between items-center text-center">
          <div>
            <div className="text-green-600 flex justify-center mb-1">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="text-xs font-bold text-gray-800">Instant Decision</div>
            <div className="text-[10px] text-gray-500">Get Result in Seconds</div>
          </div>
          <div>
            <div className="text-green-600 flex justify-center mb-1">
               <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-gray-800">100% Secure</div>
            <div className="text-[10px] text-gray-500">Bank-Level Security</div>
          </div>
          <div>
            <div className="text-green-600 flex justify-center mb-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
            </div>
            <div className="text-xs font-bold text-gray-800">No Hidden Charges</div>
            <div className="text-[10px] text-gray-500">Transparent Process</div>
          </div>
        </div>
      )
    }
    return (
       <div className="mt-6 bg-green-50 rounded-xl p-4 flex justify-between items-center text-center">
          <div>
            <div className="text-green-600 flex justify-center mb-1">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="text-xs font-bold text-gray-800">Quick Processing</div>
            <div className="text-[10px] text-gray-500">Get Decision in Minutes</div>
          </div>
          <div>
            <div className="text-green-600 flex justify-center mb-1">
               <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-gray-800">Bank-Level Security</div>
            <div className="text-[10px] text-gray-500">Your Data is Protected</div>
          </div>
          <div>
            <div className="text-green-600 flex justify-center mb-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
            </div>
            <div className="text-xs font-bold text-gray-800">Trusted by Millions</div>
            <div className="text-[10px] text-gray-500">Transparent & Reliable</div>
          </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex py-10 px-4 items-center justify-center font-sans tracking-wide">
      <div className="max-w-[600px] w-full bg-white rounded-3xl shadow-xl p-8 pt-10">
        
        {/* Main Headers */}
        {currentStep < 3 ? (
          <h1 className="text-3xl font-extrabold text-center text-[#1c2b4f] mb-2 leading-tight">
            Get Instant Loan
          </h1>
        ) : (
          <h1 className="text-3xl font-extrabold text-center text-[#1c2b4f] mb-2 leading-tight">
            Complete Your Loan Application
          </h1>
        )}
        <p className="text-center text-sm text-gray-500 font-medium mb-2 opacity-90">{getSubTitle()}</p>
        
        {getBadges()}

        {/* Improved Progress Bar Segment */}
        <div className="mb-10 w-full relative flex items-center justify-between px-2">
            {/* Base line */}
            <div className="absolute left-[8%] right-[8%] h-[3px] bg-gray-200 z-0 top-[14px]"></div>
            
            {/* Active matching line (red) and complete matching line (green) can be constructed if needed, 
                for now we can just lay a green line over past steps, red over current, gray over future.
             */}
             <div className="absolute left-[8%] h-[3px] bg-red-600 z-0 top-[14px] transition-all duration-300" 
                  style={{ width: `${(currentStep - 1) * 25}%`}}></div>
                  
             <div className="absolute left-[8%] h-[3px] bg-green-500 z-0 top-[14px] transition-all duration-300" 
                  style={{ width: `${Math.max(0, currentStep - 2) * 25}%`}}></div>

            {STEPS.map((step, idx) => {
               const isCompleted = step.id < currentStep;
               const isCurrent = step.id === currentStep;
               return (
                 <div key={step.id} className="relative z-10 flex flex-col items-center">
                   <div 
                     className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-4 border-white shadow-sm transition-colors duration-300 ${
                       isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                     }`}
                   >
                     {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                   </div>
                   <div className="w-[80px] text-center mt-2">
                      <span className={`text-[10px] font-bold leading-tight ${
                         isCompleted || isCurrent ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                         {step.title}
                      </span>
                   </div>
                 </div>
               )
            })}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {eligibilityStatus === 'rejected' ? (
            <div className="w-full text-center py-10">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Application Unsuccessful</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Thank you for your application, at present, you do not meet the eligibility criteria for the loan.
              </p>
            </div>
          ) : (
            <div className="w-full">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Form Views */}
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
                  <Step0EligibilityCheck 
                     onSubmit={handleEligibilitySubmit}
                     isLoading={isCheckingEligibility}
                  />
                )}

                {currentStep === 3 && (
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
          )}
        </div>

        {/* Bottom Badges */}
        {eligibilityStatus !== 'rejected' && getBottomTrustBadges()}
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
