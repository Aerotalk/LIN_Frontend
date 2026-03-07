import Link from "next/link";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { format } from "date-fns";
import { urlFor } from "@/sanity/lib/image";

interface BlogCardProps {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: SanityImageSource;
  publishedAt: string;
  categories?: string[];
  featured?: boolean;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  categories,
  featured = false,
}: BlogCardProps) {
  const imageUrl = coverImage ? urlFor(coverImage).width(800).height(400).url() : '/blog-img.png';
  const formattedDate = format(new Date(publishedAt), "dd MMM, yyyy");
  
  // Calculate read time based on excerpt or default
  const readTime = excerpt ? `${Math.ceil(excerpt.length / 200)} min read` : "09 min read";

  return (
    <Link href={`/blog/${slug}`}>
      <article 
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Default illustration - building with DEBT sign */}
              <div className="text-center">
                <div className="inline-block bg-blue-300 rounded-lg px-8 py-2 mb-2">
                  <span className="text-white font-bold text-xl">DEBT</span>
                </div>
                <div className="flex justify-center gap-2">
                  <div className="w-12 h-24 bg-blue-400 rounded-t-lg"></div>
                  <div className="w-12 h-32 bg-blue-500 rounded-t-lg"></div>
                  <div className="w-12 h-20 bg-blue-400 rounded-t-lg"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-500 transition-colors line-clamp-2 flex-1">
            {title}
          </h3>
          
          {excerpt && !featured && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{excerpt}</p>
          )}
          
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-auto">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}