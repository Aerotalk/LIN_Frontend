"use client"

import React, { useState, useEffect } from "react"
import { useSignup } from "@/hooks/useSignup"
import { Step3BasicDetails } from "@/components/signup/Step3BasicDetails"
import { Step4DocumentVerification } from "@/components/signup/Step4DocumentVerification"
import { Step5AadhaarOtp } from "@/components/signup/Step5AadhaarOtp"
import { Step6PhotoGPS } from "@/components/signup/Step6PhotoGPS"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAffiliate } from "@/hooks/useAffiliate"

import {
    DocumentVerificationData,
} from "@/lib/types"
import { AadhaarOtpForm, BasicDetailsForm, PhotoLocationForm } from "@/lib/signup-schemas"

export const dynamic = "force-dynamic";

interface Step {
    id: number;
    title: string;
    description: string;
}

const STEPS: Step[] = [
    { id: 1, title: "Basic details", description: "Get Instant Financial Support You Can Rely On" },
    { id: 2, title: "Verifying documents", description: "Get Instant Financial Support You Can Rely On" },
    { id: 3, title: "Aadhaar verification", description: "Get Instant Financial Support You Can Rely On" },
    { id: 4, title: "Photo & Location", description: "Get Instant Financial Support You Can Rely On" },
]

import { Suspense } from "react"
import { Loader2 } from "lucide-react"

