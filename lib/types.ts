export interface FAQItem {
  question: string;
  answer: string;
}

export interface CardData {
  iconImg: string;
  title: string;
  description: string;
}

// types/signup.ts

export interface PhoneVerificationData {
  phoneNumber: string;
  otp?: string;
}

export interface PersonalDetailsData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;

  gender: "Male" | "Female" | "Prefer not to say";
  middleName?: string | undefined;
  panNumber: string;
  panImage?: File;
  employmentType: "Salaried" | "Self employed";
}

export interface BasicDetailsData {
  companyName?: string;
  professionName?: string;
  monthlyIncome: number;
  loanAmount: number;
  purposeOfLoan: string;
  currentAddressType: 'Owner(Self or Family)' | 'Rented';
  currentAddress: string;
  permanentAddress: string;
  pinCode: string;
  jobStability: "Very unstable" | "Somewhat unstable" | "Neutral / moderate" | "Stable" | "Very stable";
  addressProof?: File | null;
  companyAddress: string;
}

export interface DocumentVerificationData {
  aadhaarNumber: string;
  aadhaarFrontImage?: File | string;
  aadhaarBackImage?: File | string;
}

export interface AadhaarOtpData {
  otp: string;
}

export interface PhotoAndLocationData {
  selfieImage?: File | string;
  latitude?: number;
  longitude?: number;
  address?: string;
}

export interface FormData {
  phoneVerification: PhoneVerificationData;
  personalDetails: PersonalDetailsData;
  basicDetails: BasicDetailsData;
  documentVerification: DocumentVerificationData;
  aadhaarOtp: AadhaarOtpData;
  photoAndLocationSchema: PhotoAndLocationData;
}

export type FormDataKey = keyof FormData;