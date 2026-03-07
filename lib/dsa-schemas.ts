import { z } from "zod";

const MAX_2MB = 2 * 1024 * 1024;

export const dsaStep1Schema = z.object({
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

export const dsaStep2Schema = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("individual"),
        address: z.string().min(5, "Address must be at least 5 characters"),
        state: z.string().min(1, "State is required"),
        city: z.string().min(1, "City is required"),
        pincode: z.string().regex(/^\d{6}$/, "Invalid PIN code format"),
        panNumber: z.string()
            .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format"),
        panPhoto: z.instanceof(File)
            .refine(file => file.size <= MAX_2MB, "File size must be ≤ 2MB")
            .refine(file => ["image/png", "image/jpeg", "image/jpg", "application/pdf"].includes(file.type),
                "Only .png/.jpg/.jpeg/.pdf files allowed"),
        acceptance: z.boolean().refine(val => val === true, "You must accept the terms to continue"),
    }),
    z.object({
        type: z.literal("firm"),
        firmName: z.string().min(2, "Firm name must be at least 2 characters"),
        address: z.string().min(5, "Address must be at least 5 characters"),
        state: z.string().min(1, "State is required"),
        city: z.string().min(1, "City is required"),
        pincode: z.string().regex(/^\d{6}$/, "Invalid PIN code format"),
        gstLicense: z.string().min(1, "GST/Trade License is required"),
        firmPan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format").optional().or(z.literal("")),
        acceptance: z.boolean().refine(val => val === true, "You must accept the terms to continue"),
    })
]);

export type DSAStep1Data = z.infer<typeof dsaStep1Schema>;
export type DSAStep2Data = z.infer<typeof dsaStep2Schema>;
