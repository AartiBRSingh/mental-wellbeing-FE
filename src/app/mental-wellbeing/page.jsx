import React from "react";
import Link from "next/link";

const WellbeingCard = ({ title, description, link }) => (
  <div className="border p-4 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <Link
      href={link}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      View Details
    </Link>
  </div>
);

const page = () => {
  const cards = [
    {
      title: "Employee Wellbeing",
      description:
        "Resources and support for employee mental and physical health.",
      link: "/employee",
    },
    {
      title: "Student Wellbeing",
      description:
        "Guidance and programs to help students thrive academically and personally.",
      link: "/student",
    },
    {
      title: "Self Understanding",
      description:
        "Tools and techniques for personal growth and self-discovery.",
      link: "/self",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mental Wellbeing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <WellbeingCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default page;
