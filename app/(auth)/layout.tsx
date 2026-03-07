import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get low rate personal loans within minutes | LoanINNeed",
  description:
    "Get ₹5000 - ₹1L personal payday loans at a low rate of interest. Have a CIBIL less than 700, no issue we offer loans at CIBIL starting from 650+. Apply now!",
  keywords: [
    "low rate loan",
    "personal loan with low interest",
    "Insta personal loan",
    "payday loan with low interest",
  ],
};

import { Suspense } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <Suspense
        fallback={
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        }
      >
        {children}
      </Suspense>
    </main>
  );
}
