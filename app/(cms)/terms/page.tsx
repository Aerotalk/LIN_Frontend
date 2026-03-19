import { sanityClient } from "@/sanity/client";
import { termsOfServiceQuery } from "@/sanity/queries";

export default async function TermsPage() {
    const terms = await sanityClient.fetch(termsOfServiceQuery);

    return (
        <div className="max-w-3xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <p className="text-lg text-gray-700 mb-12"> Following are the terms and conditions for using our website. By accessing or using our services, you agree to be bound by these terms. Please read them carefully.</p>
            <div className="space-y-8">
                {terms.map((term: any) => (
                    <div key={term._key}>
                        <h2 className="text-2xl font-semibold mb-4">{term.title}</h2>
                        <p className="text-gray-700 mb-4">{term.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}