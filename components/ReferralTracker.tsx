"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { toast } from "sonner";

function ReferralTrackerContent() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const pid = searchParams.get("pid");
        const ts = searchParams.get("ts");
        const sig = searchParams.get("sig");

        if (pid && ts && sig) {
            // Store attribution data
            const attributionData = {
                partnerId: pid,
                timestamp: ts,
                signature: sig,
                capturedAt: Date.now()
            };

            localStorage.setItem("lin_attribution", JSON.stringify(attributionData));
            console.log("✅ Referral attributed to Partner ID:", pid);
        }
    }, [searchParams]);

    return null;
}

export default function ReferralTracker() {
    return (
        <Suspense fallback={null}>
            <ReferralTrackerContent />
        </Suspense>
    );
}
