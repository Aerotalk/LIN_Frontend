import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<div className="h-16 w-full bg-red-50" />}>
        <Navbar />
      </Suspense>
      <main>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
