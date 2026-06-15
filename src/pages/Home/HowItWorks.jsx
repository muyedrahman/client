import React from "react";
 
import { LuUserPlus, LuSearch, LuPhoneCall } from "react-icons/lu";
import { BiDonateBlood } from "react-icons/bi";
 
const steps = [
  {
    step: "01",
    icon: LuUserPlus,
    title: "Register as Donor",
    desc: "Create your account and fill in your blood group, district and upazila information.",
  },
  {
    step: "02",
    icon: LuSearch,
    title: "Search for Donors",
    desc: "Patients or their family can search for available donors by blood group and location.",
  },
  {
    step: "03",
    icon: LuPhoneCall,
    title: "Connect & Confirm",
    desc: "Contact the donor directly and confirm the donation details with the hospital.",
  },
  {
    step: "04",
    icon: BiDonateBlood,
    title: "Donate & Save Life",
    desc: "Visit the hospital and complete the donation. You just saved a life!",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white dark:!bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-3">
          How It Works
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12 text-sm md:text-base max-w-md mx-auto">
          Simple steps to donate or find blood
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, i) => {
            const Icon = item.icon;  
            return (
              <div
                key={i}
                className="relative text-center p-6 bg-red-50/40 dark:bg-gray-900 
                           rounded-2xl border border-red-100/70 dark:border-gray-800/60
                           hover:shadow-md hover:-translate-y-1 group
                           transition-all duration-300"
              >
                {/* Step badge */}
                <div
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full 
                             bg-red-600 text-white text-xs font-bold 
                             flex items-center justify-center shadow-md
                             group-hover:scale-110 transition-transform duration-300"
                >
                  {item.step}
                </div>

                {/* Icon wrapper with a smooth hover theme change */}
                <div className="flex justify-center mb-5">
                  <div
                    className="text-3xl text-red-600 dark:text-red-400 p-3.5 
                               bg-white dark:bg-gray-950 rounded-xl shadow-sm 
                               border border-red-50 dark:border-gray-800/40
                               group-hover:bg-red-600 group-hover:text-white dark:group-hover:bg-red-600
                               transition-all duration-300"
                  >
                    <Icon />
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
