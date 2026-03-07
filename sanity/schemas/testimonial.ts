import { defineType, defineField } from "sanity";

export default defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Customer Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "role",
            title: "Role/Position",
            type: "string",
            description: "e.g., CEO, Manager, Customer",
        }),
        defineField({
            name: "company",
            title: "Company",
            type: "string",
        }),
        defineField({
            name: "quote",
            title: "Testimonial Quote",
            type: "text",
            rows: 5,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "avatar",
            title: "Avatar Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: "alt",
                    type: "string",
                    title: "Alternative text",
                },
            ],
        }),
        defineField({
            name: "rating",
            title: "Rating",
            type: "number",
            validation: (Rule) =>
                Rule.required().min(1).max(5).integer().error("Rating must be between 1 and 5"),
            initialValue: 5,
        }),
        defineField({
            name: "featured",
            title: "Featured Testimonial",
            type: "boolean",
            description: "Mark as featured to highlight this testimonial",
            initialValue: false,
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            validation: (Rule) => Rule.required(),
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "company",
            media: "avatar",
            rating: "rating",
        },
        prepare({ title, subtitle, media, rating }) {
            return {
                title,
                subtitle: `${subtitle || "No company"} - ${rating} stars`,
                media,
            };
        },
    },
});
