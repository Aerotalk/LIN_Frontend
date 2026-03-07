"use client";

import Link, { LinkProps } from "next/link";
import { useAffiliate } from "@/hooks/useAffiliate";
import React from "react";

interface PersistentLinkProps extends LinkProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const PersistentLink = ({ href, children, ...props }: PersistentLinkProps) => {
    const { getLinkWithRef } = useAffiliate();

    // Convert href to string if it's an object
    const hrefString = typeof href === 'string' ? href : href.pathname || '';

    return (
        <Link href={getLinkWithRef(hrefString)} {...props}>
            {children}
        </Link>
    );
};
