import { type SchemaTypeDefinition } from "sanity";
import blogPost from "./blogPost";
import career from "./career";
import testimonial from "./testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [blogPost, career, testimonial],
};
