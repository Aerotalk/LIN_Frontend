import { groq } from "next-sanity";

// BLOG
export const allBlogPostsQuery = groq`
*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage
}
`;

export const blogPostBySlugQuery = groq`
*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage,
  content
}
`;

// CAREERS
export const activeCareersQuery = groq`
*[_type == "career" && isActive == true] 
| order(sortOrder asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  location,
  employmentType,
  shortDescription
}
`;

export const careerBySlugQuery = groq`
*[_type == "career" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  location,
  employmentType,
  shortDescription,
  description,
  requirements
}
`;

// TESTIMONIALS
export const testimonialsQuery = groq`
*[_type == "testimonial"] | order(publishedAt desc) {
  _id,
  name,
  role,
  company,
  quote,
  avatar,
  rating,
  featured
}
`;
