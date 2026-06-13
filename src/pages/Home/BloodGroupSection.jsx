import React from "react";
import { Link } from "react-router";
 
import { BiDroplet } from "react-icons/bi";

const bloodGroups = [
  { group: "A+", compatible: "A+, AB+", available: true },
  { group: "A-", compatible: "A+, A-, AB+, AB-", available: true },
  { group: "B+", compatible: "B+, AB+", available: false },
  { group: "B-", compatible: "B+, B-, AB+, AB-", available: true },
  { group: "AB+", compatible: "AB+ only", available: true },
  { group: "AB-", compatible: "AB+, AB-", available: false },
  { group: "O+", compatible: "A+, B+, AB+, O+", available: true },
  { group: "O-", compatible: "All blood groups", available: true },
];

const BloodGroupSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:!bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-3">
          Blood Group Compatibility
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10 text-sm md:text-base max-w-md mx-auto">
          Find donors by blood group — click to search available donors
        </p>

        {/* Blood Groups Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {bloodGroups.map((item) => (
            <Link
              key={item.group}
             
              to={`/search-page?bloodGroup=${encodeURIComponent(item.group)}`}
              className={`relative p-6 rounded-2xl text-center border transition-all duration-300
                         hover:shadow-md hover:-translate-y-1 group flex flex-col items-center justify-between
                         ${
                           item.available
                             ? "bg-white dark:bg-gray-900 border-red-100/70 dark:border-gray-800/60"
                             : "bg-gray-50/50 dark:bg-gray-900/40 border-gray-200/60 dark:border-gray-800/30 opacity-65"
                         }`}
            >
              
              <div className="absolute top-3 right-4 text-xl text-gray-200 dark:text-gray-800 group-hover:text-red-500/20 dark:group-hover:text-red-400/20 transition-colors duration-300">
                <BiDroplet />
              </div>

              {/* Blood Group Display */}
              <div className="w-full">
                <div
                  className="text-4xl font-black text-red-600 dark:text-red-500 
                             group-hover:scale-105 transition-transform duration-300 mb-1"
                >
                  {item.group}
                </div>

          
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2rem] flex items-center justify-center">
                  Donates to: {item.compatible}
                </p>
              </div>

            
              <span
                className={`text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border
                ${
                  item.available
                    ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200/40 dark:border-green-900/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200/30 dark:border-gray-700/30"
                }`}
              >
                {item.available ? "Available" : "Low Stock"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BloodGroupSection;
