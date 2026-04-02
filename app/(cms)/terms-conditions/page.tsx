import { sanityClient } from "@/sanity/client";
import { legalPageByIdQuery } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import { legalPortableTextComponents } from "@/components/LegalPortableText";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 60;

interface LegalPage {
  title: string;
  content: any;
  lastUpdated?: string;
}

export default async function TermsAndConditionsPage() {
  const page = await sanityClient.fetch<LegalPage>(legalPageByIdQuery, {
    id: "termsConditions",
  });

  if (!page) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-10 md:mt-12 mt-24 max-w-7xl mx-auto py-4">
        <div className="rounded-xl bg-white p-12 text-center shadow-lg dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Page not found
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Please publish a Legal page with the slug "terms-conditions" in Sanity CMS.
          </p>
          <Link href="/" className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition dark:bg-blue-600 dark:hover:bg-blue-700">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = page.lastUpdated
    ? new Date(page.lastUpdated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen md:mt-12 mt-24 pt-28 pb-4 px-4 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <header className="mb-10 border-b-2 border-gray-300 dark:border-gray-700 pb-8 text-center sm:text-left">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {page.title}
          </h1>
          {formattedDate && (
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Last updated: {formattedDate}
            </p>
          )}
        </header>

        <div className="mx-auto max-w-none text-gray-800 dark:text-gray-200">
          <PortableText value={page.content} components={legalPortableTextComponents} />
        </div>
      </article>
    </main>
  );
}
