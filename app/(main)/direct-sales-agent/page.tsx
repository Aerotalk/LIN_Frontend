"use client"
import React, { useState } from 'react';
import { ChevronDown, CheckCircle, FileText, Building, CreditCard, User, Users, TrendingUp, Award, Target, Zap } from 'lucide-react';
import FAQSection from '@/components/FAQSection';
import { DSAApplicationModal } from '@/components/dsa/DSAApplicationModal';
import { useAffiliate } from '@/hooks/useAffiliate';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export const dynamic = "force-dynamic";

function DSAPartnerContent() {
  const { getLinkWithRef } = useAffiliate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dsaFAQData = [
    {
      question: "How do risk with Loan as an a Loan Need DSA Partner?",
      answer: "Getting started is simple. Register online, submit your documents, and once verified, you can start referring customers and earning commissions."
    },
    {
      question: "Is there any registration fee to become a DSA partner?",
      answer: "No, there is no registration fee. Becoming a DSA partner with LoaniNeeds is completely free."
    },
    {
      question: "Can I run/manage a current job while being myself DSA Partner?",
      answer: "Yes, you can continue your current job while working as a DSA partner. It offers flexible working hours that fit your schedule."
    },
    {
      question: "How long does the registration process take to become a DSA Partner?",
      answer: "The registration process typically takes 3-5 business days after all documents are submitted and verified."
    },
    {
      question: "What Support will I receive from LoaniNeeds as DSA Partner?",
      answer: "You'll receive comprehensive support including training materials, marketing collateral, dedicated relationship manager, and technical support."
    },
    {
      question: "Do I need prior experience in the finance industry to become a DSA Partner?",
      answer: "No prior experience is required. We provide complete training and support to help you succeed as a DSA partner."
    },
    {
      question: "How will receive my commission payment?",
      answer: "Commissions are paid directly to your bank account on a monthly basis after the loan disbursement is completed."
    },
    {
      question: "Who is the minimum required of a referral 'LoaniNeed'?",
      answer: "There is no minimum requirement. You can start referring customers immediately after registration."
    },
    {
      question: "Can I operate from any city in India as an LoaniNeeds DSA Partner?",
      answer: "Yes, you can operate from any city in India. Our DSA partner program is available pan-India."
    },
    {
      question: "Who Can Become a LoaniNeeds DSA Partner?",
      answer: "Anyone who meets the eligibility criteria including individuals, proprietors, and companies can become a DSA partner."
    }
  ];

  return (
    <div className="min-h-screen w-full md:mt-12 mt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 pt-16 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Breadcrumb className="mb-4">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={getLinkWithRef("/")}>Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-red-500 font-medium">
                      DSA Partnership
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Start Your Loan Business<br />
                <span className="text-red-500">with India&apos;s Leading Digital</span><br />
                Instant Loan Provider
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Are you looking forward to being a lending partner in credit services? Leading businesses require trusted credit providers to support their growth needs.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Want to start a career in the Loan Lending Industry? MSME lending credit, retail-credit lending, affordable home loans on Aadhaar? Do you want a strategic direct-credit provider with modern fintech facilities to assist? Here at LoaniNeed, an FTA for credit companies, we help you.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                Become a Direct Sales Agent
              </button>
            </div>

            {/* Right side placeholder - as requested, empty for now */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full h-80 md:h-[450px]">
                <Image
                  src="/dsa-hero.png"
                  alt="LoanInNeed DSA Partner Hero"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <DSAApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* What is a Loan DSA Agent Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Who is a <span className="text-red-500">Loan DSA Agent?</span>
          </h2>
          <div className="text-gray-700 space-y-6 leading-relaxed text-lg">
            <p>
              <strong>Loan DSA Agent</strong> (DSA) works as a main Direct Selling Agent/Channel (DSA/DSC) and platforms connecting banks to retail-creditory. As a Loan DSA agent, you&apos;ll connect millions of customers in India who may need loan assistance or lending credit access to trusted resources.
            </p>
            <ul className="space-y-4 ml-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>Sourcing and connecting with business partners who seek lending finances with companies who can offer lending assistance.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>For customization to market plans in services such as (SEI) the source, Skill Review, and management as process and data-manager role.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>The idea being to create your own being dedicated businesses to various financial.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>Proven by your loyalty and for the performers to accept more credit.</span>
              </li>
            </ul>
            <p className="mt-8">
              A great DSA program is like running your own store. However if you do not require financing credit, other credit services [instant] arrangements [have to be decided in partners], that&apos;s always the path a facility or office if you apply to it, you can easily stand business if not currently.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-red-500 font-semibold mb-2">Why should we be coming?</p>
          </div>
          <h2 className="text-4xl font-bold text-center mb-16">
            Why should I join <span className="text-red-500">LoaniNeeds as a DSA Partner?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Attractive Commission Structure</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Earning potential basis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Upfront + trailing commission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>No cap on earnings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Attractive incentive programs</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Zero Investment Required</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>No franchise or security</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Zero investment fee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Complete support from LoaniNeeds</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Working Hours</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Work at your own pace</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>No need for an office</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Can continue current job</span>
                </li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Digital Process</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>100% digital on-boarding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Login anytime, anywhere</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Track applications easily</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Paperless documentation</span>
                </li>
              </ul>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ongoing Partner Support</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Full day partner-support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Training sessions support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Marketing material provided</span>
                </li>
              </ul>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">High Growth Industry</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Huge market demand</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Growing loan industry</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Multiple loan products</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Pan India opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            What are the documents required for <span className="text-red-500">DSA Registration?</span>
          </h2>

          {/* Individual Partners */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">For Individual Partners</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-yellow-100 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <FileText className="w-12 h-12 text-yellow-600" />
                </div>
                <p className="font-semibold text-gray-900">PAN Card and A Aadhaar Card</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Building className="w-12 h-12 text-green-600" />
                </div>
                <p className="font-semibold text-gray-900">Active mobile number</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <CreditCard className="w-12 h-12 text-orange-600" />
                </div>
                <p className="font-semibold text-gray-900">Valid email address</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-900">Bank account details</p>
              </div>
            </div>
          </div>

          {/* Firms/Companies */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">For Firms/Companies</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <FileText className="w-12 h-12 text-purple-600" />
                </div>
                <p className="font-semibold text-gray-900">GST Pan/Aadhaar of director</p>
              </div>
              <div className="text-center">
                <div className="bg-cyan-100 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Building className="w-12 h-12 text-cyan-600" />
                </div>
                <p className="font-semibold text-gray-900">MoA Copy of the business entity</p>
              </div>
              <div className="text-center">
                <div className="bg-pink-100 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <CreditCard className="w-12 h-12 text-pink-600" />
                </div>
                <p className="font-semibold text-gray-900">Address proof of business entity</p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <User className="w-12 h-12 text-indigo-600" />
                </div>
                <p className="font-semibold text-gray-900">Partnership deed or certificate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-gray-600">As a way out of poverty</p>
          </div>
          <h2 className="text-4xl font-bold text-center mb-4">
            What are the eligibility criteria to become
          </h2>
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-red-500">LoaniNeeds DSA Partner?</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            You cannot be enrolled as DSA broker for LoaniNeeds if you qualify with certain provided with marks provided
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <User className="w-12 h-12 text-yellow-600" />
              </div>
              <p className="font-semibold text-gray-900">You be 18 years or above of age</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <FileText className="w-12 h-12 text-green-600" />
              </div>
              <p className="font-semibold text-gray-900">Should be Resident of Class of India</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Award className="w-12 h-12 text-pink-600" />
              </div>
              <p className="font-semibold text-gray-900">At minimum qualification required</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Building className="w-12 h-12 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-900">Owner of an/organized business can be an/organized</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              Become a Loan DSA Partner
            </h2>
            <p className="text-white text-lg mb-8 opacity-90">
              Start your own loan business with India&apos;s leading digital instant loan provider. Apply now!
            </p>
            <button className="bg-white text-red-500 hover:bg-gray-100 px-10 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Register Now
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqData={dsaFAQData}
      />
    </div>
  );
}

export default function DSAPartnerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
      </div>
    }>
      <DSAPartnerContent />
    </Suspense>
  );
}