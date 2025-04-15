import Image from 'next/image';

const avatars = [
  {
    src: "/assets/images/review1.jpg",
    alt: "Student testimonial"
  },
  {
    src: "/assets/images/review2.jpg", 
    alt: "Student testimonial"
  },
  {
    src: "/assets/images/review3.jpg",
    alt: "Student testimonial"
  },
  {
    src: "/assets/images/review4.jpg",
    alt: "Student testimonial"
  }
];

const TestimonialsAvatars = () => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      {/* Avatars */}
      <div className="flex -space-x-2 md:-space-x-3">
        {avatars.map((avatar, i) => (
          <div 
            key={i} 
            className="relative w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] rounded-full border-2 border-white bg-gray-200 shadow-sm overflow-hidden"
            style={{ zIndex: 4 - i }}
          >
            <Image
              src={avatar.src}
              alt={avatar.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 32px, 40px"
            />
          </div>
        ))}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 md:gap-3">
        <span className="font-bold text-base md:text-lg">4.8/5</span>
        <div className="flex text-[#FFB800]">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-[1.125rem] h-[1.125rem] md:w-[1.25rem] md:h-[1.25rem]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <div className="text-sm md:text-base">
          <span className="sm:hidden font-medium text-gray-900">Based on <span className="font-bold">530,000+</span> users</span>
          <span className="hidden sm:inline">
            <span className="text-gray-500">Based on </span>
            <span className="font-bold text-gray-900">530,000+</span>
            <span className="text-gray-500"> users</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsAvatars;
