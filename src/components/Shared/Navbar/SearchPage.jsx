import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { LuMapPin, LuDroplet, LuUsers } from "react-icons/lu";
import { Link } from "react-router";
import { secondaryBtn } from "../Button/buttonStyles";

 
const getSafeValue = (obj, key1, key2) => obj[key1] || obj[key2] || "";

const SearchPage = () => {
 
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  // 2  
  const [allRequests, setAllRequests] = useState([]); 
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // 3
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);

        //  
        const [districtsRes, requestsRes] = await Promise.all([
          fetch("/Districts.json").then((res) => res.json()),
          axios.get(`${import.meta.env.VITE_API_URL}/donation-requests`, {
            params: { status: "pending" },  
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

  // 4
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedUpazila("");  
  };

  // 5
  const availableUpazilas = useMemo(() => {
    if (!selectedDistrict) return [];
    return districts.find((d) => d.name === selectedDistrict)?.upazilas || [];
  }, [selectedDistrict, districts]);

  
  // 6
 
  const filteredResults = useMemo(() => {
    return allRequests.filter((req) => {
       
      const reqBloodGroup = getSafeValue(req, "bloodGroup", "blood_group");
      const reqDistrict = getSafeValue(req, "recipientDistrict", "district");
      const reqUpazila = getSafeValue(req, "recipientUpazila", "upazila");

      
      const matchesBlood = selectedBloodGroup
        ? reqBloodGroup === selectedBloodGroup
        : true;

     
      const matchesDistrict = selectedDistrict
        ? reqDistrict.toLowerCase() === selectedDistrict.toLowerCase()
        : true;

      
      const matchesUpazila = selectedUpazila
        ? reqUpazila.toLowerCase() === selectedUpazila.toLowerCase()
        : true;

     
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

       
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800/80 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
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

        
        {error && (
          <div className="p-4 mb-6 text-center text-red-600 bg-red-50 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        
        {isLoading ? (
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 animate-pulse h-40"
              ></div>
            ))}
          </div>
        ) : filteredResults.length === 0 ? (
         
          <div className="text-center py-16 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl max-w-md mx-auto shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">
              No Cards Found
            </p>
            <p className="text-sm text-gray-400 mt-1">
              No pending requests matches your selected filter workflow.
            </p>
          </div>
        ) : (
         
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
                    
                    <Link
                      to={`/donation-requests/${req._id}`}
                      className={secondaryBtn}
                     
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