function ApplyNowContent() {
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

    // Adjust currentStep for the apply-now flow
    // apply-now step 1 = useSignup step 3
    // apply-now step 2 = useSignup step 4
    // apply-now step 3 = useSignup step 5
    // apply-now step 4 = useSignup step 6
    const [internalStep, setInternalStep] = useState(1)

    const [aadhaarOtpSent, setAadhaarOtpSent] = useState<boolean>(false)
    const [aadhaarOtpResendTimer, setAadhaarOtpResendTimer] = useState<number>(0)
    const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false)

    const progress = (internalStep / STEPS.length) * 100

    const handleNext = (): void => {
        if (internalStep < STEPS.length) {
            setInternalStep(internalStep + 1)
        }
    }

    const handlePrevious = (): void => {
        if (internalStep > 1) {
            setInternalStep(internalStep - 1)
        }
    }

    const handleBasicDetailsSubmit = async (data: BasicDetailsForm): Promise<void> => {
        updateFormData('basicDetails', data)
        const success = await submitStep(3, data)
        if (success) {
            handleNext()
        }
    }

    const handleDocumentVerificationSubmit = async (data: DocumentVerificationData): Promise<void> => {
        updateFormData('documentVerification', data)
        const success = await submitStep(4, data)
        if (success) {
            setAadhaarOtpSent(true)
            setAadhaarOtpResendTimer(30)
            startTimer(setAadhaarOtpResendTimer)
            handleNext()
        }
    }

    const handleAadhaarOtpSubmit = async (data: AadhaarOtpForm): Promise<void> => {
        updateFormData('aadhaarOtp', data)
        const success = await submitStep(5, data)
        if (success) {
            handleNext()
        }
    }

    const handlePhotoLocationSubmit = async (data: PhotoLocationForm): Promise<void> => {
        updateFormData('photoAndLocationSchema', data)
        const success = await submitStep(6, data)
        if (success) {
            setApplicationSubmitted(true)
        }
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

    const resendAadhaarOtp = (): void => {
        setAadhaarOtpResendTimer(30)
        startTimer(setAadhaarOtpResendTimer)
    }

    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

    React.useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Show auth gate if not authenticated
    if (isAuthenticated === false) {
        return (
            <div className="min-h-screen w-full max-w-7xl bg-white mt-32 mx-auto px-4">
                <div className="max-w-md mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-gray-900">Please Log In to Apply</h2>
                        <p className="text-gray-600 text-lg">
                            You need an account to submit a loan application.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="p-6 border border-red-100 rounded-2xl bg-red-50/50 space-y-4">
                            <h3 className="font-semibold text-gray-900">New to LoanInNeed?</h3>
                            <Button
                                onClick={() => router.push(getLinkWithRef('/signup'))}
                                className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-base font-medium rounded-xl"
                            >
                                Create an Account
                            </Button>
                        </div>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Already have an account?</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            onClick={() => router.push(getLinkWithRef('/login'))}
                            className="w-full h-12 text-base font-medium rounded-xl border-2 hover:bg-gray-50 hover:text-gray-900"
                        >
                            Log In
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
            </div>
        );
    }

    if (applicationSubmitted) {
        return (
            <div className="min-h-screen w-full max-w-7xl bg-white mt-20 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
                    {/* Left Panel - Branding */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center p-8 lg:p-12 rounded-l-3xl">
                        <div className="max-w-md mx-auto">
                            <div className="mb-8">
                                <Link href={getLinkWithRef("/")} className="flex items-center">
                                    <Image src="/lin-logo.png" alt="Logo" width={120} height={40} />
                                </Link>
                            </div>

                            <h2 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
                                No paperwork. No waiting. Just quick approvals and easy access to instant funds, anytime, anywhere.
                            </h2>
                            <Image src="/signup-money.png" alt="Wallet Illustration" width={256} height={192} />
                        </div>
                    </div>

                    {/* Right Panel - Success */}
                    <div className="bg-white flex flex-col justify-center p-8 lg:p-12">
                        <div className="max-w-md mx-auto w-full text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Loan application submitted</h3>
                            <p className="text-gray-600 mb-8">Our representative will contact you soon</p>
                            <Button
                                onClick={() => router.push(getLinkWithRef('/dashboard'))}
                                className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-base font-medium"
                            >

                                View dashboard
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full max-w-7x bg-white mt-24 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
                {/* Left Panel - Branding */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center p-8 lg:p-12 rounded-l-3xl">
                    <div className="max-w-md mx-auto">
                        <div className="mb-8">
                            <Link href={getLinkWithRef("/")} className="flex items-center">
                                <Image src="/lin-logo.png" alt="Logo" width={120} height={40} />
                            </Link>
                        </div>

                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 leading-tight">
                            {STEPS[internalStep - 1].description}
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            No paperwork. No waiting. Just quick approvals and easy access to instant funds, anytime, anywhere.
                        </p>
                        <Image src="/signup-money.png" alt="Wallet Illustration" width={256} height={192} />
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="bg-white flex flex-col justify-center p-8 lg:p-12">
                    <div className="max-w-md mx-auto w-full">
                        {/* Step Header */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-red-600">{STEPS[internalStep - 1].title}</h3>
                                <span className="text-sm text-gray-600">{internalStep}/{STEPS.length}</span>
                            </div>
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
                            {internalStep === 1 && (
                                <Step3BasicDetails
                                    onSubmit={handleBasicDetailsSubmit}
                                    onBack={() => router.back()}
                                    formData={formData.basicDetails}
                                    setFormData={(data) => updateFormData('basicDetails', data)}
                                    employmentType={formData.personalDetails.employmentType}
                                />
                            )}

                            {internalStep === 2 && (
                                <Step4DocumentVerification
                                    onSubmit={handleDocumentVerificationSubmit}
                                    formData={formData.documentVerification}
                                    setFormData={(data) => updateFormData('documentVerification', data)}
                                />
                            )}

                            {internalStep === 3 && (
                                <Step5AadhaarOtp
                                    onSubmit={handleAadhaarOtpSubmit}
                                    onBack={handlePrevious}
                                    otpSent={aadhaarOtpSent}
                                    resendTimer={aadhaarOtpResendTimer}
                                    onResend={resendAadhaarOtp}
                                    formData={formData.aadhaarOtp}
                                    setFormData={(data) => updateFormData('aadhaarOtp', data)}
                                />
                            )}

                            {internalStep === 4 && (
                                <Step6PhotoGPS
                                    onSubmit={handlePhotoLocationSubmit}
                                    onBack={handlePrevious}
                                    formData={formData.photoAndLocationSchema}
                                    setFormData={(data) => updateFormData('photoAndLocationSchema', data)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ApplyNowPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
            </div>
        }>
            <ApplyNowContent />
        </Suspense>
    )
}
