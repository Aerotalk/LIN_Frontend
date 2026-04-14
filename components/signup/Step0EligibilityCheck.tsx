"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { eligibilitySchema, type EligibilityForm } from "@/lib/signup-schemas"

interface Step0Props {
  onSubmit: (data: EligibilityForm) => void
  isLoading?: boolean
}

const loanAmountOptions = Array.from({ length: 30 }, (_, i) => (i + 1) * 5000)

export function Step0EligibilityCheck({ onSubmit, isLoading }: Step0Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<EligibilityForm>({
    resolver: zodResolver(eligibilitySchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Loan Amount Required <span className="text-primary">*</span>
          </label>
          <select 
            {...register("loanAmount", { valueAsNumber: true })}
            defaultValue=""
            className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
          >
            <option value="" disabled>Select Loan Amount</option>
            {loanAmountOptions.map(amount => (
              <option key={amount} value={amount}>
                ₹{amount.toLocaleString('en-IN')}
              </option>
            ))}
          </select>
          {errors.loanAmount && <p className="text-red-500 text-sm mt-1">{errors.loanAmount.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Monthly Salary Range <span className="text-primary">*</span>
          </label>
          <select 
            {...register("monthlySalaryRange")}
            defaultValue=""
            className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
          >
            <option value="" disabled>Select Monthly Salary Range</option>
            <option value="Less than Rs.25,000/-">Less than Rs.25,000/-</option>
            <option value="Rs.25,000/- - Rs.50,000/-">Rs.25,000/- - Rs.50,000/-</option>
            <option value="Rs.50,000/- - 75,000/-">Rs.50,000/- - 75,000/-</option>
            <option value="Rs.75,000/- - 1,00,000/-">Rs.75,000/- - 1,00,000/-</option>
            <option value="Rs.1,00,000/- and above">Rs.1,00,000/- and above</option>
          </select>
          {errors.monthlySalaryRange && <p className="text-red-500 text-sm mt-1">{errors.monthlySalaryRange.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Salary Received In <span className="text-primary">*</span>
          </label>
          <select 
            {...register("salaryReceivedIn")}
            defaultValue=""
            className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
          >
            <option value="" disabled>Select Salary Received Mode</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cheque">Cheque</option>
          </select>
          {errors.salaryReceivedIn && <p className="text-red-500 text-sm mt-1">{errors.salaryReceivedIn.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            CIBIL Score <span className="text-primary">*</span>
          </label>
          <select 
            {...register("cibilScore")}
            defaultValue=""
            className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
          >
            <option value="" disabled>Select CIBIL Score Range</option>
            <option value="750+ (Excellent)">750+ (Excellent)</option>
            <option value="700 - 749 (Good)">700 - 749 (Good)</option>
            <option value="650 - 699 (Fair)">650 - 699 (Fair)</option>
            <option value="< 650 (Poor)">{"< 650 (Poor)"}</option>
          </select>
          {errors.cibilScore && <p className="text-red-500 text-sm mt-1">{errors.cibilScore.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            City PIN Code <span className="text-primary">*</span>
          </label>
          <Input 
            {...register("pinCode")}
            placeholder="Enter 6-digit PIN Code"
            maxLength={6}
            type="tel"
          />
          {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode.message}</p>}
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
            {isLoading ? "Checking..." : "Check Loan Eligibility"}
          </Button>
          <div className="text-center mt-3 text-xs text-green-600 flex items-center justify-center gap-1">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
             Your information is secure and encrypted
          </div>
        </div>
      </div>
    </form>
  )
}
