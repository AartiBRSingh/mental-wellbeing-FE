"use client";
import { useState, useEffect } from "react";

const SimpleTestimonialCarousel = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) =>
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const goToNext = () => {
    setCurrentIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 pt-4">
        Patient Reviews
      </h2>
      <div className="relative overflow-hidden rounded-lg shadow text-center text-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 p-10 bg-gray-200">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              </div>
              <p className="italic text-gray-600">{testimonial.review}</p>
            </div>
          ))}
        </div>

        {testimonials.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-cream p-2 rounded-full shadow hover:bg-gray-100"
            >
              ←
            </button>

            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-cream p-2 rounded-full shadow hover:bg-gray-100"
            >
              →
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SimpleTestimonialCarousel;
