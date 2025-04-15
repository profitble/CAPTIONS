"use client";

import { useRef, useState } from "react";

const faqList = [
  {
    question: "How does this work?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Upload your video, and our AI instantly generates perfectly synced captions. Customize the look, download, and share polished videos in minutes.
      </div>
    ),
  },
  {
    question: "What video formats do you support?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        We support MP4, MOV, AVI, and more&mdash;no need for file conversions. Just upload your video, and we&apos;ll handle everything.
      </div>
    ),
  },
  {
    question: "Can I customize my captions?", 
    answer: (
      <div className="space-y-2 leading-relaxed">
        Yes, choose from fonts, colors, and stylish backgrounds to match your brand. Make every video look professional and unique.
      </div>
    ),
  },
  {
    question: "Is it better than manual captioning?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Cool Captions saves you hours by automating everything with perfect accuracy. Get professional results without any effort.
      </div>
    ),
  },
  {
    question: "Will this work on my device?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Our web-based app works on any device—no downloads needed. Create professional captions anywhere, anytime.
      </div>
    ),
  },
];

const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="border-b border-base-content/10 last:border-b-0">
      <button
        className="relative flex gap-2 items-center w-full py-4 text-base font-semibold text-left border-t md:text-lg border-base-content/10 first:border-t-0"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span className={`flex-1 text-gray-900 ${isOpen ? "text-primary" : ""}`}>
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="7" width="16" height="2" rx="1" />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className="transition-all duration-300 ease-in-out text-gray-600"
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-4 leading-relaxed text-base">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-white py-8" id="faq">
      <div className="px-4 max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col text-center">
          <p className="inline-block font-semibold text-primary mb-2">FAQ</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="w-full">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
