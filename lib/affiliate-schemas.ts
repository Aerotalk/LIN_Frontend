import { z } from "zod";

const MAX_2MB = 2 * 1024 * 1024;

export const affiliateStep1Schema = z.object({
    fullName: z.string()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must be less than 100 characters")
        .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string()
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number must be exactly 10 digits")
        .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
    otp: z.string().optional(),
});

export const affiliateStep2Schema = z.object({
    panNumber: z.string()
        .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format (e.g., ABCDE1234F)"),
    panPhoto: z.instanceof(File)
        .refine(file => file.size <= MAX_2MB, "File size must be ≤ 2MB")
        .refine(file => ["image/png", "image/jpeg", "image/jpg", "application/pdf"].includes(file.type),
            "Only .png/.jpg/.jpeg/.pdf files allowed"),
    acceptance: z.boolean().refine(val => val === true, "You must accept the terms to continue"),
});

export type AffiliateStep1Data = z.infer<typeof affiliateStep1Schema>;
export type AffiliateStep2Data = z.infer<typeof affiliateStep2Schema>;
