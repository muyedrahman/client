import React from "react";
/* মডার্ন কোটেশন আইকন */
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahim Uddin",
    location: "Dhaka",
    blood: "O+",
    text: "I found a donor within 2 hours during an emergency. This platform literally saved my mother's life. Forever grateful!",

    avatar: "https://i.ibb.co.com/35B8TJ6n/My-Code-Ch.jpg",
  },
  {
    name: "Fatema Begum",
    location: "Chittagong",
    blood: "A-",
    text: "As a regular donor, this app makes it so easy to connect with people who need help. I've donated 5 times through this platform.",
    avatar: "https://i.ibb.co.com/mVZDYwHG/images.jpg",
  },
  {
    name: "Karim Hassan",
    location: "Sylhet",
    blood: "B+",
    text: "The search feature is amazing. I found a compatible donor in my own upazila within minutes. Highly recommended!",
    avatar: "https://i.ibb.co.com/h12KjRCL/ap23.png",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white dark:!bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-3">
          What People Say
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12 text-sm md:text-base">
          Real stories from our community
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-red-50/40 dark:bg-gray-900
                         border border-red-100/70 dark:border-gray-800/60
                         hover:shadow-md hover:-translate-y-0.5 group
                         flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Quote Icon */}
                <div className="text-red-400/50 dark:text-red-500/20 text-2xl mb-4 group-hover:text-red-500 transition-colors duration-300">
                  <FaQuoteLeft />
                </div>

                {/* Review Text */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 font-medium italic">
                  "{item.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-red-100/60 dark:border-gray-800/60">
                <img
                  src={item.avatar}
                  alt={item.name}
                  loading="lazy" // প্রোডাকশন পারফরম্যান্স অপ্টিমাইজেশনের জন্য লেজি লোডিং মাস্ট
                  className="w-11 h-11 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                  onError={(e) => {
                    // ইমেজ লোড হতে ফেইল করলে একটি সুন্দর জেনেরিক টেক্সট প্লেসহোল্ডার ব্যাকআপ
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=fecaca&color=b91c1c`;
                  }}
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                    {item.location} • Blood Group{" "}
                    <span className="text-red-600 dark:text-red-400 font-bold">
                      {item.blood}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
