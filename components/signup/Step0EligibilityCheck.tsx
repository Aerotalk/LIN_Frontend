"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { eligibilitySchema, type EligibilityForm } from "@/lib/signup-schemas"
import { IndianRupee, Banknote, Building2, CreditCard } from "lucide-react"

interface Step0Props {
  onSubmit: (data: EligibilityForm) => void
  isLoading?: boolean
}

const COMMON_CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad",
  "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", "Other"
]

const LOAN_PURPOSES = [
  "Medical Emergency", "Debt Consolidation", "Home Renovation", 
  "Education", "Wedding", "Business", "Travel", "Other"
]

export function Step0EligibilityCheck({ onSubmit, isLoading }: Step0Props) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<EligibilityForm>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      loanAmount: undefined,
      purposeOfLoan: "",
      occupation: undefined,
      monthlySalaryRange: undefined,
      salaryReceivedIn: undefined,
      city: ""
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Loan Amount Required <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <IndianRupee className="h-4 w-4 text-gray-500" />
            </div>
            <Input 
              {...register("loanAmount", { valueAsNumber: true })}
              type="number"
              placeholder="Enter Loan Amount"
              className="pl-9 h-10 w-full hover:border-gray-400 focus:border-red-600 focus:ring-red-600"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Minimum: ₹5,000</span>
            <span>Maximum: ₹1,50,000</span>
          </div>
          {errors.loanAmount && <p className="text-red-500 text-sm mt-1">{errors.loanAmount.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Purpose of Loan <span className="text-primary">*</span>
          </label>
          <select 
            {...register("purposeOfLoan")}
            className="w-full h-10 px-3 py-2 border border-input rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
          >
            <option value="" disabled>Select Purpose of Loan</option>
            {LOAN_PURPOSES.map(purpose => (
              <option key={purpose} value={purpose}>{purpose}</option>
            ))}
          </select>
          {errors.purposeOfLoan && <p className="text-red-500 text-sm mt-1">{errors.purposeOfLoan.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Occupation <span className="text-primary">*</span>
          </label>
          <select 
            {...register("occupation")}
            className="w-full h-10 px-3 py-2 border border-input rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
          >
            <option value="" disabled>Select Occupation</option>
            <option value="Salaried">Salaried</option>
            <option value="Self Employed">Self Employed</option>
            <option value="Business">Business</option>
            <option value="Student">Student</option>
            <option value="Other">Other</option>
          </select>
          {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Monthly Salary Range <span className="text-primary">*</span>
          </label>
          <select 
            {...register("monthlySalaryRange")}
            className="w-full h-10 px-3 py-2 border border-input rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
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
          <Controller
            name="salaryReceivedIn"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "Cash", icon: <Banknote className="w-5 h-5 mb-1" /> },
                  { value: "Bank Transfer", icon: <Building2 className="w-5 h-5 mb-1" /> },
                  { value: "Cheque", icon: <CreditCard className="w-5 h-5 mb-1" /> }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => field.onChange(option.value)}
                    className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-all ${
                      field.value === option.value
                        ? "border-red-600 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-red-300 hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    {option.icon}
                    <span className="text-xs font-medium">{option.value}</span>
                  </button>
                ))}
              </div>
            )}
          />
          {errors.salaryReceivedIn && <p className="text-red-500 text-sm mt-1">{errors.salaryReceivedIn.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            City <span className="text-primary">*</span>
          </label>
          <select 
            {...register("city")}
            className="w-full h-10 px-3 py-2 border border-input rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
          >
            <option value="" disabled>Select City</option>
            {COMMON_CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white h-11" disabled={isLoading}>
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
