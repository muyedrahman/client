// import { Link } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../Shared/LoadingSpinner";

// const DonorHome = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   //  last 3  request
//   const { data: requests = [], isLoading } = useQuery({
//     queryKey: ["my-recent-requests", user?.email],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(
//         `/donation-requests/my?email=${user?.email}&limit=3`,
//       );
//       return data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <div className="p-6">
//       {/* Welcome Section */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-medium text-gray-800">
//           Welcome back, {user?.displayName}!
//         </h2>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage your blood donation requests
//         </p>
//       </div>

//       {/* Recent Requests */}
//       {requests.length > 0 && (
//         <div>
//           <h3 className="text-base font-medium text-gray-700 mb-3">
//             Recent Donation Requests
//           </h3>

//           <div className="overflow-x-auto rounded-xl border border-gray-100">
//             <table className="w-full text-sm">
//               <thead className="bg-red-600 text-white">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Recipient</th>
//                   <th className="px-4 py-3 text-left">Location</th>
//                   <th className="px-4 py-3 text-left">Blood</th>
//                   <th className="px-4 py-3 text-left">Date</th>
//                   <th className="px-4 py-3 text-left">Status</th>
//                   <th className="px-4 py-3 text-left">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requests.map((req, idx) => (
//                   <tr
//                     key={req._id}
//                     className={idx % 2 === 0 ? "bg-white" : "bg-red-50"}
//                   >
//                     <td className="px-4 py-3">{req.recipientName}</td>
//                     <td className="px-4 py-3">
//                       {req.recipientDistrict}, {req.recipientUpazila}
//                     </td>
//                     <td className="px-4 py-3 font-medium text-red-600">
//                       {req.bloodGroup}
//                     </td>
//                     <td className="px-4 py-3">{req.donationDate}</td>
//                     <td className="px-4 py-3">
//                       <StatusBadge status={req.status} />
//                     </td>
//                     <td className="px-4 py-3">
//                       <ActionButtons req={req} />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* View All Button */}
//           <div className="mt-4">
//             <Link
//               to="/dashboard/my-donation-requests"
//               className="bg-red-600 hover:bg-red-700 text-white
//               px-5 py-2 rounded-lg text-sm font-medium transition-all"
//             >
//               View My All Requests →
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// //  Status Badge
// const StatusBadge = ({ status }) => {
//   const styles = {
//     pending: "bg-yellow-100 text-yellow-800",
//     inprogress: "bg-blue-100 text-blue-800",
//     done: "bg-green-100 text-green-800",
//     canceled: "bg-red-100 text-red-800",
//   };

//   return (
//     <span
//       className={`px-2 py-1 rounded-full text-xs font-medium
//       ${styles[status]}`}
//     >
//       {status}
//     </span>
//   );
// };

// //  Action Buttons
// const ActionButtons = ({ req }) => {
//   return (
//     <div className="flex gap-2 flex-wrap">

//       {req.status === "inprogress" && (
//         <>
//           <button
//             className="bg-green-500 hover:bg-green-600 text-white
//           px-3 py-1 rounded-lg text-xs"
//           >
//             Done
//           </button>
//           <button
//             className="bg-gray-200 hover:bg-gray-300 text-gray-700
//           px-3 py-1 rounded-lg text-xs"
//           >
//             Cancel
//           </button>
//         </>
//       )}

//       {req.status === "pending" && (
//         <>
//           <Link
//             to={`/dashboard/edit-donation-request/${req._id}`}
//             className="bg-blue-500 hover:bg-blue-600 text-white
//             px-3 py-1 rounded-lg text-xs"
//           >
//             Edit
//           </Link>
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white
//           px-3 py-1 rounded-lg text-xs"
//           >
//             Delete
//           </button>
//         </>
//       )}

//       {/*   View   */}
//       <Link
//         to={`/dashboard/donation-details/${req._id}`}
//         className="bg-gray-100 hover:bg-gray-200 text-gray-700
//         px-3 py-1 rounded-lg text-xs"
//       >
//         View
//       </Link>
//     </div>
//   );
// };

// export default DonorHome;

//  2

// import { Link } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { TableSkeleton } from "./Skeleton";
// import { primaryBtn } from "../../Shared/Button/buttonStyles";
// import { MdOutlineBloodtype } from "react-icons/md";

// // ── Status Badge ──
// const StatusBadge = ({ status }) => {
//   const styles = {
//     pending:
//       "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
//     inprogress:
//       "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
//     done: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
//     canceled: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
//   };
//   return (
//     <span
//       className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
//     >
//       {status}
//     </span>
//   );
// };

