import { defineType, defineField } from "sanity";

export default defineType({
    name: "career",
    title: "Career",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Job Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "employmentType",
            title: "Employment Type",
            type: "string",
            options: {
                list: [
                    { title: "Full-time", value: "Full-time" },
                    { title: "Part-time", value: "Part-time" },
                    { title: "Contract", value: "Contract" },
                    { title: "Remote", value: "Remote" },
                    { title: "Hybrid", value: "Hybrid" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "shortDescription",
            title: "Short Description",
            type: "text",
            rows: 3,
            description: "Brief overview of the position",
        }),
        defineField({
            name: "description",
            title: "Full Description",
            type: "array",
            of: [
                {
                    type: "block",
                },
            ],
        }),
        defineField({
            name: "requirements",
            title: "Requirements",
            type: "array",
            of: [{ type: "string" }],
            description: "List of job requirements",
        }),
        defineField({
            name: "responsibilities",
            title: "Responsibilities",
            type: "array",
            of: [{ type: "string" }],
            description: "List of job responsibilities",
        }),
        defineField({
            name: "qualifications",
            title: "Qualifications",
            type: "array",
            of: [{ type: "string" }],
            description: "Required qualifications",
        }),
        defineField({
            name: "applicationDeadline",
            title: "Application Deadline",
            type: "date",
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            description: "Toggle to show/hide this job posting",
            initialValue: true,
        }),
        defineField({
            name: "sortOrder",
            title: "Sort Order",
            type: "number",
            description: "Lower numbers appear first",
            initialValue: 0,
        }),
        defineField({
            name: "department",
            title: "Department",
            type: "string",
        }),
        defineField({
            name: "salary",
            title: "Salary Range",
            type: "object",
            fields: [
                {
                    name: "min",
                    title: "Minimum",
                    type: "number",
                },
                {
                    name: "max",
                    title: "Maximum",
                    type: "number",
                },
                {
                    name: "currency",
                    title: "Currency",
                    type: "string",
                    initialValue: "USD",
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "location",
            active: "isActive",
        },
        prepare({ title, subtitle, active }) {
            return {
                title: `${title} ${!active ? "(Inactive)" : ""}`,
                subtitle,
            };
        },
    },
});
