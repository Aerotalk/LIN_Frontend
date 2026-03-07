import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Business Consultant Dashboard | LoanINNeed",
    description: "Manage your Business Consultant earnings and performance.",
};

import { Suspense } from "react";

export default function BCDashboardLayout({
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
                <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                }>
                    {children}
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
