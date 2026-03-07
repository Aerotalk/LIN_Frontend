export { metadata, viewport } from "next-sanity/studio";

export const runtime = "nodejs";

import { Suspense } from "react";

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div>Loading Studio...</div>}>{children}</Suspense>
    );
}
