"use client";

import { useState, useEffect } from "react";
import { LEMONSQUEEZY } from "@/config";
import ButtonCheckout from "./ButtonCheckout";
import { BsLightningChargeFill } from "react-icons/bs";
import { HiOutlineTrophy } from "react-icons/hi2";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaGooglePay, FaApplePay } from "react-icons/fa";
import Image from "next/image";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('hobby');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check URL params or localStorage for saved preference
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get('plan');
    const savedPlan = localStorage.getItem('selectedPlan');
    
    if (planParam && ['hobby', 'pro'].includes(planParam)) {
      setSelectedPlan(planParam);
    } else if (savedPlan && ['hobby', 'pro'].includes(savedPlan)) {
      setSelectedPlan(savedPlan);
    }
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    localStorage.setItem('selectedPlan', plan);
  };

  if (!isClient) {
    return null; // or a loading skeleton
  }

  return (
    <section className="bg-white overflow-hidden" id="pricing">
      <div className="py-6 sm:py-8 px-4 sm:px-6 max-w-2xl mx-auto">
        {/* You Save 45% Image */}
        <div className="flex justify-center -mb-6 sm:-mb-8 relative">
          <Image
            src="/assets/images/pop.png"
            alt="You Save 45%"
            width={300}
            height={80}
            className="w-[200px] sm:w-[270px] object-contain"
          />
        </div>

        {/* Plan Toggle */}
        <div className="flex justify-center mb-6 sm:mb-8 relative z-20">
          <div className="inline-flex p-1 bg-gray-100 rounded-full">
            <button
              onClick={() => handlePlanSelect('hobby')}
              className={`px-4 sm:px-6 py-2 rounded-full text-base font-medium transition-all duration-300 ease-in-out ${
                selectedPlan === 'hobby' ? 'bg-white shadow-sm' : 'text-gray-500'
              }`}
            >
              Hobby
            </button>
            <button
              onClick={() => handlePlanSelect('pro')}
              className={`px-4 sm:px-6 py-2 rounded-full text-base font-medium transition-all duration-300 ease-in-out ${
                selectedPlan === 'pro' ? 'bg-white shadow-sm' : 'text-gray-500'
              }`}
            >
              Pro
            </button>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center px-2 sm:px-0">
          <div className="w-full max-w-lg bg-white rounded-[30px] sm:rounded-[40px] p-5 sm:p-7 shadow-xl">
            {/* Header */}
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl mb-2 sm:mb-3 relative">
                <span className="transition-all duration-1500 ease-in-out opacity-100">
                  {selectedPlan === 'hobby' ? (
                    <>
                      <span className="text-gray-600">Up to</span>{" "}
                      <span className="font-bold text-[#0B0F1C]">30 Videos</span>{" "}
                      <span className="text-gray-600">Per Month</span>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-600">Unlimited</span>{" "}
                      <span className="font-bold text-[#0B0F1C]">Videos</span>{" "}
                      <span className="text-gray-600">Per</span>{" "}
                      <span className="font-bold text-[#0B0F1C]">Month</span>
                    </>
                  )}
                </span>
              </h2>
              <div className="text-[32px] sm:text-[42px] font-black text-[#0B0F1C] tracking-tight mb-2 transition-all duration-1500 ease-in-out">
                {selectedPlan === 'hobby' ? (
                  <>$29/month</>
                ) : (
                  <>$59/month</>
                )}
              </div>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <BsLightningChargeFill className="text-yellow-400 w-4 h-4" />
                <span className="text-base">Limited Time Offer</span>
              </p>
            </div>

            {/* CTA Button */}
            <div className="mb-6">
              <ButtonCheckout 
                variantId={selectedPlan === 'hobby' ? LEMONSQUEEZY.hobbyVariantId : LEMONSQUEEZY.proVariantId}
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
              {[
                { text: '4K + 60 FPS' },
                { text: 'Professional Quality' },
                { text: 'Multiple Video Formats' },
                { text: 'Premium Caption Themes' },
                { text: '10M+ Videos Captioned' },
                { text: '530K+ Active Users' }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-gray-50 flex items-center justify-center">
                    <svg className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-[#0B0F1C]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-base sm:text-sm text-[#0B0F1C]">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center text-gray-500 text-base sm:text-sm mb-4 sm:mb-6">
              <div className="border-b pb-4">
                <span className="transition-all duration-1500 ease-in-out">
                  Cancel Anytime | Satisfaction Guaranteed 
                </span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-12 sm:w-14 h-8 sm:h-9 bg-white border border-gray-500 rounded-[4px] shadow-sm flex items-center justify-center">
                  <FaCcVisa className="w-10 sm:w-12 h-6 sm:h-7 text-[#1A1F71]" />
                </div>
                <div className="w-12 sm:w-14 h-8 sm:h-9 bg-white border border-gray-500 rounded-[4px] shadow-sm flex items-center justify-center">
                  <FaCcMastercard className="w-10 sm:w-12 h-6 sm:h-7 text-[#EB001B]" />
                </div>
                <div className="w-12 sm:w-14 h-8 sm:h-9 bg-white border border-gray-500 rounded-[4px] shadow-sm flex items-center justify-center">
                  <FaCcAmex className="w-10 sm:w-12 h-6 sm:h-7 text-[#2E77BB]" />
                </div>
                <div className="w-12 sm:w-14 h-8 sm:h-9 bg-white border border-gray-500 rounded-[4px] shadow-sm flex items-center justify-center">
                  <FaGooglePay className="w-10 sm:w-12 h-6 sm:h-7 text-[#5F6368]" />
                </div>
                <div className="w-12 sm:w-14 h-8 sm:h-9 bg-white border border-gray-500 rounded-[4px] shadow-sm flex items-center justify-center">
                  <FaApplePay className="w-10 sm:w-12 h-6 sm:h-7 text-black" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <HiOutlineTrophy className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="text-base sm:text-sm font-semibold">10M+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
