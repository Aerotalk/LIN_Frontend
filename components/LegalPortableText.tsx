import { PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

export const legalPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
    h1: ({ children }) => <h1 className="mt-8 mb-4 text-4xl font-bold text-gray-900">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-8 mb-4 text-3xl font-semibold text-gray-900">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 mb-3 text-2xl font-semibold text-gray-900">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-6 mb-3 text-xl font-medium text-gray-900">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-red-500 bg-gray-50 p-4 mb-4 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <Link
          href={value?.href || "#"}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-red-600 hover:text-red-700 hover:underline transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
};
