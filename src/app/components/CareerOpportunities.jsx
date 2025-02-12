import React from "react";
import { Users, Brain, Building2 } from "lucide-react";

const CareerOpportunities = () => {
  const careerCards = [
    {
      title: "Mental Health Experts",
      description:
        "Join our expert team of psychologists, counselors, and therapists dedicated to providing high-quality mental health services. We offer flexible work arrangements including full-time and hybrid options.",
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      image:
        "https://images.everydayhealth.com/images/emotional-health/what-makes-someone-a-mental-health-expert-1440x810.jpg?sfvrsn=5f8b2a3b_5",
    },
    {
      title: "Psychiatry Services",
      description:
        "Join our skilled team of psychiatrists and psychiatric nurse practitioners in providing premium telepsychiatry services and medication management. Work with a diverse patient population.",
      icon: <Users className="w-8 h-8 text-purple-600" />,
      image:
        "https://vcuhealth.org/media/vcuhealth/media/media/ctablock/gettyimages-814596806resized.jpg",
    },
    {
      title: "Corporate Roles",
      description:
        "Become a member of our corporate team in HR, credentialing, finance, marketing, product, recruitment, sales & support, technology, or other specialized departments.",
      icon: <Building2 className="w-8 h-8 text-green-600" />,
      image:
        "https://images.ctfassets.net/pdf29us7flmy/50eQDoAOIZArB7oVSsS3z0/bcbb17aa68434d6fb4fcedd28d1eec00/GettyImages-763160147_optimized.jpg?w=720&q=100&fm=jpg",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Career Opportunities at ShareYrHeart
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {careerCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {card.icon}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {card.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">{card.description}</p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-200">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerOpportunities;
