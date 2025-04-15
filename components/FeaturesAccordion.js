"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const features = [
  {
    title: "Effortlessly Enhanced Captions",
    description:
      "Transform your videos with beautiful, accurate captions powered by advanced AI. No need to worry about syncing or styling – it's all done for you.",
    type: "image",
    path: "/assets/images/1.jpeg",
    svg: (
      <svg
        id='Lightning_Bolt_24'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
        <g transform="matrix(0.91 0 0 0.91 12 12)" >
          <path 
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'currentColor',
              fillRule: 'nonzero',
              opacity: 1
            }}
            transform="translate(-12.5, -12)"
            d="M 13 1 L 6 14 L 12 14 L 12 23 L 19 10 L 13 10 L 13 1 z"
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Customizable Styles",
    description:
      "Personalize your captions with fonts, colors, and stylish backgrounds. Stand out on social media or make your content more accessible.",
    type: "image",
    path: "/assets/images/2.jpeg",
    svg: (
      <svg
        id='Paint_Palette_24'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
        <g transform="matrix(0.83 0 0 0.83 12 12)" >
          <path 
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'currentColor',
              fillRule: 'nonzero',
              opacity: 1
            }}
            transform="translate(-15, -15)"
            d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 21.627 8.373000000000001 27 15 27 L 16 27 C 17.657 27 19 25.657 19 24 C 19 24 19 21.738 19 21 C 19 19.895 19.895 19 21 19 C 21.738 19 25 19 25 19 C 26.105 19 27 18.105 27 17 C 27 17 27 15.625 27 15 C 27 8.373 21.627 3 15 3 z M 15 5 C 16.105 5 17 5.895 17 7 C 17 8.105 16.105 9 15 9 C 13.895 9 13 8.105 13 7 C 13 5.895 13.895 5 15 5 z M 7 17 C 5.895 17 5 16.105 5 15 C 5 13.895 5.895 13 7 13 C 8.105 13 9 13.895 9 15 C 9 16.105 8.105 17 7 17 z M 14.5 25 C 13.119 25 12 23.881 12 22.5 C 12 21.119 13.119 20 14.5 20 C 15.881 20 17 21.119 17 22.5 C 17 23.881 15.881 25 14.5 25 z M 23 17 C 21.895 17 21 16.105 21 15 C 21 13.895 21.895 13 23 13 C 24.105 13 25 13.895 25 15 C 25 16.105 24.105 17 23 17 z M 22.071 10.757 C 21.290000000000003 11.538 20.024 11.538 19.243000000000002 10.757 C 18.462000000000003 9.975999999999999 18.462000000000003 8.709999999999999 19.243000000000002 7.929 C 20.024 7.148000000000001 21.290000000000003 7.148000000000001 22.071 7.929 C 22.852 8.71 22.852 9.976 22.071 10.757 z M 7.929 10.757 C 7.148000000000001 9.975999999999999 7.148000000000001 8.709999999999999 7.929 7.929 C 8.71 7.148000000000001 9.976 7.148000000000001 10.757 7.929 C 11.537999999999998 8.71 11.538 9.976 10.757 10.757 C 9.976 11.538 8.71 11.538 7.929 10.757 z"
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Share-Ready Results",
    description:
      "Download professional, captioned videos in minutes. Perfect for creators looking to level up their content with ease.",
    type: "image",
    path: "/assets/images/3.jpeg",
    alt: "Learning Management System Support",
    svg: (
      <svg
        id='Laptop_24'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
        <g transform="matrix(0.67 0 0 0.67 12 12)" >
          <path 
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'currentColor',
              fillRule: 'nonzero',
              opacity: 1
            }}
            transform="translate(-15, -15.5)"
            d="M 5 5 C 3.3550302 5 2 6.3550302 2 8 L 2 21 C 2 21.768584 2.3041249 22.466647 2.7871094 23 L 0 23 C 0 24.657 1.343 26 3 26 L 27 26 C 28.657 26 30 24.657 30 23 L 27.212891 23 C 27.695875 22.466647 28 21.768584 28 21 L 28 8 C 28 6.3550302 26.64497 5 25 5 L 5 5 z M 5 7 L 25 7 C 25.56503 7 26 7.4349698 26 8 L 26 21 C 26 21.56503 25.56503 22 25 22 L 5 22 C 4.4349698 22 4 21.56503 4 21 L 4 8 C 4 7.4349698 4.4349698 7 5 7 z"
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
];

const Item = ({ feature, isOpen, setFeatureSelected }) => {
  const accordion = useRef(null);
  const { title, description, svg } = feature;

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-medium text-left md:text-lg"
        onClick={(e) => {
          e.preventDefault();
          setFeatureSelected();
        }}
        aria-expanded={isOpen}
      >
        <span className={`duration-100 ${isOpen ? "text-primary" : ""}`}>
          {svg}
        </span>
        <span
          className={`flex-1 text-base-content ${
            isOpen ? "text-primary font-semibold" : ""
          }`}
        >
          <h3 className="inline">{title}</h3>
        </span>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out text-base-content-secondary overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{description}</div>
      </div>
    </li>
  );
};

const Media = ({ feature }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { type, path, alt } = feature;
  const style = `rounded-2xl ${isMobile ? 'aspect-[5/3]' : 'aspect-square'} w-full sm:w-[26rem]`;

  if (type === "image") {
    return (
      <Image
        src={path}
        alt={alt}
        className={`${style} object-cover object-center`}
        width={500}
        height={isMobile ? 300 : 500}
        priority={true}
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 640px) 100vw, 26rem"
      />
    );
  }

  return <div className={`${style} !border-none`}></div>;
};

const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState(0);

  return (
    <section
      className="py-16 md:py-24 space-y-20 md:space-y-28 max-w-7xl mx-auto bg-base-100 "
      id="features"
    >
      <div className="px-8">
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
          Why
          <span className="bg-neutral text-neutral-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
            Cool Captions?
          </span>
        </h2>
        <div className=" flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
            <ul className="w-full">
              {features.map((feature, i) => (
                <Item
                  key={feature.title}
                  index={i}
                  feature={feature}
                  isOpen={featureSelected === i}
                  setFeatureSelected={() => setFeatureSelected(i)}
                />
              ))}
            </ul>

            <Media feature={features[featureSelected]} key={featureSelected} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;
