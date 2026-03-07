"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { personalDetailsSchema, type PersonalDetailsForm } from "@/lib/signup-schemas"
import { Loader2, Lock } from "lucide-react"
import { FileUpload } from "../ui/file-upload"
import { apiClient } from "@/lib/api"
import { cn } from "@/lib/utils"

interface Step2Props {
  onSubmit: (data: PersonalDetailsForm) => void;
  onGoToDashboard: () => void;
  formData: PersonalDetailsForm;
  setFormData: (data: PersonalDetailsForm) => void;
  phoneNumber: string;
}

export function Step2PersonalDetails({ onSubmit, onGoToDashboard, formData, setFormData, phoneNumber }: Step2Props) {
  // States
  const [isVerifyingPan, setIsVerifyingPan] = useState(false);
  const [isPanVerified, setIsPanVerified] = useState(!!formData.firstName && !!formData.panNumber);
  const [isSaved, setIsSaved] = useState(false);

  // Form Setup
  const { register, handleSubmit, setValue, watch, formState: { errors }, trigger } = useForm<PersonalDetailsForm>({
    resolver: zodResolver(personalDetailsSchema) as any,
    defaultValues: formData,
    mode: "onChange",
  });

  const employmentType = watch("employmentType");
  const gender = watch("gender");

  // Handlers
  const handlePanVerify = async () => {
    const panNumber = watch("panNumber");
    const panImage = watch("panImage");

    if (!panNumber || panNumber.length !== 10) {
      trigger("panNumber");
      return;
    }

    if (!panImage) {
      trigger("panImage"); // Trigger validation for image
      return;
    }

    setIsVerifyingPan(true);
    try {
      // Pass both PAN number and image
      const response = await apiClient.verifyPan(panNumber, panImage);

      if (response.success && response.data) {
        // We do NOT autofill anymore, just mark as verified
        // const data = response.data;
        // The user must fill firstName, lastName etc. manually.

        setIsPanVerified(true);
      } else {
        // Handle error toast here ideally
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsVerifyingPan(false);
    }
  };

  const handleEmploymentTypeChange = (value: "Salaried" | "Self employed") => {
    setValue("employmentType", value);
  };

  const onValidSubmit = async (data: PersonalDetailsForm) => {
    setFormData(data);

    try {
      // Clean phone number to ensure it only has digits
      const cleanerPhone = phoneNumber.replace(/\D/g, '');
      const uniqueEmail = `user${cleanerPhone}@loaninneed.com`;

      await apiClient.registerUser({
        name: `${data.firstName} ${data.lastName}`,
        dob: data.dateOfBirth,
        gender: data.gender,
        email: uniqueEmail,
        password: "Password@123"   // Dummy password
      });
      setIsSaved(true);
    } catch (e) {
      console.error("Registration failed", e);
    }
  };

  const handleFileChange = (file: File | null) => {
    if (file) setValue("panImage", file);
  };

  // View: Success State (Sign up3.2)
  if (isSaved) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">First name as per PAN</label>
            <div className="relative">
              <Input value={watch("firstName")} disabled className="bg-gray-50 pr-10" />
              <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Middle name</label>
            <Input value={watch("middleName")} disabled className="bg-gray-50" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Last name as per PAN</label>
            <div className="relative">
              <Input value={watch("lastName")} disabled className="bg-gray-50 pr-10" />
              <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of birth as per PAN</label>
            <div className="relative">
              <Input value={watch("dateOfBirth")} disabled className="bg-gray-50 pr-10" />
              <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="relative">
              <Input value={watch("gender")} disabled className="bg-gray-50 pr-10" />
              <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">PAN number</label>
            <div className="relative">
              <Input value={watch("panNumber")} disabled className="bg-gray-50 pr-10" />
              <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button
            onClick={() => onSubmit(watch())}
            className="bg-red-600 hover:bg-red-700 text-white min-w-[140px]"
          >
            Apply loan <span className="ml-2">&gt;</span>
          </Button>
          <button
            type="button"
            onClick={onGoToDashboard}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium underline-offset-4 hover:underline"
          >
            Go to dashboard
          </button>
        </div>
      </div>
    )
  }

  // View: Form State (Sign up3.1)
  return (
    <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-8">
      {/* PAN Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PAN number <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("panNumber")}
            placeholder="Enter your PAN number"
            className="w-full h-12 text-base uppercase"
            maxLength={10}
            disabled={isPanVerified}
          />
          {errors.panNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.panNumber.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PAN image <span className="text-red-500">*</span>
          </label>
          <FileUpload
            accept="image/*"
            placeholder="Click to upload or take photo"
            onFileChange={handleFileChange}
            disabled={isPanVerified}
          />
          {errors.panImage && (
            <p className="text-red-500 text-sm mt-1">{errors.panImage.message as string}</p>
          )}
        </div>
      </div>

      {!isPanVerified && (
        <div>
          <Button
            type="button"
            onClick={handlePanVerify}
            disabled={isVerifyingPan}
            className="bg-red-600 hover:bg-red-700 text-white px-6"
          >
            {isVerifyingPan ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Verify PAN
          </Button>
        </div>
      )}

      {/* Employment Type Switcher - Always Step 2 now */}
      <div className="flex w-full border-b border-gray-200">
        <button
          type="button"
          onClick={() => handleEmploymentTypeChange("Salaried")}
          className={cn(
            "pb-3 px-8 text-sm font-medium transition-colors relative",
            employmentType === "Salaried"
              ? "text-red-600 border-b-2 border-red-600"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Salaried
        </button>
        <button
          type="button"
          onClick={() => handleEmploymentTypeChange("Self employed")}
          className={cn(
            "pb-3 px-8 text-sm font-medium transition-colors relative",
            employmentType === "Self employed"
              ? "text-red-600 border-b-2 border-red-600"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Self employed
        </button>
      </div>

      {/* Personal Details (Disabled until PAN verified usually, or just shown) */}
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", !isPanVerified && "opacity-50 pointer-events-none")}>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">First name <span className="text-red-500">*</span></label>
          <Input {...register("firstName")} className="bg-white h-12" placeholder="Enter your first name" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Middle name</label>
          <Input {...register("middleName")} className="bg-white h-12" placeholder="Enter your middle name" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Last name <span className="text-red-500">*</span></label>
          <Input {...register("lastName")} className="bg-white h-12" placeholder="Enter your last name" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of birth <span className="text-red-500">*</span></label>
          <div className="relative">
            <Input type="date" {...register("dateOfBirth")} className="bg-white h-12" />
          </div>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender <span className="text-red-500">*</span></label>
          <Select
            value={gender}
            onValueChange={(val) => {
              setValue("gender", val as any);
              setFormData({ ...formData, gender: val as any });
            }}
          >
            <SelectTrigger className="w-full h-12 bg-white">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={!isPanVerified}
          className={cn(
            "font-medium px-8 h-12 w-full md:w-auto transition-all duration-300",
            isPanVerified
              ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200"
              : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          )}
        >
          Save now
        </Button>
      </div>
    </form>
  )
}
