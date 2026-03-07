"use client";

import { useCallback, useEffect, useState } from "react";

export const useAffiliate = () => {
    const [refFromUrl, setRefFromUrl] = useState<string | null>(null);

    useEffect(() => {
        // Avoid Next.js `useSearchParams()` to prevent prerender/Suspense build errors.
        // This runs only on the client after hydration.
        const ref = new URLSearchParams(window.location.search).get("ref");
        setRefFromUrl(ref);

        if (ref) {
            sessionStorage.setItem("affiliate_ref", ref);
        }
    }, []);

    const getRef = useCallback(() => {
        return refFromUrl || (typeof window !== "undefined" ? sessionStorage.getItem("affiliate_ref") : null);
    }, [refFromUrl]);

    const getLinkWithRef = useCallback((path: string) => {
        const currentRef = getRef();
        if (!currentRef) return path;

        const url = new URL(path, typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
        url.searchParams.set("ref", currentRef);
        return url.pathname + url.search;
    }, [getRef]);

    return {
        affiliateRef: getRef(),
        getLinkWithRef
    };
};
