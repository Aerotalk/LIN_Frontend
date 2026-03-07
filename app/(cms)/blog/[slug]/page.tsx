import { sanityClient } from "@/sanity/client";
import { blogPostBySlugQuery, allBlogPostsQuery } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const dynamic = "force-dynamic";

interface BlogPost {
  title: string;
  content: any;
  coverImage?: SanityImageSource;
  publishedAt: string;
  excerpt?: string;
  categories?: string[];
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await sanityClient.fetch<{ slug: string }[]>(
      allBlogPostsQuery
    );
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error("Error fetching blog posts for static params:", error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityClient.fetch<BlogPost>(blogPostBySlugQuery, {
    slug,
  });

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-10 dark:from-gray-900 dark:to-gray-800 md:mt-12 mt-24 max-w-7xl mx-auto py-4 p-4 md:p-12 lg:p-20">
        <div className="rounded-xl bg-white p-12 text-center shadow-lg dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Post not found
          </h2>
          <Link
            href="/blog"
            className="mt-4 inline-block text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(600).url()
    : null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 md:mt-12 mt-24 max-w-7xl mx-auto py-4 p-4 md:p-12 lg:p-20">
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mb-4 text-xl text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </p>
        </header>

        {/* Cover Image */}
        {imageUrl && (
          <div className="mb-8 overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative h-[400px] w-full">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-blue mx-auto max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl prose-img:shadow-lg dark:prose-a:text-blue-400">
          <PortableText value={post.content} />
        </div>
      </article>
    </main>
  );
}
