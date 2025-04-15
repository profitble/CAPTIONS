import Image from "next/image";

const testimonials = [
  {
    id: 4,
    image: "/assets/images/student4.avif",
    alt: "Student using Cool Captions platform",
  },
  {
    id: 5,
    image: "/assets/images/student5.avif",
    alt: "Student with Cool Captions solution",
  },
  {
    id: 6,
    image: "/assets/images/student6.avif",
    alt: "Student using Cool Captions",
  },
];

const TestimonialsList = () => {
  return (
    <div className="py-6">
      <h3 className="text-3xl font-bold text-gray-900 md:hidden text-center mb-3" style={{fontFamily: 'Bricolage Grotesque'}}>
        Real People, Real Results
      </h3>
      
      <div className="flex flex-col gap-4 max-w-md mx-auto px-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="relative aspect-[1/1]">
              <Image
                src={testimonial.image}
                alt={testimonial.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsList;