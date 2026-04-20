import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAppNumber(id: number | string | null | undefined): string {
  if (!id) return "";
  const prefix = "LN";
  const idStr = String(id);
  const targetLength = 11;
  const randomLen = targetLength - prefix.length - idStr.length; // usually 9 - id.length
  
  if (randomLen <= 0) {
    return prefix + idStr; // If ID is huge, just return prefix + ID
  }
  
  // Create a deterministic pseudo-random sequence so it does not change across re-renders
  const numId = typeof id === "number" ? id : parseInt(id, 10) || 0;
  // A simple hashing trick to generate 9 random-looking digits deterministically
  const pseudoRandomNumber = Math.abs(Math.sin(numId * 1234.5678) * 1000000000);
  let randomStr = Math.floor(pseudoRandomNumber).toString().padStart(9, '0');
  
  // Only take exactly what is needed
  randomStr = randomStr.substring(0, randomLen);
  
  return prefix + randomStr + idStr;
}
