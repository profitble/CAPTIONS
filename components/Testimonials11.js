"use client";

import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import Image from "next/image";

const Testimonials11 = () => {
  const testimonials = [
    {
      name: "@ruinedbymo",
      date: "168K", 
      text: "Cool Captions transformed our video production process. It's <b>fast</b>, reliable, and makes our content look <b>polished</b>.",
      platform: "tiktok",
      avatar: "/assets/images/review1.jpg"
    },
    {
      name: "@eddiecumberbatch", 
      date: "276K",
      text: "This tool has been a <b>game-changer</b> for our team. Captions are <b>perfectly synced</b>, and customization is seamless.",
      platform: "tiktok",
      avatar: "/assets/images/review2.jpg"
    },
    {
      name: "@danieldalen",
      date: "146K",
      text: "I use Cool Captions <b>daily</b> to streamline our workflow. It's made video editing <b>faster and more efficient</b>.",
      platform: "youtube",
      avatar: "/assets/images/review3.jpg"
    },
    {
      name: "@minolee.mp4",
      date: "265K", 
      text: "Cool Captions has <b>saved me hours</b> every Iek. I can't imagine editing videos without it anymore.",
      platform: "instagram",
      avatar: "/assets/images/review4.jpg"
    },
    {
      name: "@omgadrian",
      date: "603K",
      text: "Our social media engagement has <b>skyrocketed</b> thanks to professional-looking captions. Cool Captions is a <b>must-have</b>.",
      platform: "instagram",
      avatar: "/assets/images/review5.jpg"
    },
    {
      name: "@itsryanto",
      date: "78K",
      text: "The AI accuracy is <b>unmatched</b>. Cool Captions makes collaboration easy and <b>elevates</b> the quality of our work.",
      platform: "instagram",
      avatar: "/assets/images/review6.jpg"
    },
    {
      name: "@mylenesmind",
      date: "454K",
      text: "Cool Captions <b>simplifies</b> the process of creating accessible content. It's been a <b>key tool</b> for our business.",
      platform: "instagram",
      avatar: "/assets/images/review7.jpg"
    },
    {
      name: "@thomasyeum",
      date: "34K",
      text: "I edit over <b>100 videos</b> a month, and Cool Captions saves me at least <b>15 hours</b>. It's an essential tool for creators.",
      platform: "instagram",
      avatar: "/assets/images/review8.jpg"
    },
    {
      name: "@robthebank",
      date: "376K",
      text: "This app has <b>completely changed</b> how I approach video production. The captions are <b>flawless</b>, and it's so easy to use.",
      platform: "instagram",
      avatar: "/assets/images/review9.jpg"
    }
  ];

  const PlatformIcon = ({ platform }) => {
    switch (platform) {
      case "instagram":
        return <FaInstagram className="text-[#E1306C] w-6 h-6" />;
      case "youtube":
        return <FaYoutube className="text-[#FF0000] w-6 h-6" />;
      case "tiktok":
        return <FaTiktok className="text-black w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <section id="testimonials" className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-[#0B0F1C] mb-3">
          Join 530,000+ Creators
        </h2>
        <div className="mb-10"></div>
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-[28px] relative ${
                  testimonial.text.length < 120 ? 'p-5' : testimonial.text.length < 150 ? 'p-6' : 'p-7'
                } shadow-[0_4px_12px_rgba(0,0,0,0.04)] border-[1px] border-[#E5E7EB] mb-4 break-inside-avoid-column`}
              >
                <div className="absolute top-5 right-5">
                  <PlatformIcon platform={testimonial.platform} />
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center gap-[5px]">
                    {[...Array(5)].map((_, i) => (
                      <BsStarFill key={i} className={`text-[#1F2937] ${index % 2 === 0 ? 'w-4 h-4' : 'w-[17px] h-[17px]'}`} />
                    ))}
                    <span className="text-[#4B5563] ml-3 text-[14px]">{testimonial.date}</span>
                  </div>
                </div>

                <p className={`text-[#1F2937] mb-4 text-[16px] leading-[1.5] ${index % 3 === 0 ? 'pr-2' : ''}`}>
                  {testimonial.text
                    .split(/<b>|<\/b>/).map((part, i) => 
                      i % 2 === 0 ? part : <strong key={i} className="font-bold">{part}</strong>
                    )}
                </p>

                <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'mt-3' : ''}`}>
                  <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <span className="font-semibold text-[#1F2937] text-[15px]">
                    {testimonial.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials11;