// // ── Action Buttons ──
// const ActionButtons = ({ req }) => (
//   <div className="flex gap-2 flex-wrap">
//     {req.status === "inprogress" && (
//       <>
//         <button
//           className="bg-green-500 hover:bg-green-600 text-white
//                            px-3 py-1 rounded-lg text-xs transition-colors"
//         >
//           Done
//         </button>
//         <button
//           className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300
//                            dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300
//                            px-3 py-1 rounded-lg text-xs transition-colors"
//         >
//           Cancel
//         </button>
//       </>
//     )}
//     {req.status === "pending" && (
//       <>
//         <Link
//           to={`/dashboard/edit-donation-request/${req._id}`}
//           className="bg-blue-500 hover:bg-blue-600 text-white
//                      px-3 py-1 rounded-lg text-xs transition-colors"
//         >
//           Edit
//         </Link>
//         <button
//           className="bg-red-500 hover:bg-red-600 text-white
//                            px-3 py-1 rounded-lg text-xs transition-colors"
//         >
//           Delete
//         </button>
//       </>
//     )}
//     <Link
//       to={`/dashboard/donation-details/${req._id}`}
//       className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200
//                  dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300
//                  px-3 py-1 rounded-lg text-xs transition-colors"
//     >
//       View
//     </Link>
//   </div>
// );

// // ── Main Component ──
// const DonorHome = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: requests = [], isLoading } = useQuery({
//     queryKey: ["my-recent-requests", user?.email],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(
//         `/donation-requests/my?email=${user?.email}&limit=3`,
//       );
//       return data;
//     },
//   });

//   return (
//     <div className="p-4 md:p-6 space-y-6">
//       {/* ── Welcome ── */}
//       <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Welcome back, {user?.displayName}! 👋
//         </h2>
//         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//           Manage your blood donation requests
//         </p>
//       </div>

//       {/* ── Quick Stats ── */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         {[
//           {
//             label: "Total",
//             value: requests.length,
//             color: "text-blue-600 dark:text-blue-400",
//             bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30",
//           },
//           {
//             label: "Pending",
//             value: requests.filter((r) => r.status === "pending").length,
//             color: "text-yellow-600 dark:text-yellow-400",
//             bg: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900/30",
//           },
//           {
//             label: "In Progress",
//             value: requests.filter((r) => r.status === "inprogress").length,
//             color: "text-purple-600 dark:text-purple-400",
//             bg: "bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/30",
//           },
//           {
//             label: "Completed",
//             value: requests.filter((r) => r.status === "done").length,
//             color: "text-green-600 dark:text-green-400",
//             bg: "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30",
//           },
//         ].map(({ label, value, color, bg }) => (
//           <div
//             key={label}
//             className={`${bg} rounded-xl p-4 border transition-colors duration-300`}
//           >
//             <p className={`text-2xl font-bold ${color}`}>{value}</p>
//             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//               {label}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* ── Recent Requests Table ── */}
//       <div
//         className="bg-white dark:bg-gray-800 rounded-xl
//                       border border-gray-100 dark:border-gray-700
//                       overflow-hidden transition-colors duration-300"
//       >
//         {/* Table Header */}
//         <div
//           className="flex items-center justify-between px-5 py-4
//                         border-b border-gray-100 dark:border-gray-700"
//         >
//           <h3 className="font-semibold text-gray-900 dark:text-white">
//             Recent Donation Requests
//           </h3>
//           <Link
//             to="/dashboard/my-donation-requests"
//             className="text-sm text-red-600 dark:text-red-400
//                        hover:underline font-medium"
//           >
//             View All →
//           </Link>
//         </div>

//         {/* Loading */}
//         {isLoading ? (
//           <div className="p-4">
//             <TableSkeleton rows={3} />
//           </div>
//         ) : /* Empty State */
//         requests.length === 0 ? (
//           <div className="text-center py-14">
//             <p className="text-5xl mb-3">

