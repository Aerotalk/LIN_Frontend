import { sanityClient } from "@/sanity/client";
import { allBlogPostsQuery } from "@/sanity/queries";
import BlogCard from "@/components/blog/BlogCard";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Search } from "lucide-react";
import FootCTA from "@/components/FootCTA";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const dynamic = "force-dynamic";

interface BlogPostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: SanityImageSource;
  publishedAt: string;
  categories?: string[];
}

export const revalidate = 60; // ISR

export default async function BlogPage() {
  let posts: BlogPostSummary[] = [];
  try {
    posts = await sanityClient.fetch(allBlogPostsQuery);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 mt-20">
        <div className="items-center justify-between gap-16 flex flex-col md:flex-row w-full max-w-7xl mx-auto py-4 p-4">
        <div className="flex flex-col gap-4 w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-medium">
                  Blogs
                </BreadcrumbPage>
              </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="space-y-2 w-full md:w-10/12 lg:w-8/12">
          <h2 className="lg:text-5xl text-3xl font-bold leading-snug">
            <span className="text-primary">Blogs: </span>
            Your Guide to Quick Loans & Finance
          </h2>
        </div>
        <p className="text-lg text-gray-600 leading-tight">Explore expert tips, guides, and insights on instant loans, personal finance, and money management. Our blog helps you make smarter borrowing decisions and manage urgent financial needs with confidence.</p>
      </div>
      <Image
        src={'/blog-hero.png'}
        alt="Hero Image"
        width={300}
        height={300}
        className="ml-8 w-8/12 h-full object-cover md:block md:w-1/2"
      />
      </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-6 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[200px] cursor-pointer"
            >
              <option>Category: All</option>
              <option>Personal Loans</option>
              <option>Finance Tips</option>
              <option>Debt Management</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search topic..."
              className="w-full bg-white border border-gray-300 rounded-lg px-6 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => (
                <BlogCard key={post._id} {...post} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                Load more
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-xl bg-white p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              No posts yet
            </h2>
            <p className="mt-2 text-gray-600">
              Check back later for new content!
            </p>
          </div>
        )}
      </section>

      <FootCTA />
    </div>
  );
}