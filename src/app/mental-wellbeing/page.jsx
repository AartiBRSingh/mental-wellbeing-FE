import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen  mx-auto p-4">
      <div className="">
        <span className=" relative text-8xl font-serif text-stone-800 max-w-[1000px] [text-shadow:_2px_2px_2px_rgb(0_0_0_/_30%)] block ml-[550px] mt-12 mb-12">
          <span className="relative">
            Mental Wellbeing
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
          </span>
        </span>
        <div className="flex justify-center bg-white my-10">
          <p className="max-w-4xl text-xl ml-44 pt-48">
            Mental well-being is essential for leading a balanced, productive,
            and fulfilling life. It impacts our thoughts, emotions, and
            behaviors, shaping how we handle stress, interact with others, and
            make decisions. Prioritizing mental well-being benefits individuals,
            students, and employees, creating a healthier society and workplace.
          </p>
          <img
            src="https://img.freepik.com/free-vector/user-practicing-mindfulness-meditation-lotus-pose-mindful-meditating-mental-calmness-self-consciousness-focusing-releasing-stress-concept-vector-isolated-illustration_335657-2250.jpg?t=st=1739160572~exp=1739164172~hmac=32c8d345af3b299c2b7b36bf0225a2a466e0c7dfc17ac20e60cc3bb2b128fb1f&w=1380"
            alt="Insurance consultation"
            className="w-[650px] h-[450px] mr-32 rounded-full mb-14 mt-10"
          />
        </div>
      </div>

      <div className="space-y-8">
        <div className=" p-6 rounded-r-full bg-green-400 max-w-[1700px] flex justify-between shadow-lg">
          <div className="ml-24 mt-14">
            <h2 className="text-3xl font-semibold mb-4">
              Employee Well-Being: Enhancing Productivity & Workplace Harmony
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                Reduces <strong>stress, burnout, and absenteeism</strong>,
                leading to a more engaged workforce.
              </li>
              <li>
                Improves{" "}
                <strong>
                  team collaboration, communication, and job satisfaction
                </strong>
                .
              </li>
              <li>
                Increases{" "}
                <strong>
                  focus, creativity, and problem-solving abilities
                </strong>
                , boosting overall performance.
              </li>
              <li>
                Creates a <strong>supportive work environment</strong>,
                improving <strong>mental resilience and motivation</strong>.
              </li>
            </ul>
            <Link
              href="/employee"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 inline-block  mt-5 ml-20"
            >
              View Details
            </Link>
          </div>

          <img
            src="https://img.freepik.com/free-vector/good-team-concept-illustration_114360-4225.jpg?t=st=1737958269~exp=1737961869~hmac=9f55dffa1ad3cbe3003fbe6986667390cde22ce60ebf14ec70599896f3d62e8b&w=740"
            alt="Nature scene representing mental wellness"
            className="w-80 h-80 object-contain rounded-full"
          />
        </div>

        <div className="ml-44">
          <div className="p-6 rounded-l-full bg-yellow-400 flex justify-between">
            <img
              src="https://img.freepik.com/free-vector/happy-students-jumping-with-flat-design_23-2147907627.jpg?t=st=1737958353~exp=1737961953~hmac=b35ff6009000582dff7710c6c86c923f98fb82aa915ccc17fbbd564321b15760&w=740"
              alt="Nature scene representing mental wellness"
              className="w-80 h-80 object-contain rounded-full"
            />
            <div className="max-w-max mr-24 mt-14">
              <h2 className="text-2xl font-bold mb-4">
                Student Well-Being: Building Resilience & Academic Success
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Helps students manage{" "}
                  <strong>
                    exam anxiety, academic stress, and peer pressure
                  </strong>
                  .
                </li>
                <li>
                  Enhances{" "}
                  <strong>concentration, memory, and learning abilities</strong>{" "}
                  for better performance.
                </li>
                <li>
                  Develops{" "}
                  <strong>emotional intelligence and coping skills</strong> for
                  handling lifes challenges.
                </li>
                <li>
                  Promotes a{" "}
                  <strong>positive mindset and self-confidence</strong>,
                  fostering personal growth.
                </li>
              </ul>
              <Link
                href="/student"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        <div className=" p-6 rounded-lg bg-blue-400 max-w-[1700px]">
          <h2 className="text-2xl font-bold mb-4">
            Self-Understanding: The Key to Personal Growth & Emotional Strength
          </h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              Encourages self-awareness, helping individuals{" "}
              <strong>
                understand their thoughts, emotions, and behaviors
              </strong>
              .
            </li>
            <li>
              Improves <strong>decision-making and problem-solving</strong>,
              leading to better life choices.
            </li>
            <li>
              Strengthens <strong>emotional resilience</strong> to handle
              setbacks and challenges effectively.
            </li>
            <li>
              Promotes{" "}
              <strong>mental clarity, inner peace, and fulfillment</strong> in
              personal and professional life.
            </li>
          </ul>
          <Link
            href="/self"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
