"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { personalDetailsSchema, type PersonalDetailsForm } from "@/lib/signup-schemas"
import { Lock, User, Mail, FileText, UploadCloud, FileBadge2 } from "lucide-react"
import { FileUpload } from "../ui/file-upload"

interface Step2Props {
  onSubmit: (data: PersonalDetailsForm) => void;
  onGoToDashboard: () => void;
  formData: PersonalDetailsForm;
  setFormData: (data: PersonalDetailsForm) => void;
  phoneNumber: string;
}

export function Step2PersonalDetails({ onSubmit, onGoToDashboard, formData, setFormData, phoneNumber }: Step2Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PersonalDetailsForm>({
    resolver: zodResolver(personalDetailsSchema) as any,
    defaultValues: formData,
    mode: "onChange",
  });

  const gender = watch("gender");
  
  const handleFileChange = (field: keyof PersonalDetailsForm) => (file: File | null) => {
    if (file) setValue(field, file as any, { shouldValidate: true });
  };

  const onValidSubmit = async (data: PersonalDetailsForm) => {
    setIsLoading(true);
    setFormData(data);
    await onSubmit(data); // Defer the backend API calls to page.tsx's handler
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-6 form-fade-in pb-4">
       
      {/* Header element */}
      <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-3">
        <User className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-[#1c2b4f]">Personal Details</h2>
      </div>

      {/* PAN Section */}
      <div className="w-full">
        <label className="block text-sm font-bold text-[#1c2b4f] mb-2">
          PAN Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
           <FileBadge2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
           <Input
             {...register("panNumber")}
             placeholder="Enter 10-digit PAN"
             className="w-full h-12 pl-12 text-base uppercase border-gray-300 shadow-sm focus-visible:ring-red-600"
             maxLength={10}
           />
        </div>
        {errors.panNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.panNumber.message}</p>
        )}
      </div>

      {/* Name row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full">
          <label className="block text-sm font-bold text-[#1c2b4f] mb-2">First Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input {...register("firstName")} className="pl-10 h-12 border-gray-300 shadow-sm" placeholder="Enter First Name" />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        <div className="w-full">
          <label className="block text-sm font-bold text-[#1c2b4f] mb-2">Middle Name <span className="font-normal text-gray-500">(Optional)</span></label>
           <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input {...register("middleName")} className="pl-10 h-12 border-gray-300 shadow-sm" placeholder="Enter Middle Name" />
          </div>
        </div>
        <div className="w-full">
          <label className="block text-sm font-bold text-[#1c2b4f] mb-2">Surname <span className="text-red-500">*</span></label>
           <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input {...register("lastName")} className="pl-10 h-12 border-gray-300 shadow-sm" placeholder="Enter Surname" />
          </div>
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Sex & DOB row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-sm font-bold text-[#1c2b4f] mb-2">Sex <span className="text-red-500">*</span></label>
          <div className="flex bg-gray-100 p-1 rounded-lg">
             <button
                type="button"
                onClick={() => setValue("gender", "Male", { shouldValidate: true })}
                className={`flex-1 flex items-center justify-center py-2.5 rounded-md text-sm font-bold transition-all ${gender === 'Male' ? 'bg-[#e5edff] text-blue-600 shadow-sm border border-blue-200' : 'text-gray-500'}`}
             >
                <div className="mr-2 text-current text-lg">♂</div> Male
             </button>
             <button
                type="button"
                onClick={() => setValue("gender", "Female", { shouldValidate: true })}
                className={`flex-1 flex items-center justify-center py-2.5 rounded-md text-sm font-bold transition-all ${gender === 'Female' ? 'bg-[#e5edff] text-blue-600 shadow-sm border border-blue-200' : 'text-gray-500'}`}
             >
                <div className="mr-2 text-current text-lg">♀</div> Female
             </button>
          </div>
          {/* Hidden register */}
          <input type="hidden" {...register("gender")} />
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
        </div>
        <div className="w-full">
          <label className="block text-sm font-bold text-[#1c2b4f] mb-2">Date of Birth <span className="text-red-500">*</span></label>
          <div className="relative">
            <Input type="date" {...register("dateOfBirth")} className="h-12 border-gray-300 shadow-sm text-gray-600 font-medium" />
          </div>
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div className="w-full">
        <label className="block text-sm font-bold text-[#1c2b4f] mb-2">Email ID <span className="text-red-500">*</span></label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
          <Input {...register("email")} type="email" className="pl-12 h-12 border-gray-300 shadow-sm" placeholder="example@email.com" />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Aadhaar Number */}
      <div className="w-full">
        <label className="block text-sm font-bold text-[#1c2b4f] mb-2">Aadhaar Card Number <span className="text-red-500">*</span></label>
        <div className="relative">
           {/* In actual design it is 12 boxes, here rendered as a single tracking input for simplicity & UX */}
          <div className="absolute left-0 top-0 h-full w-12 bg-blue-50 border-r border-gray-300 rounded-l-md flex items-center justify-center">
            <User className="w-5 h-5 text-blue-400 opacity-70" />
          </div>
          <Input 
            {...register("aadhaarNumber")} 
            className="pl-16 h-12 border-gray-300 shadow-sm tracking-[0.2em] font-medium" 
            placeholder="0000 - 0000 - 0000" 
            maxLength={12} 
          />
        </div>
        {errors.aadhaarNumber ? (
           <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber.message}</p>
        ) : (
           <p className="text-xs text-gray-500 mt-2 font-medium">Enter 12-digit Aadhaar Number</p>
        )}
      </div>

      {/* Document Upload section */}
      <div className="pt-4 border-t border-gray-100">
         <div className="flex items-start space-x-3 mb-4">
            <FileText className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h2 className="text-[17px] font-bold text-[#1c2b4f]">Document Upload</h2>
              <p className="text-xs text-gray-500 font-medium">Please upload clear and valid documents.</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PAN Card */}
            <div className="border border-dashed border-blue-200 bg-[#f8fafe] rounded-xl p-4 text-center group hover:bg-[#f0f4ff] transition-colors relative">
               <FileBadge2 className="w-8 h-8 text-blue-300 mx-auto mb-2" />
               <div className="text-sm font-bold text-[#1c2b4f]">PAN Card Upload <span className="text-red-500">*</span></div>
               <div className="text-[10px] text-gray-500 mb-3">JPG, PNG or PDF<br/>(Max 5MB)</div>
               <FileUpload
                  accept=".jpg,.jpeg,.png,.pdf"
                  onFileChange={handleFileChange("panImage")}
               />
               {errors.panImage && <p className="text-red-500 text-xs mt-1 absolute bottom-1 right-0 left-0">Required</p>}
            </div>

            {/* Aadhaar Card */}
            <div className="border border-dashed border-blue-200 bg-[#f8fafe] rounded-xl p-4 text-center group hover:bg-[#f0f4ff] transition-colors relative">
               <FileText className="w-8 h-8 text-blue-300 mx-auto mb-2" />
               <div className="text-sm font-bold text-[#1c2b4f]">Aadhaar Card Upload <span className="text-red-500">*</span></div>
               <div className="text-[10px] text-gray-500 mb-3">JPG, PNG or PDF<br/>(Max 5MB)</div>
               <FileUpload
                  accept=".jpg,.jpeg,.png,.pdf"
                  onFileChange={handleFileChange("aadhaarImage")}
               />
               {errors.aadhaarImage && <p className="text-red-500 text-xs mt-1 absolute bottom-1 right-0 left-0">Required</p>}
            </div>

            {/* Salary Slip */}
            <div className="border border-dashed border-blue-200 bg-[#f8fafe] rounded-xl p-4 text-center group hover:bg-[#f0f4ff] transition-colors relative">
               <svg className="w-8 h-8 text-blue-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
               <div className="text-sm font-bold text-[#1c2b4f]">Salary Slip Upload <span className="text-red-500">*</span></div>
               <div className="text-[10px] text-gray-500 mb-3">JPG, PNG or PDF<br/>(Max 5MB)</div>
               <FileUpload
                  accept=".jpg,.jpeg,.png,.pdf"
                  onFileChange={handleFileChange("salarySlipImage")}
               />
               {errors.salarySlipImage && <p className="text-red-500 text-xs mt-1 absolute bottom-1 right-0 left-0">Required</p>}
            </div>

            {/* Bank Statement */}
            <div className="border border-dashed border-blue-200 bg-[#f8fafe] rounded-xl p-4 text-center group hover:bg-[#f0f4ff] transition-colors relative">
               <svg className="w-8 h-8 text-blue-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>
               <div className="text-sm font-bold text-[#1c2b4f]">Bank Statement Upload <span className="text-red-500">*</span></div>
               <div className="text-[10px] text-gray-500 mb-3">PDF Only<br/>(Max 10MB)</div>
               <FileUpload
                  accept=".pdf"
                  onFileChange={handleFileChange("bankStatementImage")}
               />
               {errors.bankStatementImage && <p className="text-red-500 text-xs mt-1 absolute bottom-1 right-0 left-0">Required</p>}
            </div>
         </div>
      </div>

      <div className="pt-6">
        <Button
          type="submit"
          className="w-full bg-[#c81e1e] hover:bg-red-700 text-white h-14 rounded-xl text-lg font-bold shadow-md transition-all"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Review & Submit Application"}
        </Button>
        <div className="text-center mt-4">
            <span className="flex items-center justify-center text-xs text-gray-500 font-medium opacity-80">
              <Lock className="w-3 h-3 mr-1 text-green-600" /> Your information is secure and encrypted
            </span>
        </div>
      </div>
    </form>
  )
}