//               <MdOutlineBloodtype />
//             </p>
//             <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
//               No donation requests yet
//             </p>
//             <Link
//               to="/dashboard/create-donation-request"
//               className={primaryBtn}
//               // className="inline-block px-5 py-2.5 bg-red-600 hover:bg-red-700
//               //            text-white text-sm font-medium rounded-xl transition-colors"
//             >
//               + Create First Request
//             </Link>
//           </div>
//         ) : (
//           /* Table */
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-red-600 text-white">
//                 <tr>
//                   {[
//                     "Recipient",
//                     "Location",
//                     "Blood",
//                     "Date",
//                     "Status",
//                     "Action",
//                   ].map((h) => (
//                     <th
//                       key={h}
//                       className="px-4 py-3 text-left font-medium whitespace-nowrap"
//                     >
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {requests.map((req, idx) => (
//                   <tr
//                     key={req._id}
//                     className={`border-b border-gray-50 dark:border-gray-700
//                                 hover:bg-gray-50 dark:hover:bg-gray-700/50
//                                 transition-colors duration-150
//                                 ${
//                                   idx % 2 === 0
//                                     ? "bg-white dark:bg-gray-800"
//                                     : "bg-red-50/30 dark:bg-gray-800/50"
//                                 }`}
//                   >
//                     <td
//                       className="px-4 py-3 font-medium
//                                    text-gray-900 dark:text-white whitespace-nowrap"
//                     >
//                       {req.recipientName}
//                     </td>
//                     <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
//                       {req.recipientDistrict}, {req.recipientUpazila}
//                     </td>
//                     <td
//                       className="px-4 py-3 font-bold
//                                    text-red-600 dark:text-red-400"
//                     >
//                       {req.bloodGroup}
//                     </td>
//                     <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
//                       {req.donationDate}
//                     </td>
//                     <td className="px-4 py-3">
//                       <StatusBadge status={req.status} />
//                     </td>
//                     <td className="px-4 py-3">
//                       <ActionButtons req={req} />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DonorHome;

import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { TableSkeleton } from "./Skeleton";
import { primaryBtn, secondaryBtn } from "../../Shared/Button/buttonStyles";
import { MdOutlineBloodtype } from "react-icons/md";

// ── Status Badge ──
const StatusBadge = ({ status }) => {
  const styles = {
    pending:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
    inprogress:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    done: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    canceled: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
};

// ── Action Buttons ──
const ActionButtons = ({ req }) => (
  <div className="flex gap-2 flex-wrap">
    {req.status === "inprogress" && (
      <>
        <button
          className="bg-green-500 hover:bg-green-600 text-white 
                     px-3 py-1 rounded-lg text-xs transition-colors"
        >
          Done
        </button>
        <button
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 
                     dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300
                     px-3 py-1 rounded-lg text-xs transition-colors"
        >
          Cancel
        </button>
      </>
    )}
    {req.status === "pending" && (
      <>
        <Link
          to={`/dashboard/edit-donation-request/${req._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white 
                     px-3 py-1 rounded-lg text-xs transition-colors"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 hover:bg-red-600 text-white 
                     px-3 py-1 rounded-lg text-xs transition-colors"
        >
          Delete
        </button>
      </>
    )}
    <Link
      to={`/dashboard/donation-details/${req._id}`}
      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300
                 px-3 py-1 rounded-lg text-xs transition-colors"
    >
      View
    </Link>
  </div>
);

// ── Main Component ──
const DonorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["my-recent-requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation-requests/my?email=${user?.email}&limit=3`,
      );
      return data;
    },
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* ── Welcome Header (Clean Title) ── */}
      <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.displayName}!
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your blood donation requests
        </p>
      </div>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Total",
            value: requests.length,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30",
          },
          {
            label: "Pending",
            value: requests.filter((r) => r.status === "pending").length,
            color: "text-yellow-600 dark:text-yellow-400",
            bg: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900/30",
          },
          {
            label: "In Progress",
            value: requests.filter((r) => r.status === "inprogress").length,
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/30",
          },
          {
            label: "Completed",
            value: requests.filter((r) => r.status === "done").length,
            color: "text-green-600 dark:text-green-400",
            bg: "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30",
          },
        ].map(({ label, value, color, bg }) => (
          <div
            key={label}
            className={`${bg} rounded-xl p-4 border transition-colors duration-300`}
          >
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Recent Requests Table / Empty State ── */}
      <div
        className="bg-white dark:bg-gray-800 rounded-xl 
                   border border-gray-100 dark:border-gray-700 
                   overflow-hidden transition-colors duration-300"
      >
        {/* Table Title Block */}
        <div
          className="flex items-center justify-between px-5 py-4 
                     border-b border-gray-100 dark:border-gray-700"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Recent Donation Requests
          </h3>
          <Link
            to="/dashboard/my-donation-requests"
            className={secondaryBtn}
            // className="text-sm text-red-600 dark:text-red-400
            //            hover:underline font-medium"
          >
            View All
          </Link>
        </div>

        {/* Dynamic Rendering: Loading vs Empty vs Data */}
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton rows={3} />
          </div>
        ) : requests.length === 0 ? (
          /* নিখুঁতভাবে মাঝখানে অ্যালাইন করা রেড কালার আইকন এম্পটি স্টেট */
          <div className="text-center py-14">
            <p className="text-5xl mb-3 flex justify-center text-red-600 dark:text-red-500">
              <MdOutlineBloodtype />
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              No donation requests yet
            </p>
            <Link
              to="/dashboard/create-donation-request"
              className={primaryBtn}
            >
              + Create First Request
            </Link>
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-red-600 text-white">
                <tr>
                  {[
                    "Recipient",
                    "Location",
                    "Blood",
                    "Date",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-medium whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                =
                {requests.map((req, idx) => (
                  <tr
                    key={req._id}
                    className={`border-b border-gray-50 dark:border-gray-700
                                hover:bg-gray-50 dark:hover:bg-gray-700/50
                                transition-colors duration-150
                                ${
                                  idx % 2 === 0
                                    ? "bg-white dark:bg-gray-800"
                                    : "bg-red-50/30 dark:bg-gray-800/50"
                                }`}
                  >
                    <td
                      className="px-4 py-3 font-medium 
                                 text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {req.recipientName}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td
                      className="px-4 py-3 font-bold 
                                 text-red-600 dark:text-red-400"
                    >
                      {req.bloodGroup}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {req.donationDate}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-4 py-3">
                      <ActionButtons req={req} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorHome;