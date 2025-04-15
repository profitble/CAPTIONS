'use client';

import ButtonCheckout from "./ButtonCheckout";
import TestimonialsAvatars from "@/components/TestimonialsAvatars";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { IoIosCheckmarkCircle, IoIosStar, IoIosCloseCircleOutline } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const MobileHero = () => (
    <section className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-4">
        <TestimonialsAvatars />
        
        <div>
          <h1 className="text-[2.25rem] font-black tracking-tight mb-1 leading-[1.1]">
            AI Dynamic Captions
          </h1>
          <h2 className="text-lg text-gray-600 leading-snug">
            Generate Viral Captions Effortlessly
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {[
            'Create more content in less time',
            'Fully customizable caption styles', 
            'Whisper AI + GPT-4 enhanced transcription',
            'Export-ready in multiple formats'
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <IoIosCheckmarkCircle className="w-5 h-5 text-black flex-shrink-0" />
              <span className="text-base text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        <ButtonCheckout buttonText="Try For $29/month" variantId="656650" />

        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { value: '10x', label: 'Faster Workflows' },
            { value: '530K+', label: 'Active Users' },
            { value: '10M+', label: 'Videos Captioned' }
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-black text-xl">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const DesktopHero = () => (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
        {/* Left Column */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Social Proof */}
          <TestimonialsAvatars />

          {/* Heading */}
          <div>
            <h1 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-black tracking-tight mb-2 leading-[1.1]">
              AI Dynamic Captions
            </h1>
            <h2 className="text-xl sm:text-2xl text-gray-500 leading-snug">
              Generate Viral Captions Effortlessly
            </h2>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {[
              { text: 'Create more content in', bold: 'less time' },
              { text: 'Fully', bold: 'customizable caption styles' },
              { text: 'Whisper AI + GPT-4', bold: 'enhanced transcription' },
              { text: 'Export-ready in', bold: 'multiple formats' }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <IoIosCheckmarkCircle className="w-5 h-5 text-black" />
                </div>
                <span className="text-base sm:text-[0.9375rem] text-gray-600">
                  {feature.text} <span className="font-bold text-gray-900">{feature.bold}</span>
                </span>
              </div>
            ))}
          </div>

          <ButtonCheckout buttonText="Try For $29/mo" />

          {/* Trust Badges */}
          <div className="flex text-xs sm:text-[0.9375rem] text-gray-500">
            <div className="flex w-full justify-between items-center">
              {/* Left badge */}
              <div className="flex items-center gap-1">
                <IoIosStar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span>Satisfaction Guaranteed</span>
              </div>
              
              {/* Center badge */}
              <div className="flex items-center gap-1">
                <IoIosCloseCircleOutline className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span>Cancel Anytime</span>
              </div>

              {/* Right badge */}
              <div className="flex items-center gap-1">
                <BiSupport className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {[
              { value: '10x', label: 'Faster Workflows' },
              { value: '530K+', label: 'Active Users' },
              { value: '10M+', label: 'Videos Captioned' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-black text-xl sm:text-2xl lg:text-3xl">{stat.value}</div>
                <div className="text-sm sm:text-[0.9375rem] text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Demo */}
        <div className="relative mt-6 lg:mt-0">
          <div className="w-full rounded-2xl overflow-hidden">
            <TestimonialsCarousel />
          </div>
        </div>
      </div>
    </section>
  );

  return isMobile ? <MobileHero /> : <DesktopHero />;
};

export default Hero;
