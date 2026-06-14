// import axios from "axios";
// import { useEffect, useState } from "react";

// const SearchPage = () => {
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [district, setDistrict] = useState("");
//   const [upazila, setUpazila] = useState("");

//   const [results, setResults] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   // Load districts
//   useEffect(() => {
//     fetch("/Districts.json")
//       .then((res) => res.json())
//       .then((data) => setDistricts(data))
//       .catch((err) => console.error("District load error:", err));
//   }, []);

//   // Search handler
//   const handleSearch = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setResults([]);

//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/donation-requests`,
//         {
//           params: {
//             blood_group: bloodGroup || undefined,
//             district: district || undefined,
//             upazila: upazila || undefined,
//             status: "pending",
//           },
//         },
//       );

//       setResults(res.data || []);
//     } catch (error) {
//       console.error("Search error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-red-50 py-12 px-4">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-4xl font-bold text-center text-red-700 mb-8">
//           Find Blood Donors
//         </h2>

//         {/* SEARCH FORM */}
//         <form
//           onSubmit={handleSearch}
//           className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
//         >
//           {/* Blood Group */}
//           <select
//             value={bloodGroup}
//             onChange={(e) => setBloodGroup(e.target.value)}
//             className="p-3 rounded-xl border"
//           >
//             <option value="">Blood Group</option>
//             {bloodGroups.map((bg) => (
//               <option key={bg} value={bg}>
//                 {bg}
//               </option>
//             ))}
//           </select>

//           {/* District */}
//           <select
//             value={district}
//             onChange={(e) => {
//               setDistrict(e.target.value);
//               setUpazila("");
//             }}
//             className="p-3 rounded-xl border"
//           >
//             <option value="">District</option>
//             {districts.map((d) => (
//               <option key={d.id} value={d.name}>
//                 {d.name}
//               </option>
//             ))}
//           </select>

//           {/* Upazila */}
//           <select
//             value={upazila}
//             onChange={(e) => setUpazila(e.target.value)}
//             className="p-3 rounded-xl border"
//             disabled={!district}
//           >
//             <option value="">Upazila</option>
//             {districts
//               .find((d) => d.name === district)
//               ?.upazilas?.map((u) => (
//                 <option key={u.id} value={u.name}>
//                   {u.name}
//                 </option>
//               ))}
//           </select>

//           {/* Button */}
//           <button className="bg-red-600 text-white rounded-xl">Search</button>
//         </form>

//         {/* LOADING */}
//         {loading && (
//           <p className="text-center text-gray-500">Searching donors...</p>
//         )}

//         {/* EMPTY STATE */}
//         {!loading && results.length === 0 && (
//           <p className="text-center text-gray-500">
//             No donors found. Try different filters.
//           </p>
//         )}

//         {/* RESULTS */}
//         <div className="grid md:grid-cols-3 gap-5">
//           {results.map((req) => (
//             <div
//               key={req._id}
//               className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
//             >
//               <h2 className="text-red-600 font-bold text-lg">
//                 {req.requesterName || "Unknown"}
//               </h2>

//               <p>
//                 <span className="font-semibold">Blood:</span> {req.blood_group}
//               </p>

//               <p>
//                 <span className="font-semibold">District:</span>
//                 {req.recipientDistrict}
//               </p>

//               <p>
//                 <span className="font-semibold">Upazila:</span>
//                 {req.recipientUpazila}
//               </p>

//               <p className="text-sm text-gray-500 mt-2">Status: {req.status}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;


// 3

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { primaryBtn } from "../Button/buttonStyles";

// const SearchPage = () => {
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [district, setDistrict] = useState("");
//   const [upazila, setUpazila] = useState("");

//   const [results, setResults] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   // Load districts
//   useEffect(() => {
//     fetch("/Districts.json")
//       .then((res) => res.json())
//       .then((data) => setDistricts(data))
//       .catch((err) => console.error("District load error:", err));
//   }, []);

//   // Search handler
//   const handleSearch = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setResults([]);

//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/donation-requests`,
//         {
//           params: {
//             blood_group: bloodGroup || undefined,
//             district: district || undefined,
//             upazila: upazila || undefined,
//             status: "pending",
//           },
//         },
//       );

//       setResults(res.data || []);
//     } catch (error) {
//       console.error("Search error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     /* মেইন কন্টেইনার ডার্ক মোড ফিক্স */
//     <div className="min-h-screen bg-gray-50 dark:!bg-gray-950 py-12 px-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-4xl font-bold text-center text-red-600 dark:text-red-500 mb-8">
//           Find Blood Donors
//         </h2>

//         {/* SEARCH FORM */}
//         <form
//           onSubmit={handleSearch}
//           className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
//         >
//           {/* Blood Group */}
//           <select
//             value={bloodGroup}
//             onChange={(e) => setBloodGroup(e.target.value)}
//             className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
//           >
//             <option value="" className="dark:bg-gray-800">
//               Blood Group
//             </option>
//             {bloodGroups.map((bg) => (
//               <option key={bg} value={bg} className="dark:bg-gray-800">
//                 {bg}
//               </option>
//             ))}
//           </select>

