// // BlogPage.jsx
// import React from "react";

// const blogData = [
//   {
//     id: 1,
//     title: "Importance of Blood Donation",
//     excerpt:
//       "Learn why donating blood is essential and how it saves lives every day.",
//     author: "Admin",
//     date: "2026-8-18",
//     image: "https://i.ibb.co.com/tTgrzyBC/blood-donation.jpg",
//   },
//   {
//     id: 2,
//     title: "How to Prepare for Blood Donation",
//     excerpt:
//       "Tips and guidelines for donors before donating blood to ensure safety and comfort.",
//     author: "Volunteer Team",
//     date: "2026-8-15",
//     image: "https://i.ibb.co.com/jkprct21/donor.jpg",
//   },
//   {
//     id: 3,
//     title: "Who Can Donate Blood?",
//     excerpt:
//       "Understand eligibility criteria for blood donation to help save lives efficiently.",
//     author: "Health Expert",
//     date: "2026-07-15",
//     image: "https://i.ibb.co.com/6cj9yBSv/healthcare.jpg",
//   },
// ];

// const Blog = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen py-12">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Page Header */}
//         <h1 className="text-3xl font-bold text-center mb-8">Our Blog</h1>

//         {/* Blog Grid */}
//         <div className="grid gap-8 md:grid-cols-3">
//           {blogData.map((blog) => (
//             <div
//               key={blog.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//             >
//               <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
//                 <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
//                 <div className="flex justify-between items-center text-gray-500 text-xs">
//                   <span>By {blog.author}</span>
//                   <span>{blog.date}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Load More Button */}
//         <div className="text-center mt-10">
//           <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
//             Load More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog;

import React from "react";
import { primaryBtn } from "../Button/buttonStyles";

const blogData = [
  {
    id: 1,
    title: "Importance of Blood Donation",
    excerpt:
      "Learn why donating blood is essential and how it saves lives every day.",
    author: "Admin",
    date: "2026-08-18",
    image: "https://i.ibb.co.com/tTgrzyBC/blood-donation.jpg",
  },
  {
    id: 2,
    title: "How to Prepare for Blood Donation",
    excerpt:
      "Tips and guidelines for donors before donating blood to ensure safety and comfort.",
    author: "Volunteer Team",
    date: "2026-08-15",
    image: "https://i.ibb.co.com/jkprct21/donor.jpg",
  },
  {
    id: 3,
    title: "Who Can Donate Blood?",
    excerpt:
      "Understand eligibility criteria for blood donation to help save lives efficiently.",
    author: "Health Expert",
    date: "2026-07-15",
    image: "https://i.ibb.co.com/6cj9yBSv/healthcare.jpg",
  },
];

const Blog = () => {
  return (
    /* মেইন কন্টেইনার ডার্ক মোড ফিক্স */
    <div className="bg-gray-50 dark:!bg-gray-950 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Our Blog
        </h1>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              /* কার্ড ব্যাকগ্রাউন্ড ডার্ক মোডে dark:bg-gray-900 হবে */
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden hover:shadow-xl dark:border dark:border-gray-800/80 transition-all duration-300 group"
            >
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                {/* ব্লগ টাইটেল ডার্ক মোড টেক্সট */}
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {blog.title}
                </h2>

                {/* ব্লগ এক্সাপ্ট ডার্ক মোড টেক্সট */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                {/* মেটা ডেটা (লেখক ও তারিখ) */}
                <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs pt-3 border-t border-gray-100 dark:border-gray-800/60">
                  <span className="font-medium">By {blog.author}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-10">
          <button className={primaryBtn}>Load More</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;