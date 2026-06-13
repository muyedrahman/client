import { useEffect, useState } from "react";
import axios from "axios";
 
import {
  FaUsers,
  FaHeartbeat,
  FaHandHoldingHeart,
  FaMapMarkedAlt,
} from "react-icons/fa";

const StatCard = ({ icon: Icon, value, label }) => (
  <div
    className="text-center p-6 bg-white dark:bg-gray-900 
               rounded-2xl shadow-sm border border-gray-100/80 
               dark:border-gray-800/60 transition-all duration-300 hover:shadow-md group"
  >
     
    <div className="flex justify-center mb-3">
      <div className="text-3xl text-red-500 dark:text-red-400 p-3 bg-red-50 dark:bg-red-950/40 rounded-xl group-hover:scale-110 transition-transform duration-300">
        <Icon />
      </div>
    </div>

    <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
      {value ?? "..."}
    </div>
    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {label}
    </div>
  </div>
);

const StatsSection = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/stats`)
      .then((res) => setStats(res.data))
      .catch(() => {
        // fallback static data
        setStats({
          totalDonors: 1200,
          totalRequests: 850,
          completedDonations: 640,
          totalDistricts: 64,
        });
      });
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:!bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-center 
                       text-gray-900 dark:text-white mb-3"
        >
          Our Impact
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10 max-w-md mx-auto text-sm md:text-base">
          Together we are making a difference across Bangladesh
        </p>

        {/* Grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            icon={FaUsers}
            value={stats?.totalDonors?.toLocaleString()}
            label="Registered Donors"
          />
          <StatCard
            icon={FaHeartbeat}
            value={stats?.totalRequests?.toLocaleString()}
            label="Donation Requests"
          />
          <StatCard
            icon={FaHandHoldingHeart}
            value={stats?.completedDonations?.toLocaleString()}
            label="Lives Saved"
          />
          <StatCard
            icon={FaMapMarkedAlt}
            value={stats?.totalDistricts}
            label="Districts Covered"
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