//           {/* District */}
//           <select
//             value={district}
//             onChange={(e) => {
//               setDistrict(e.target.value);
//               setUpazila("");
//             }}
//             className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
//           >
//             <option value="" className="dark:bg-gray-800">
//               District
//             </option>
//             {districts.map((d) => (
//               <option key={d.id} value={d.name} className="dark:bg-gray-800">
//                 {d.name}
//               </option>
//             ))}
//           </select>

//           {/* Upazila */}
//           <select
//             value={upazila}
//             onChange={(e) => setUpazila(e.target.value)}
//             className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors disabled:opacity-50"
//             disabled={!district}
//           >
//             <option value="" className="dark:bg-gray-800">
//               Upazila
//             </option>
//             {districts
//               .find((d) => d.name === district)
//               ?.upazilas?.map((u) => (
//                 <option key={u.id} value={u.name} className="dark:bg-gray-800">
//                   {u.name}
//                 </option>
//               ))}
//           </select>

//           {/* Button */}
//           <button
//             type="submit"
//             className={primaryBtn}
//             // className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl py-3 transition shadow-sm"
//           >
//             Search
//           </button>
//         </form>

//         {/* LOADING */}
//         {loading && (
//           <p className="text-center text-gray-500 dark:text-gray-400 font-medium animate-pulse">
//             Searching donors...
//           </p>
//         )}

//         {/* EMPTY STATE */}
//         {!loading && results.length === 0 && (
//           <p className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
//             No donors found. Try different filters.
//           </p>
//         )}

//         {/* RESULTS */}
//         <div className="grid md:grid-cols-3 gap-5">
//           {results.map((req) => (
//             <div
//               key={req._id}
//               className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow border border-gray-100 dark:border-gray-800/60 hover:shadow-lg dark:hover:border-gray-700 transition duration-300"
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-red-600 dark:text-red-400 font-bold text-lg">
//                   {req.requesterName || "Unknown"}
//                 </h3>
//                 <span className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100 dark:border-red-900/30">
//                   {req.blood_group || req.bloodGroup}
//                 </span>
//               </div>

//               <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
//                 <p>
//                   <span className="font-semibold text-gray-800 dark:text-gray-400">
//                     District:
//                   </span>{" "}
//                   {req.recipientDistrict || req.district}
//                 </p>

//                 <p>
//                   <span className="font-semibold text-gray-800 dark:text-gray-400">
//                     Upazila:
//                   </span>{" "}
//                   {req.recipientUpazila || req.upazila}
//                 </p>
//               </div>

//               <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
//                 <span className="text-xs font-medium capitalize px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30">
//                   {req.status}
//                 </span>

//                 <button className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline">
//                   View Details -
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;


// 4

// import axios from "axios";
// import { useEffect, useState, useCallback, useMemo } from "react";
// import { useSearchParams } from "react-router-dom"; // URL Sync এর জন্য
// import { primaryBtn } from "../Button/buttonStyles";

// // ডাটাবেজের ডাইভার্সিফাইড ফিল্ড নেম হ্যান্ডেল করার জন্য একটি হেল্পার ফাংশন
// const getSafeValue = (obj, key1, key2) => obj[key1] || obj[key2] || "N/A";

// const SearchPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   // URL থেকে ইনিশিয়াল স্টেট রিড করা (ইন্ডাস্ট্রি স্ট্যান্ডার্ড)
//   const filters = useMemo(
//     () => ({
//       bloodGroup: searchParams.get("bloodGroup") || "",
//       district: searchParams.get("district") || "",
//       upazila: searchParams.get("upazila") || "",
//     }),
//     [searchParams],
//   );

//   const [results, setResults] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const bloodGroups = useMemo(
//     () => ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
//     [],
//   );

//   // ডিস্ট্রিক্ট লোড করার অপ্টিমাইজড মেথড
//   useEffect(() => {
//     let isMounted = true;
//     fetch("/Districts.json")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to load location data.");
//         return res.json();
//       })
//       .then((data) => {
//         if (isMounted) setDistricts(data);
//       })
//       .catch((err) => {
//         console.error("Location init error:", err);
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // সার্চ একশন মেথড (useCallback দিয়ে মেমোইজড করা যাতে রি-রেন্ডার কম হয়)
//   const fetchDonors = useCallback(async (currentFilters) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/donation-requests`,
//         {
//           params: {
//             blood_group: currentFilters.bloodGroup || undefined,
//             district: currentFilters.district || undefined,
//             upazila: currentFilters.upazila || undefined,
//             status: "pending",
//           },
//         },
//       );
//       setResults(response.data || []);
//     } catch (err) {
//       console.error("Donor fetch execution error:", err);
//       setError("Failed to fetch donor data. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // ইউজার ফিল্টার চেঞ্জ করলে URL আপডেট হবে
//   const handleFilterChange = (key, value) => {
//     const newParams = new URLSearchParams(searchParams);
//     if (value) {
//       newParams.set(key, value);
//     } else {
//       newParams.delete(key);
//     }

//     // ডিস্ট্রিক্ট চেঞ্জ হলে উপজেলা রিসেট করতে হবে
//     if (key === "district") {
//       newParams.delete("upazila");
//     }

