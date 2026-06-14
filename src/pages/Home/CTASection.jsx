import React from "react";
import { Link } from "react-router";
import { BiHeart } from "react-icons/bi";
import { LuUserPlus, LuSearch } from "react-icons/lu";
import { primaryBtn, secondaryBtn } from "../../components/Shared/Button/buttonStyles";

const CTASection = () => {
  return (
    /* লাইট মোডে রেড থেকে গ্রে-৮০০ এবং ডার্ক মোডে রেড থেকে গ্রে-৯৫৫ গ্রেডিয়েন্ট করা হয়েছে যা ফুটারের সাথে মিলবে */
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-red-600 to-gray-800 dark:from-red-950 dark:to-gray-950 transition-colors duration-500">
      {/* Background blur decorative shapes */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-red-400/10 dark:bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
        {/* Pulsing heart icon */}
        <div className="inline-flex items-center justify-center text-4xl text-white bg-white/10 p-4 rounded-full mb-6 animate-pulse backdrop-blur-sm">
          <BiHeart className="fill-current text-white" />
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Ready to Save a Life?
        </h2>

        {/* Supporting Description */}
        <p className="text-red-100/90 dark:text-gray-300 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Join thousands of donors across Bangladesh. Register today and be
          someone's reason to live.
        </p>

        {/* Interactive Action Buttons */}
       
        {/* 2 */}
        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Action */}
          <Link
            to="/signup"
            /* `${primaryBtn} ...` ব্যবহার করে গ্লোবাল স্টাইলের সাথে ফ্লেক্সবক্স ক্লাস যুক্ত করা হয়েছে */
            className={`${primaryBtn} w-full sm:w-auto inline-flex items-center justify-center gap-2`}
          >
            <LuUserPlus className="text-lg shrink-0" />
            <span>Become a Donor</span>
          </Link>

          {/* Secondary Action */}
          <Link
            to="/search-page"
            /* ঠিক একইভাবে এখানেও পাশাপাশি আনার লজিক অ্যাপ্লাই করা হয়েছে */
            className={`${secondaryBtn} w-full sm:w-auto inline-flex items-center justify-center gap-2`}
          >
            <LuSearch className="text-lg shrink-0" />
            <span>Find Donors</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
