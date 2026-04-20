import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAppNumber(id: number | string | null | undefined, aadhaar?: string): string {
  if (!id) return "";
  
  const prefix = "PDF";
  const year = new Date().getFullYear().toString();
  
  // Extract last 4 digits of Aadhaar, fallback to "0000"
  const cleanAadhaar = typeof aadhaar === 'string' ? aadhaar.replace(/\D/g, '') : '';
  const aaaa = cleanAadhaar.length >= 4 
    ? cleanAadhaar.slice(-4) 
    : cleanAadhaar.padStart(4, '0');
    
  // Format the ID to 5 digits (12345 -> '12345', 45 -> '00045')
  const serial = String(id).padStart(5, '0');
  
  return `${prefix}${year}${aaaa}${serial}`;
}
