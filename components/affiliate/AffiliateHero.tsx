"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useAffiliate } from '@/hooks/useAffiliate';
import { AffiliateApplicationModal } from './AffiliateApplicationModal';

export default function HeroSection() {
    const { getLinkWithRef } = useAffiliate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="bg-gradient-to-br from-red-50 to-orange-50 pt-32 pb-20 px-4 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between lg:gap-16">
                <div className="flex flex-col gap-4 w-full md:w-3/5">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={getLinkWithRef("/")}>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-primary font-medium">
                                    Affiliate Program
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="space-y-2">
                        <h2 className="lg:text-5xl text-3xl font-bold leading-tight">
                            <span className="text-primary">LoanInNeed Affiliate Program </span>
                            - Partner with Us & Earn Generous Commissions
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 leading-snug lg:max-w-[40rem]">
                        Welcome to LoanInNeed&apos;s Affiliate Program, your gateway to earning substantial income by connecting people with instant financial solutions. As India&apos;s leading digital credit provider, we offer a lucrative affiliate partnership opportunity for bloggers, content creators, website owners, social media influencers, and digital marketers.
                    </p>
                    <div className="mt-4">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            size="lg"
                            className="px-10 py-6 text-lg font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg bg-red-600 hover:bg-red-700"
                        >
                            Become a Partner
                        </Button>
                    </div>
                </div>

                {/* Right side placeholder for future image */}
                <div className="w-full md:w-2/5 mt-12 md:mt-0 flex items-center justify-center">
                    <div className="relative w-full aspect-square md:aspect-auto md:h-[450px]">
                        <Image
                            src="/affiliate-hero.png"
                            alt="LoanInNeed Affiliate Program Hero"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Modal for Affiliate Application */}
            <AffiliateApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}
