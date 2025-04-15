"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    image: "/assets/images/student1.png",
    alt: "Student using Cool Captions",
  },
  {
    id: 2,
    image: "/assets/images/student2.png", 
    alt: "Student with Cool Captions interface",
  },
  {
    id: 3,
    image: "/assets/images/student3.png",
    alt: "Student working with Cool Captions",
  },
  {
    id: 4,
    image: "/assets/images/student4.png",
    alt: "Student using Cool Captions platform",
  },
  {
    id: 5,
    image: "/assets/images/student5.png",
    alt: "Student with Cool Captions solution",
  },
  {
    id: 6,
    image: "/assets/images/student6.png",
    alt: "Student using Cool Captions",
  },
  {
    id: 7,
    image: "/assets/images/student7.png",
    alt: "Student with Cool Captions interface",
  },
];

const autoScrollOptions = {
  speed: 0.5,
  startDelay: 0,
  direction: "forward",
  stopOnInteraction: false,
  stopOnMouseEnter: false,
  stopOnFocusIn: false,
};

const TestimonialsCarousel = () => {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      containScroll: false,
      dragFree: true,
      skipSnaps: true
    },
    [AutoScroll(autoScrollOptions)]
  );

  return (
    <div className="py-8 bg-white">
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-[0_0_280px] px-3"
              >
                <div className="bg-gray-50 rounded-2xl overflow-hidden border-4 border-[#8C52FF]">
                  <div className="relative aspect-[9/16]">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 280px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;