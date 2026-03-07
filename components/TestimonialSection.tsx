import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CircleUserRound, StarIcon } from "lucide-react";
import { sanityClient, urlFor } from "@/sanity/client";
import { testimonialsQuery } from "@/sanity/queries";
import Image from "next/image";

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatar?: any;
  rating: number;
  featured: boolean;
}

const TestimonialSection = async () => {
  let testimonials: Testimonial[] = [];
  try {
    testimonials = await sanityClient.fetch(
      testimonialsQuery,
      {},
      { next: { revalidate: 60 } }
    );
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }

  // If no testimonials, show placeholder
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="w-full max-w-7xl mx-auto py-4 p-6 md:p-12 my-12">
        <div className="flex flex-col justify-center items-center-safe space-y-6 w-full">
          <div className="flex flex-col justify-center items-center-safe space-y-2 mb-18 text-center w-full">
            <span className="text-primary font-semibold leading-tight capitalize">
              testimonial
            </span>
            <h2 className="lg:text-4xl text-3xl font-bold">
              What&apos;s our customer{" "}
              <span className="text-primary">think about us</span>
            </h2>
          </div>
          <p className="text-muted-foreground">
            No testimonials available yet. Add some in the CMS!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto py-4 p-6 md:p-12 my-12">
      <div className="flex flex-col justify-center items-center-safe space-y-6 w-full">
        <div className="flex flex-col justify-center items-center-safe space-y-2 mb-18 text-center w-full">
          <span className="text-primary font-semibold leading-tight capitalize">
            testimonial
          </span>
          <h2 className="lg:text-4xl text-3xl font-bold">
            What&apos;s our customer{" "}
            <span className="text-primary">think about us</span>
          </h2>
        </div>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial._id}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-start h-72 py-4 px-6">
                      <span className="flex space-x-1 text-yellow-400 mb-4">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <StarIcon
                            key={starIndex}
                            className={`h-4 w-4 ${starIndex < testimonial.rating
                              ? "fill-current"
                              : "fill-gray-300 text-gray-300"
                              }`}
                          />
                        ))}
                      </span>
                      <span className="text-gray-600 line-clamp-6">
                        {testimonial.quote}
                      </span>
                      <span className="flex space-x-2 items-center mt-auto">
                        {testimonial.avatar ? (
                          <Image
                            src={urlFor(testimonial.avatar).width(40).height(40).url()}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <CircleUserRound className="h-10 w-10" />
                        )}
                        <span className="flex flex-col space-y-0.5">
                          <span className="font-bold">{testimonial.name}</span>
                          <span className="text-sm italic">
                            {testimonial.role}
                            {testimonial.company &&
                              ` at ${testimonial.company}`}
                          </span>
                        </span>
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;