//     setSearchParams(newParams);
//   };

//   // URL চেঞ্জ ট্র্যাকিং করে ডেটা ফেচ করা (সবচেয়ে রিলায়েবল এপ্রোচ)
//   useEffect(() => {
//     fetchDonors(filters);
//   }, [filters, fetchDonors]);

//   // সিলেক্টেড ডিস্ট্রিক্টের আন্ডারে উপজেলা খোঁজা
//   const availableUpazilas = useMemo(() => {
//     if (!filters.district) return [];
//     return districts.find((d) => d.name === filters.district)?.upazilas || [];
//   }, [filters.district, districts]);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
//       <div className="max-w-6xl mx-auto">
//         <header className="text-center mb-10">
//           <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
//             Find{" "}
//             <span className="text-red-600 dark:text-red-500">Blood Donors</span>
//           </h1>
//           <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
//             Search real-time pending blood donation requests nearby.
//           </p>
//         </header>

//         {/* ফিল্টার সেকশন */}
//         <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800/80 mb-8">
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             {/* Blood Group Select */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Blood Group
//               </label>
//               <select
//                 value={filters.bloodGroup}
//                 onChange={(e) =>
//                   handleFilterChange("bloodGroup", e.target.value)
//                 }
//                 className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition"
//               >
//                 <option value="">All Groups</option>
//                 {bloodGroups.map((bg) => (
//                   <option key={bg} value={bg}>
//                     {bg}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* District Select */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 District
//               </label>
//               <select
//                 value={filters.district}
//                 onChange={(e) => handleFilterChange("district", e.target.value)}
//                 className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition"
//               >
//                 <option value="">All Districts</option>
//                 {districts.map((d) => (
//                   <option key={d.id} value={d.name}>
//                     {d.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Upazila Select */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Upazila / Thana
//               </label>
//               <select
//                 value={filters.upazila}
//                 onChange={(e) => handleFilterChange("upazila", e.target.value)}
//                 disabled={!filters.district}
//                 className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <option value="">All Upazilas</option>
//                 {availableUpazilas.map((u) => (
//                   <option key={u.id} value={u.name}>
//                     {u.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* এরর স্টেট */}
//         {error && (
//           <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 text-center mb-6">
//             {error}
//           </div>
//         )}

//         {/* লোডিং / স্কেলেটন প্লেসহোল্ডার */}
//         {isLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[1, 2, 3].map((n) => (
//               <div
//                 key={n}
//                 className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 animate-pulse space-y-4"
//               >
//                 <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
//                 <div className="space-y-2">
//                   <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
//                   <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : results.length === 0 ? (
//           // এম্পটি স্টেট
//           <div className="text-center py-16 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl shadow-sm max-w-md mx-auto">
//             <p className="text-gray-500 dark:text-gray-400 font-medium">
//               No pending requests found.
//             </p>
//             <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
//               Try adjusting your filters or area definitions.
//             </p>
//           </div>
//         ) : (
//           // মেইন রেজাল্ট গ্রিড
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {results.map((req) => (
//               <article
//                 key={req._id}
//                 className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800/60 hover:shadow-md dark:hover:border-gray-700/60 transition duration-200 flex flex-col justify-between"
//               >
//                 <div>
//                   <div className="flex items-start justify-between gap-2 mb-4">
//                     <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg leading-tight truncate">
//                       {req.requesterName || "Anonymous Request"}
//                     </h3>
//                     <span className="shrink-0 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-extrabold px-3 py-1 rounded-full border border-red-100 dark:border-red-900/20">
//                       {getSafeValue(req, "bloodGroup", "blood_group")}
//                     </span>
//                   </div>

//                   <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
//                     <p className="flex items-center gap-1.5">
//                       <span className="font-medium text-gray-400 dark:text-gray-500">
//                         District:
//                       </span>
//                       <span className="text-gray-800 dark:text-gray-200">
//                         {getSafeValue(req, "recipientDistrict", "district")}
//                       </span>
//                     </p>
//                     <p className="flex items-center gap-1.5">
//                       <span className="font-medium text-gray-400 dark:text-gray-500">
//                         Upazila:
//                       </span>
//                       <span className="text-gray-800 dark:text-gray-200">
//                         {getSafeValue(req, "recipientUpazila", "upazila")}
//                       </span>
//                     </p>
//                     {req.hospitalName && (
//                       <p className="flex items-center gap-1.5 truncate">
//                         <span className="font-medium text-gray-400 dark:text-gray-500">
//                           Hospital:
//                         </span>
//                         <span className="text-gray-800 dark:text-gray-200">
//                           {req.hospitalName}
//                         </span>
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
//                   <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-100 dark:border-amber-900/20 capitalize">
//                     {req.status || "pending"}
//                   </span>
//                   <button className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
//                     View Emergency Details &rarr;
//                   </button>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;



// 5
// import axios from "axios";
// import { useEffect, useState, useMemo } from "react";
// import { LuSearch, LuMapPin, LuDroplet } from "react-icons/lu";
// import { primaryBtn } from "../Button/buttonStyles";

// // অবজেক্ট কী-র নাম সেফগার্ড করার হেল্পার
// const getSafeValue = (obj, key1, key2) => obj[key1] || obj[key2] || "N/A";

// const SearchPage = () => {
//   // ১. কন্ট্রোল্ড ফর্ম স্টেট (ইনপুট চেঞ্জের জন্য)
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [district, setDistrict] = useState("");
//   const [upazila, setUpazila] = useState("");

//   const [results, setResults] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ইউজার সার্চ বাটনে ক্লিক করেছে কিনা তা ট্র্যাক করার স্টেট
//   const [hasSearched, setHasSearched] = useState(false);

//   const bloodGroups = useMemo(
//     () => ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
//     [],
//   );

//   // ডিস্ট্রিক্ট ডেটা পেজ লোডেই ফেচ হবে (শুধু ড্রপডাউনের জন্য, রেজাল্টের জন্য নয়)
//   useEffect(() => {
//     let isMounted = true;
//     fetch("/Districts.json")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to load location data.");
//         return res.json();
//       })
//       .then((data) => {
//         if (isMounted) setDistricts(data);
//       })
//       .catch((err) => console.error("Location init error:", err));

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // ২. মেইন সার্চ হ্যান্ডলার (শুধুমাত্র বাটনে ক্লিক করলেই কাজ করবে)
//   const handleSearchSubmit = async (e) => {
//     e.preventDefault();

//     setIsLoading(true);
//     setError(null);
//     setHasSearched(true); // ইউজার সার্চ একশন ট্রিগার করেছে

//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/donation-requests`,
//         {
//           params: {
//             blood_group: bloodGroup || undefined,
//             district: district || undefined,
//             upazila: upazila || undefined,
//             status: "pending",
//           },
//         },
//       );
//       setResults(response.data || []);
//     } catch (err) {
//       console.error("Donor fetch execution error:", err);
//       setError("Failed to fetch donor data. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // সিলেক্টেড ডিস্ট্রিক্টের আন্ডারে উপজেলা খোঁজা
//   const availableUpazilas = useMemo(() => {
//     if (!district) return [];
//     return districts.find((d) => d.name === district)?.upazilas || [];
//   }, [district, districts]);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
//       <div className="max-w-6xl mx-auto">
//         <header className="text-center mb-10">
//           <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
//             Find{" "}
//             <span className="text-red-600 dark:text-red-500">Blood Donors</span>
//           </h1>
//           <p className="mt-3 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
//             Search real-time pending blood donation requests in your specific
//             area.
//           </p>
//         </header>

//         {/* সার্চ ফর্ম */}
//         <form
//           onSubmit={handleSearchSubmit}
//           className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800/80 mb-10"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//             {/* Blood Group Select */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1">
//                 <LuDroplet className="text-red-500" /> Blood Group
//               </label>
//               <select
//                 value={bloodGroup}
//                 onChange={(e) => setBloodGroup(e.target.value)}
//                 className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition"
//               >
//                 <option value="">Select Group</option>
//                 {bloodGroups.map((bg) => (
//                   <option key={bg} value={bg}>
//                     {bg}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* District Select */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1">
//                 <LuMapPin className="text-gray-400" /> District
//               </label>
//               <select
//                 value={district}
//                 onChange={(e) => {
//                   setDistrict(e.target.value);
//                   setUpazila(""); // ডিস্ট্রিক্ট চেঞ্জ হলে উপজেলা রিসেট
//                 }}
//                 className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition"
//               >
//                 <option value="">Select District</option>
//                 {districts.map((d) => (
//                   <option key={d.id} value={d.name}>
//                     {d.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Upazila Select */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1">
//                 <LuMapPin className="text-gray-400" /> Upazila / Thana
//               </label>
//               <select
//                 value={upazila}
//                 onChange={(e) => setUpazila(e.target.value)}
//                 disabled={!district}
//                 className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <option value="">Select Upazila</option>
//                 {availableUpazilas.map((u) => (
//                   <option key={u.id} value={u.name}>
//                     {u.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* সার্চ অ্যাকশন বাটন */}
//             <button
//               type="submit"
//               className={`${primaryBtn} w-full inline-flex items-center justify-center gap-2 h-[48px] rounded-xl`}
//             >
//               <LuSearch className="text-lg shrink-0" />
//               <span>Search Donors</span>
//             </button>
//           </div>
//         </form>

//         {/* এরর স্টেট */}
//         {error && (
//           <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 text-center mb-6">
//             {error}
//           </div>
//         )}

//         {/* ডাইনামিক রেন্ডারিং লজিক (UX) */}
//         {isLoading ? (
//           /* লোডিং স্কেলেটন */
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[1, 2, 3].map((n) => (
//               <div
//                 key={n}
//                 className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 animate-pulse space-y-4"
//               >
//                 <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
//                 <div className="space-y-2">
//                   <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
//                   <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : !hasSearched ? (
//           /* ১. ইনিশিয়াল স্টেট (ইউজার যখন পেজে প্রথম আসবে - কোনো কার্ড দেখাবে না) */
//           <div className="text-center py-16 bg-white dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl max-w-xl mx-auto">
//             <div className="text-red-500/20 dark:text-red-500/10 text-6xl flex justify-center mb-3">
//               <LuSearch />
//             </div>
//             <h3 className="text-gray-700 dark:text-gray-300 font-bold text-lg">
//               Start Your Search
//             </h3>
//             <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 max-w-xs mx-auto">
//               Please select a blood group or location above and click the search
//               button to find donors.
//             </p>
//           </div>
//         ) : results.length === 0 ? (
//           /* ২. এম্পটি স্টেট (সার্চ করার পর ডেটা না পাওয়া গেলে) */
//           <div className="text-center py-16 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm max-w-md mx-auto">
//             <p className="text-gray-500 dark:text-gray-400 font-bold">
//               No Match Found
//             </p>
//             <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
//               We couldn't find any pending requests matching those exact
//               filters.
//             </p>
//           </div>
//         ) : (
//           /* ৩. রেজাল্ট স্টেট (সার্চ করার পর স্পেসিফিক ডেটা আসলে) */
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {results.map((req) => (
//               <article
//                 key={req._id}
//                 className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800/60 hover:shadow-md transition duration-200 flex flex-col justify-between"
//               >
//                 <div>
//                   <div className="flex items-start justify-between gap-2 mb-4">
//                     <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg truncate">
//                       {req.requesterName || "Anonymous Request"}
//                     </h3>
//                     <span className="shrink-0 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-extrabold px-3 py-1 rounded-full border border-red-100 dark:border-red-900/20">
//                       {getSafeValue(req, "bloodGroup", "blood_group")}
//                     </span>
//                   </div>

//                   <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
//                     <p className="flex items-center gap-1.5">
//                       <span className="font-medium text-gray-400 dark:text-gray-500">
//                         District:
//                       </span>
//                       <span className="text-gray-800 dark:text-gray-200">
//                         {getSafeValue(req, "recipientDistrict", "district")}
//                       </span>
//                     </p>
//                     <p className="flex items-center gap-1.5">
//                       <span className="font-medium text-gray-400 dark:text-gray-500">
//                         Upazila:
//                       </span>
//                       <span className="text-gray-800 dark:text-gray-200">
//                         {getSafeValue(req, "recipientUpazila", "upazila")}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
//                   <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-100 dark:border-amber-900/20 capitalize">
//                     {req.status || "pending"}
//                   </span>
//                   <button className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline">
//                     View Details &rarr;
//                   </button>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

// 6
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { LuMapPin, LuDroplet, LuUsers } from "react-icons/lu";
import { Link } from "react-router";
import { secondaryBtn } from "../Button/buttonStyles";

// ডাটাবেজের ডাইভার্সিফাইড কী নেম হ্যান্ডেল করার জন্য হেল্পার ফাংশন
const getSafeValue = (obj, key1, key2) => obj[key1] || obj[key2] || "";

const SearchPage = () => {
  // ১. ড্রপডাউনগুলোর জন্য স্টেট
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  // ২. ডেটা এবং লোকেশন স্টেট
  const [allRequests, setAllRequests] = useState([]); // ব্যাকএন্ড থেকে আসা সব মেইন ডেটা
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // ৩. পেজ লোড হতেই ব্যাকএন্ডের সব pending ডেটা এবং ডিস্ট্রিক্ট ফাইল নিয়ে আসা
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);

        // ডিস্ট্রিক্ট এবং ব্লাড রিকোয়েস্ট দুটো প্যারালালি ফেচ হবে (Fast Performance)
        const [districtsRes, requestsRes] = await Promise.all([
          fetch("/Districts.json").then((res) => res.json()),
          axios.get(`${import.meta.env.VITE_API_URL}/donation-requests`, {
            params: { status: "pending" }, // শুরুতে সব pending রিকোয়েস্ট নিয়ে আসবে
          }),
        ]);

        setDistricts(districtsRes);
        setAllRequests(requestsRes.data || []);
      } catch (err) {
        console.error("Data loading error:", err);
        setError("Failed to load donor data. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // ৪. ডিস্ট্রিক্ট চেঞ্জ হলে উপজেলা রিসেট করার লজিক
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedUpazila(""); // নতুন জেলা সিলেক্ট করলে আগের উপজেলা মুছে যাবে
  };

  // ৫. সিলেক্টেড ডিস্ট্রিক্টের আন্ডারে উপজেলা খোঁজা
  const availableUpazilas = useMemo(() => {
    if (!selectedDistrict) return [];
    return districts.find((d) => d.name === selectedDistrict)?.upazilas || [];
  }, [selectedDistrict, districts]);

  // =========================================================================
  // ৬. মেইন জাদুকরী ফিল্টারিং লজিক (স্টেপ-বাই-স্টেপ ফ্রন্টএন্ড ফিল্টার)
  // =========================================================================
  const filteredResults = useMemo(() => {
    return allRequests.filter((req) => {
      // ব্যাকএন্ডের ভিন্ন ভিন্ন কী-নেম সাপোর্ট করার সেফগার্ড
      const reqBloodGroup = getSafeValue(req, "bloodGroup", "blood_group");
      const reqDistrict = getSafeValue(req, "recipientDistrict", "district");
      const reqUpazila = getSafeValue(req, "recipientUpazila", "upazila");

      // কন্ডিশন ১: ব্লাড গ্রুপ সিলেক্ট করা থাকলে মিলতে হবে, না থাকলে স্কিপ (সব দেখাবে)
      const matchesBlood = selectedBloodGroup
        ? reqBloodGroup === selectedBloodGroup
        : true;

      // কন্ডিশন ২: ডিস্ট্রিক্ট সিলেক্ট করা থাকলে মিলতে হবে
      const matchesDistrict = selectedDistrict
        ? reqDistrict.toLowerCase() === selectedDistrict.toLowerCase()
        : true;

      // কন্ডিশন ৩: উপজেলা সিলেক্ট করা থাকলে মিলতে হবে
      const matchesUpazila = selectedUpazila
        ? reqUpazila.toLowerCase() === selectedUpazila.toLowerCase()
        : true;

      // তিনটি কন্ডিশনই সত্য হলে তবেই কার্ডটি স্ক্রিনে থাকবে
      return matchesBlood && matchesDistrict && matchesUpazila;
    });
  }, [allRequests, selectedBloodGroup, selectedDistrict, selectedUpazila]);
  // =========================================================================

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
            Find{" "}
            <span className="text-red-600 dark:text-red-500">Blood Donors</span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-500 dark:text-gray-400">
            Filter down in real-time to find the exact match you need.
          </p>
        </header>

        {/* ফিল্টার কন্ট্রোল প্যানেল (কোনো বাটন লাগবে না, ইনস্ট্যান্ট ফিল্টার হবে) */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800/80 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* ব্লাড গ্রুপ ড্রপডাউন */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <LuDroplet className="text-red-500" /> 1. Blood Group
              </label>
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition font-medium"
              >
                <option value="">All Blood Groups (Showing All)</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* ডিস্ট্রিক্ট ড্রপডাউন */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <LuMapPin className="text-blue-500" /> 2. District
              </label>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition font-medium"
              >
                <option value="">All Districts</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* উপজেলা ড্রপডাউন */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <LuMapPin className="text-green-500" /> 3. Upazila / Thana
              </label>
              <select
                value={selectedUpazila}
                onChange={(e) => setSelectedUpazila(e.target.value)}
                disabled={!selectedDistrict}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition font-medium disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="">All Upazilas</option>
                {availableUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* এরর মেসেজ */}
        {error && (
          <div className="p-4 mb-6 text-center text-red-600 bg-red-50 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        {/* রেন্ডারিং সেকশন */}
        {isLoading ? (
          /* লোডিং অবস্থা (Skeleton) */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 animate-pulse h-40"
              ></div>
            ))}
          </div>
        ) : filteredResults.length === 0 ? (
          /* ফিল্টার করার পর কোনো ডেটা না মিললে */
          <div className="text-center py-16 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl max-w-md mx-auto shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">
              No Cards Found
            </p>
            <p className="text-sm text-gray-400 mt-1">
              No pending requests matches your selected filter workflow.
            </p>
          </div>
        ) : (
          /* মেইন রেজাল্ট (এখানেই শুরুতে সব থাকবে এবং ফিল্টার করলে কমতে থাকবে) */
          <div>
            <div className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-500 dark:text-gray-400 pl-1">
              <LuUsers className="text-red-500" />
              <span>
                Showing {filteredResults.length} active request
                {filteredResults.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredResults.map((req) => (
                <article
                  key={req._id}
                  className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800/60 hover:shadow-md transition duration-150 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg truncate">
                        {req.requesterName || "Emergency Patient"}
                      </h3>
                      <span className="shrink-0 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-black px-3 py-1 rounded-full border border-red-100 dark:border-red-900/20">
                        {getSafeValue(req, "bloodGroup", "blood_group")}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p className="flex items-center gap-1.5">
                        <span className="font-semibold text-gray-400 dark:text-gray-500">
                          District:
                        </span>
                        <span className="text-gray-800 dark:text-gray-200">
                          {getSafeValue(req, "recipientDistrict", "district")}
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className="font-semibold text-gray-400 dark:text-gray-500">
                          Upazila:
                        </span>
                        <span className="text-gray-800 dark:text-gray-200">
                          {getSafeValue(req, "recipientUpazila", "upazila")}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-100 dark:border-amber-900/20">
                      {req.status || "pending"}
                    </span>
                    {/* <button className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline">
                      View Details
                    </button> */}

                    <Link
                      to={`/donation-requests/${req._id}`}
                      className={secondaryBtn}
                      // className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;




// 1
// import axios from "axios";
// import { useEffect, useState } from "react";

// const SearchPage = () => {
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [district, setDistrict] = useState("");
//   const [upazila, setUpazila] = useState("");
//   const [results, setResults] = useState([]);
//   const [districts, setDistricts] = useState([]);

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   useEffect(() => {
//     fetch("/Districts.json")
//       .then((res) => res.json())
//       .then((data) => setDistricts(data));
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     const res = await axios.get(
//       `${import.meta.env.VITE_API_URL}/donation-requests`,
//       {
//         params: {
//           blood_group: bloodGroup,
//           district,
//           upazila,
//           status: "pending",
//         },
//       },
//     );

//     setResults(res.data);
//   };

//   return (
//     <div className="min-h-screen bg-red-50 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-4xl font-bold text-center text-red-700 mb-8">
//           Find Blood Donors
//         </h2>

//         {/* FORM */}
//         <form
//           onSubmit={handleSearch}
//           className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
//         >
//           <select
//             value={bloodGroup}
//             onChange={(e) => setBloodGroup(e.target.value)}
//             className="p-3 rounded-xl border"
//           >
//             <option value="">Blood Group</option>
//             {bloodGroups.map((bg) => (
//               <option key={bg} value={bg}>
//                 {bg}
//               </option>
//             ))}
//           </select>

//           <select
//             value={district}
//             onChange={(e) => {
//               setDistrict(e.target.value);
//               setUpazila("");
//             }}
//             className="p-3 rounded-xl border"
//           >
//             <option value="">District</option>
//             {districts.map((d) => (
//               <option key={d.id} value={d.name}>
//                 {d.name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={upazila}
//             onChange={(e) => setUpazila(e.target.value)}
//             className="p-3 rounded-xl border"
//           >
//             <option value="">Upazila</option>
//             {districts
//               .find((d) => d.name === district)
//               ?.upazilas.map((u) => (
//                 <option key={u.id} value={u.name}>
//                   {u.name}
//                 </option>
//               ))}
//           </select>

//           <button className="bg-red-600 text-white rounded-xl">Search</button>
//         </form>

//         {/* RESULTS */}
//         <div className="grid md:grid-cols-3 gap-5">
//           {results.map((req) => (
//             <div key={req._id} className="bg-white p-4 rounded-xl shadow">
//               <h2 className="text-red-600 font-bold">{req.requesterName}</h2>
//               <p>{req.blood_group}</p>
//               <p>{req.district}</p>
//               <p>{req.upazila}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

// clouddd
// import axios from "axios";
// import { useEffect, useState } from "react";

// const SearchPage = () => {
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [district, setDistrict] = useState("");
//   const [upazila, setUpazila] = useState("");
//   const [results, setResults] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [districts, setDistricts] = useState([]); // ✅ JSON থেকে লোড

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   // ✅ Districts.json লোড
//   useEffect(() => {
//     fetch("/Districts.json")
//       .then((res) => res.json())
//       .then((data) => setDistricts(data));
//   }, []);

//   // ✅ Pending requests লোড
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/donation-requests?status=pending`
//         );
//         setRequests(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchRequests();
//   }, []);

//   // ✅ Filter function
//   const handleSearch = (e) => {
//     e.preventDefault();
//     const filtered = requests.filter(
//       (req) =>
//         (bloodGroup ? req.bloodGroup === bloodGroup : true) &&
//         (district ? req.recipientDistrict === district : true) && // ✅ ঠিক করা
//         (upazila ? req.recipientUpazila === upazila : true)
//     );
//     setResults(filtered);
//   };

//   return (
//     <div className="min-h-screen bg-red-50 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-4xl font-bold text-center text-red-700 mb-8">
//           Find Blood Donors
//         </h2>

//         {/* Search Form */}
//         <form
//           onSubmit={handleSearch}
//           className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
//         >
//           {/* Blood Group */}
//           <select
//             value={bloodGroup}
//             onChange={(e) => setBloodGroup(e.target.value)}
//             className="p-3 rounded-xl border border-gray-300
//             focus:outline-none focus:ring-2 focus:ring-red-300"
//           >
//             <option value="">Blood Group</option>
//             {bloodGroups.map((bg) => (
//               <option key={bg} value={bg}>{bg}</option>
//             ))}
//           </select>

//           {/* ✅ District */}
//           <select
//             value={district}
//             onChange={(e) => {
//               setDistrict(e.target.value);
//               setUpazila("");
//             }}
//             className="p-3 rounded-xl border border-gray-300
//             focus:outline-none focus:ring-2 focus:ring-red-300"
//           >
//             <option value="">District</option>
//             {districts.map((d) => (
//               <option key={d.id} value={d.name}>{d.name}</option>
//             ))}
//           </select>

//           {/* ✅ Upazila */}
//           <select
//             value={upazila}
//             onChange={(e) => setUpazila(e.target.value)}
//             className="p-3 rounded-xl border border-gray-300
//             focus:outline-none focus:ring-2 focus:ring-red-300"
//             disabled={!district}
//           >
//             <option value="">Upazila</option>
//             {districts
//               .find((d) => d.name === district)
//               ?.upazilas.map((u) => (
//                 <option key={u.id} value={u.name}>{u.name}</option>
//               ))}
//           </select>

//           {/* Search Button */}
//           <button
//             type="submit"
//             className="bg-red-600 hover:bg-red-700 text-white
//             font-bold rounded-xl py-3 transition"
//           >
//             Search
//           </button>
//         </form>

//         {/* Results */}
//         {results.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">
//             No donors found. Fill the search form and click Search.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {results.map((req) => (
//               <div
//                 key={req._id}
//                 className="bg-white p-6 rounded-3xl shadow-lg
//                 hover:shadow-2xl transition"
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h3 className="text-xl font-medium text-red-700">
//                       {req.requesterName}
//                     </h3>
//                     <p className="text-gray-500 text-sm">
//                       {req.requesterEmail}
//                     </p>
//                   </div>
//                   <div className="bg-red-100 text-red-700 font-bold
//                   px-3 py-1 rounded-full">
//                     {req.bloodGroup}
//                   </div>
//                 </div>

//                 <p className="text-gray-600">
//                   <span className="font-medium">District:</span>{" "}
//                   {req.recipientDistrict || "N/A"} {/* ✅ */}
//                 </p>
//                 <p className="text-gray-600">
//                   <span className="font-medium">Upazila:</span>{" "}
//                   {req.recipientUpazila || "N/A"}
//                 </p>
//                 <p className="text-gray-600 mt-2">
//                   <span className="font-medium">Hospital:</span>{" "}
//                   {req.hospitalName || "N/A"}
//                 </p>
//                 <p className="text-gray-600 mt-2">
//                   <span className="font-medium">Address:</span>{" "}
//                   {req.fullAddress || "N/A"}
//                 </p>

//                 <button className="mt-4 w-full bg-red-500 text-white
//                 rounded-xl py-2 font-medium hover:bg-red-600 transition">
//                   Contact
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import { useLoaderData } from "react-router";

// const SearchPage = () => {
//   const { setLoading } = useAuth();
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [district, setDistrict] = useState("");
//   const [upazila, setUpazila] = useState("");
//   const [results, setResults] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const data = useLoaderData();

//   // Blood groups
//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   // Fetch donation requests from backend
//   useEffect(() => {
//     const fetchRequests = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/donation-requests?status=pending`
//         );
//         setRequests(res.data); // keep all requests for filtering
//         setResults([]); // start with empty results
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Filter function
//   const handleSearch = (e) => {
//     e.preventDefault();
//     const filtered = requests.filter(
//       (req) =>
//         (bloodGroup ? req.bloodGroup === bloodGroup : true) &&
//         (district ? req.district === district : true) &&
//         (upazila ? req.recipientUpazila === upazila : true)
//     );
//     setResults(filtered);
//   };

//   return (
//     <div className="min-h-screen bg-red-50 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-4xl font-bold text-center text-red-700 mb-8">
//           Find Blood Donors
//         </h2>

//         {/* Search Form */}
//         <form
//           onSubmit={handleSearch}
//           className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
//         >
//           {/* Blood Group */}
//           <select
//             value={bloodGroup}
//             onChange={(e) => setBloodGroup(e.target.value)}
//             className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
//           >
//             <option value="">Blood Group</option>
//             {bloodGroups.map((bg) => (
//               <option key={bg} value={bg}>
//                 {bg}
//               </option>
//             ))}
//           </select>

//           {/* District */}
//           <select
//             value={district}
//             onChange={(e) => {
//               setDistrict(e.target.value);
//               setUpazila(""); // reset upazila when district changes
//             }}
//             className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
//           >
//             <option value="">District</option>
//             {data.map((d) => (
//               <option key={d.id} value={d.name}>
//                 {d.name}
//               </option>
//             ))}
//           </select>

//           {/* Upazila */}
//           <select
//             value={upazila}
//             onChange={(e) => setUpazila(e.target.value)}
//             className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
//             disabled={!district}
//           >
//             <option value="">Upazila</option>
//             {data
//               .find((d) => d.name === district)
//               ?.upazilas.map((u) => (
//                 <option key={u.id} value={u.name}>
//                   {u.name}
//                 </option>
//               ))}
//           </select>

//           {/* Search Button */}
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transform transition py-3"
//           >
//             Search
//           </button>
//         </form>

//         {/* Results */}
//         {results.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">
//             No donors found. Fill the search form and click Search.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {results.map((req) => (
//               <div
//                 key={req._id}
//                 className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition"
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h3 className="text-xl font-semibold text-red-700">
//                       {req.requesterName}
//                     </h3>
//                     <p className="text-gray-500 text-sm">{req.requesterEmail}</p>
//                   </div>
//                   <div className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full">
//                     {req.bloodGroup}
//                   </div>
//                 </div>
//                 <p className="text-gray-600">
//                   <span className="font-semibold">District:</span>{" "}
//                   {req.district || "N/A"}
//                 </p>
//                 <p className="text-gray-600">
//                   <span className="font-semibold">Upazila:</span>{" "}
//                   {req.recipientUpazila || "N/A"}
//                 </p>
//                 <p className="text-gray-600 mt-2">
//                   <span className="font-semibold">Hospital:</span>{" "}
//                   {req.hospitalName || "N/A"}
//                 </p>
//                 <p className="text-gray-600 mt-2">
//                   <span className="font-semibold">Address:</span>{" "}
//                   {req.fullAddress || "N/A"}
//                 </p>
//                 <button className="mt-4 w-full bg-red-500 text-white rounded-xl py-2 font-semibold hover:bg-red-600 transition">
//                   Contact
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;
