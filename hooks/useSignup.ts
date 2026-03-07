import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { SignupFormData } from '@/lib/signup-schemas';

interface UseSignupReturn {
  currentStep: number;
  formData: SignupFormData;
  isLoading: boolean;
  error: string | null;
  setCurrentStep: (step: number) => void;
  updateFormData: (step: keyof SignupFormData, data: any) => void;
  submitStep: (step: number, data: any) => Promise<boolean>;
  resetForm: () => void;
}

// Helper to create empty file placeholder
const createEmptyFile = (name: string, type: string): File => {
  const blob = new Blob([], { type });
  return new File([blob], name, { type });
};

const initialFormData: SignupFormData = {
  phoneVerification: { phoneNumber: "", otp: "" as string | undefined },
  personalDetails: {
    firstName: "", middleName: "", lastName: "", dateOfBirth: "", gender: "" as "Male" | "Female" | "Prefer not to say",
    panNumber: "", panImage: undefined, employmentType: "Salaried"
  },
  basicDetails: {
    loanAmount: 0, purposeOfLoan: "",
    companyName: "", professionName: "",
    companyAddress: "", monthlyIncome: 0,
    jobStability: "" as "Very unstable" | "Somewhat unstable" | "Neutral / moderate" | "Stable" | "Very stable",
    currentAddress: "", currentAddressType: "" as "Owner(Self or Family)" | "Rented",
    permanentAddress: "", addressProof: undefined, pinCode: ""
  },
  documentVerification: {
    payslipFile: createEmptyFile("payslip.pdf", "application/pdf"),
    bankStatementFile: createEmptyFile("bankstatement.pdf", "application/pdf"),
    panNumber: "",
    aadhaarNumber: ""
  },
  aadhaarOtp: { aadhaarOtp: "" },
  photoAndLocationSchema: {
    photoFile: createEmptyFile("photo.jpg", "image/jpeg"),
    autoDetectLocation: false,
    location: ""
  }
};

export function useSignup(): UseSignupReturn {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = useCallback((step: keyof SignupFormData, data: any) => {
    setFormData(prev => ({ ...prev, [step]: data }));
  }, []);

  const submitStep = useCallback(async (step: number, data: any): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      switch (step) {
        case 1:
          if (!data.otp) {
            // Request OTP
            await apiClient.requestPhoneOtp(data.phoneNumber);
            return true;
          } else {
            // Verify OTP
            const response = await apiClient.verifyPhoneOtp(data.phoneNumber, data.otp);
            if (response.token) {
              apiClient.setToken(response.token);
            }
            return true;
          }

        case 2:
          // Register user with personal details
          const name = `${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`.trim();

          // Clean phone number to ensure it only has digits
          const cleanerPhone = formData.phoneVerification.phoneNumber.replace(/\D/g, '');
          const uniqueEmail = `user${cleanerPhone}@loaninneed.com`;

          await apiClient.registerUser({
            name,
            dob: data.dateOfBirth,
            gender: data.gender,
            email: uniqueEmail,
            password: "Password@123",  // Dummy password
          });
          return true;

        case 3:
          // Submit KYC details
          await apiClient.submitKYC({
            companyName: data.companyName,
            companyAddress: data.companyAddress,
            monthlyIncome: data.monthlyIncome,
            stability: data.jobStability,
            currentAddress: data.currentAddress,
            currentAddressType: data.currentAddressType,
            permanentAddress: data.permanentAddress,
            currentPostalCode: data.pinCode,
            loanAmount: data.loanAmount,
            purpose: data.purposeOfLoan,
          });
          return true;

        case 4:
          // Submit documents (salary slips and bank statements)
          // Note: Selfie is submitted separately in step 6
          const documentFormData = new FormData();

          // Backend expects arrays, so append files correctly
          // Only append if file exists and is a valid File object with content
          if (!data.payslipFile || !(data.payslipFile instanceof File) || data.payslipFile.size === 0) {
            throw new Error('Please upload your salary slip');
          }
          documentFormData.append('salarySlips', data.payslipFile);

          if (!data.bankStatementFile || !(data.bankStatementFile instanceof File) || data.bankStatementFile.size === 0) {
            throw new Error('Please upload your bank statement');
          }
          documentFormData.append('bankStatements', data.bankStatementFile);

          // Note: PAN and Aadhaar numbers are not sent in document submission
          // They should be handled separately if needed

          await apiClient.submitDocuments(documentFormData);
          return true;

        case 5:
          // Verify Aadhaar OTP
          await apiClient.verifyAadhaarOtp(formData.documentVerification.aadhaarNumber, data.aadhaarOtp);
          return true;

        case 6:
          // Submit selfie and location data
          // First, upload selfie if available
          if (!data.photoFile || !(data.photoFile instanceof File) || data.photoFile.size === 0) {
            throw new Error('Please upload your photo');
          }
          await apiClient.uploadSelfie(data.photoFile);

          // Then submit location data if auto-detected
          if (data.autoDetectLocation && data.location) {
            // Parse location from string format "latitude, longitude"
            const coords = data.location.split(',').map((coord: string) => parseFloat(coord.trim()));
            const [latitude, longitude] = coords;

            if (!isNaN(latitude) && !isNaN(longitude) && latitude !== 0 && longitude !== 0) {
              await apiClient.submitLocation({
                latitude,
                longitude,
                placeName: data.location,
              });
            } else {
              throw new Error('Invalid location data. Please enable location permissions.');
            }
          } else {
            throw new Error('Please enable location detection');
          }
          return true;

        default:
          return false;
      }
    } catch (err: any) {
      if (err.message?.toLowerCase().includes('exist') || err.message?.toLowerCase().includes('conflict')) {
        setError('User is already present, please login');
      } else {
        setError(err.message || 'An error occurred');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    currentStep,
    formData,
    isLoading,
    error,
    setCurrentStep,
    updateFormData,
    submitStep,
    resetForm,
  };
}
