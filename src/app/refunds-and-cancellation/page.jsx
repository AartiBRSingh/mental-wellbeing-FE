import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto mt-20 max-w-7xl">
        <div className="flex justify-center ">
          <span className="relative text-4xl md:text-4xl xl:text-5xl font-semibold text-stone-800 max-w-full block">
            Refund and Cancellation
            <span className="relative text-[#956144] ml-3">
              Policy
              <svg
                className="absolute w-full h-[10px] -bottom-2 left-0"
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
        </div>
        <div className="flex justify-center rounded-xl pt-10">
          <p className="pl-6 ">
            <spam className="space-y-2 pl-5">
              <li>
                Users may cancel a booking or request a refund by submitting a
                formal claim within 48 hours of the scheduled service.
              </li>
              <li>
                All valid refund requests will be processed within 15 working
                days from the date of claim approval.
              </li>
              <li>
                Refunds will be credited through the original mode of payment.
              </li>
              <li>
                No refund requests will be entertained beyond the 48-hour claim
                window.
              </li>
              <li>
                In case of technical issues or missed appointments from the
                experts side, rescheduling or full refunds will be facilitated
                at no extra cost.
              </li>
            </spam>
          </p>
        </div>
      </section>
    </div>
  );
};

export default page;
