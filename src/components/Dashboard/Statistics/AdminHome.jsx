// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../Shared/LoadingSpinner";
// import { FaChessKing, FaDonate } from "react-icons/fa";
// import { FcManager } from "react-icons/fc";
// import { MdBloodtype } from "react-icons/md";

// const AdminHome = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   //  Statistics data
//   const { data: stats = {}, isLoading } = useQuery({
//     queryKey: ["statistics"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/statistics");
//       return data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <div className="p-6">
//       {/* Welcome Section inline-flex items-center gap-2" */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-medium text-gray-800 inline-flex items-center gap-2">
//           Welcome, {user?.displayName}! <FaChessKing />
//         </h2>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage everything from here
//         </p>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//         {/* Total Donors */}
//         <div
//           className="bg-red-50 border border-red-100
//         rounded-xl p-5 flex items-center gap-4"
//         >
//           <div className="bg-red-100 p-3 rounded-full text-2xl">
//             <FcManager />
//           </div>
//           <div>
//             <p className="text-3xl font-medium text-gray-800">
//               {stats.totalUsers || 0}
//             </p>
//             <p className="text-sm text-gray-500 mt-1">Total Donors</p>
//           </div>
//         </div>

//         {/* Total Funding */}
//         <div
//           className="bg-green-50 border border-green-100
//         rounded-xl p-5 flex items-center gap-4"
//         >
//           <div className="bg-green-100 p-3 rounded-full text-2xl">
//             <FaDonate />
//           </div>
//           <div>
//             <p className="text-3xl font-medium text-gray-800">
//               ${stats.totalFunding || 0}
//             </p>
//             <p className="text-sm text-gray-500 mt-1">Total Funding</p>
//           </div>
//         </div>

//         {/* Total Requests */}
//         <div
//           className="bg-blue-50 border border-blue-100
//         rounded-xl p-5 flex items-center gap-4"
//         >
//           <div className="bg-blue-100 p-3 rounded-full text-2xl">

//             <MdBloodtype />
//           </div>
//           <div>
//             <p className="text-3xl font-medium text-gray-800">
//               {stats.totalRequests || 0}
//             </p>
//             <p className="text-sm text-gray-500 mt-1">
//               Total Donation Requests
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminHome;

// 2
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaChessKing, FaDonate } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { MdBloodtype } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  StatCardSkeleton,
  ChartSkeleton,
} from "./Skeleton";  

const PIE_COLORS = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

const StatCard = ({ icon, value, label, bg, iconBg }) => (
  <div
    className={`${bg} rounded-xl p-5 flex items-center gap-4 
                   border transition-all duration-300 hover:shadow-md`}
  >
    <div className={`${iconBg} p-3 rounded-full text-2xl flex-shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-3xl font-bold text-gray-800 dark:text-white">
        {value}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div>
  </div>
);

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/statistics");
      return data;
    },
  });

  
  const monthlyData =
    stats.monthlyData?.length > 0
      ? stats.monthlyData
      : [{ month: "No Data", requests: 0 }];

  const bloodGroupData =
    stats.bloodGroupData?.length > 0
      ? stats.bloodGroupData
      : [{ name: "No Data", value: 1 }];

  const fundData =
    stats.fundData?.length > 0
      ? stats.fundData
      : [{ month: "No Data", amount: 0 }];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* ── Welcome ── */}
      <div
        className="flex items-center gap-3 pb-4 
                      border-b border-gray-100 dark:border-gray-800"
      >
        <div>
          <h2
            className="text-2xl font-bold text-gray-900 dark:text-white 
                         flex items-center gap-2"
          >
            Welcome, {user?.displayName}!
            <FaChessKing className="text-yellow-500" />
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening today
          </p>
        </div>
      </div>

     
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon={<FcManager />}
            value={stats.totalUsers || 0}
            label="Total Donors"
            bg="bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30"
            iconBg="bg-red-100 dark:bg-red-900/40"
          />
          <StatCard
            icon={<FaDonate className="text-green-600" />}
            value={`$${stats.totalFunding?.toFixed(2) || 0}`}
            label="Total Funding"
            bg="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30"
            iconBg="bg-green-100 dark:bg-green-900/40"
          />
          <StatCard
            icon={<MdBloodtype className="text-blue-600" />}
            value={stats.totalRequests || 0}
            label="Total Donation Requests"
            bg="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30"
            iconBg="bg-blue-100 dark:bg-blue-900/40"
          />
        </div>
      )}

     
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bar Chart — Monthly Requests */}
          <div
            className="bg-white dark:bg-gray-800 rounded-xl 
                          border border-gray-100 dark:border-gray-700 p-5"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Monthly Donation Requests
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#f9fafb",
                  }}
                />
                <Bar dataKey="requests" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart — Blood Groups */}
          <div
            className="bg-white dark:bg-gray-800 rounded-xl 
                          border border-gray-100 dark:border-gray-700 p-5"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
               Blood Group Distribution
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={bloodGroupData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {bloodGroupData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#f9fafb",
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ color: "#9ca3af", fontSize: "12px" }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <div
          className="bg-white dark:bg-gray-800 rounded-xl 
                        border border-gray-100 dark:border-gray-700 p-5"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
             Fund Collection Over Time
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={fundData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#f9fafb",
                }}
                formatter={(value) => [`$${value}`, "Amount"]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#ef4444"
                strokeWidth={2.5}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AdminHome;