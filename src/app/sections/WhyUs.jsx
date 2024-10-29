import React from "react";

const TitleUnderline = () => (
  <svg
    className="absolute w-full h-[10px] bottom-0 left-0"
    viewBox="0 0 100 10"
    preserveAspectRatio="none"
  >
    <path
      d="M0 5 Q 50 -5, 100 5"
      stroke="orange"
      strokeWidth="4"
      fill="transparent"
    />
  </svg>
);

const featuresData = [
  {
    title: "Bring inner peace",
    description: "Happy tunes generate more peaceful solutions.",
    shape: "square",
    underline: "#CAFA90",
  },
  {
    title: "Find more joy",
    description: "Feel utterly less stressed in just first 10 days.",
    shape: "oval",
    underline: "#78E1FE",
  },
  {
    title: "Healing program",
    description: "Do it for yourself, and everyone you really love.",
    shape: "circle",
    underline: "#CAFA90",
  },
  {
    title: "Positive psychology",
    description: "Put your mind to bed, wake up fully refreshed.",
    shape: "flower",
    underline: "#FAD77B",
  },
];

const getShapeSVG = (shape) => {
  // All shapes are now consistently sized within a 480x480 viewBox
  switch (shape) {
    case "square":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          className="w-full h-full"
        >
          <defs>
            <clipPath id="squareClip">
              <rect width="360" height="360" x="60" y="60" rx="60" ry="60" />
            </clipPath>
          </defs>
          <rect
            width="360"
            height="360"
            x="60"
            y="60"
            rx="60"
            ry="60"
            fill="#78E1FE"
          />
          <image
            href="/test.png"
            width="360"
            height="360"
            x="60"
            y="60"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#squareClip)"
          />
        </svg>
      );
    case "oval":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          className="w-full h-full"
        >
          <defs>
            <clipPath id="ovalClip">
              <path d="M447.9 240c20.4-17.6 32.1-38.1 32.1-60 0-66.3-107.5-120-240-120S0 113.7 0 180c0 21.9 11.7 42.4 32.1 60C11.7 257.6 0 278.1 0 300c0 66.3 107.5 120 240 120s240-53.7 240-120c0-21.9-11.7-42.4-32.1-60Z" />
            </clipPath>
          </defs>
          <path
            d="M447.9 240c20.4-17.6 32.1-38.1 32.1-60 0-66.3-107.5-120-240-120S0 113.7 0 180c0 21.9 11.7 42.4 32.1 60C11.7 257.6 0 278.1 0 300c0 66.3 107.5 120 240 120s240-53.7 240-120c0-21.9-11.7-42.4-32.1-60Z"
            fill="#FF844C"
          />
          <image
            href="/test.png"
            width="480"
            height="480"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#ovalClip)"
          />
        </svg>
      );
    case "circle":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          className="w-full h-full"
        >
          <defs>
            <clipPath id="circleClip">
              <circle cx="240" cy="240" r="180" />
            </clipPath>
          </defs>
          <circle cx="240" cy="240" r="180" fill="#CAFA90" />
          <image
            href="/test.png"
            width="360"
            height="360"
            x="60"
            y="60"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#circleClip)"
          />
        </svg>
      );
    case "flower":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          className="w-full h-full"
        >
          <defs>
            <clipPath id="flowerClip">
              <path d="M480 210h-89.2l82.4-34.1-22.9-55.5-82.4 34.2 63-63.1-42.4-42.4-63.1 63 34.2-82.3-55.5-23L270 89.2V0h-60v89.2L175.9 6.8l-55.5 23 34.2 82.3-63.1-63-42.4 42.4 63 63.1-82.3-34.2-23 55.5L89.2 210H0v60h89.2L6.8 304.1l23 55.5 82.3-34.2-63 63.1 42.4 42.4 63.1-63-34.2 82.4 55.5 22.9 34.1-82.4V480h60v-89.2l34.1 82.4 55.5-22.9-34.2-82.4 63.1 63 42.4-42.4-63-63.1 82.4 34.2 22.9-55.5-82.4-34.1H480v-60z" />
            </clipPath>
          </defs>
          <path
            d="M480 210h-89.2l82.4-34.1-22.9-55.5-82.4 34.2 63-63.1-42.4-42.4-63.1 63 34.2-82.3-55.5-23L270 89.2V0h-60v89.2L175.9 6.8l-55.5 23 34.2 82.3-63.1-63-42.4 42.4 63 63.1-82.3-34.2-23 55.5L89.2 210H0v60h89.2L6.8 304.1l23 55.5 82.3-34.2-63 63.1 42.4 42.4 63.1-63-34.2 82.4 55.5 22.9 34.1-82.4V480h60v-89.2l34.1 82.4 55.5-22.9-34.2-82.4 63.1 63 42.4-42.4-63-63.1 82.4 34.2 22.9-55.5-82.4-34.1H480v-60z"
            fill="#FAD77B"
          />
          <image
            href="/test.png"
            width="480"
            height="480"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#flowerClip)"
          />
        </svg>
      );
    default:
      return null;
  }
};

const WhyUs = () => {
  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center relative">
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-[#956144] text-sm font-semibold">
            PEACEFUL BEGINNING
          </span>

          <h1 className="text-4xl md:text-6xl font-semibold mt-10 mb-20">
            Bring your inner{" "}
            <span className="relative inline-block">
              peace
              <span className="absolute -bottom-1 left-0 w-full h-2 bg-orange-200"></span>
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <div className="w-48 h-48 mb-6">
                {" "}
                {/* Fixed size container */}
                {getShapeSVG(feature.shape)}
              </div>
              <div className="relative inline-block pb-4 mb-2">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <TitleUnderline />
              </div>
              <p className="text-gray-600 text-sm px-4">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
