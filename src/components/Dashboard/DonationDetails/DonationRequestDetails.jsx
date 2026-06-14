import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import axios from "axios";
import {
  LuArrowLeft,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuPhone,
  LuHeart,
  LuHospital,
  LuUser,
  LuFileText,
} from "react-icons/lu";
import Error from "../../../assets/images/error.png"
import { primaryBtn } from "../../Shared/Button/buttonStyles";

const DonationRequestDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

       
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
        );
        setRequest(response.data);
      } catch (err) {
        console.error("Error fetching donation details:", err);
        setError(
          " 'Information  for this blood donation request was not found. It may have been deleted or completed.' ",
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-4 border-red-200 dark:border-red-950 border-t-red-600 animate-spin"></div>
        </div>
      </div>
    );
  }


  if (error || !request) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 text-center">
        <div className="text-red-500 text-5xl mb-4">
       
          <img src={Error} alt="Err" />
        </div>

        <p className="text-gray-800 dark:text-gray-200 font-bold text-lg max-w-md">
          {error || "কিছু একটা ভুল হয়েছে!"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-bold text-sm transition"
        >
          <LuArrowLeft /> 
        </button>
      </div>
    );
  }

  
  const bloodGroup = request.bloodGroup || request.blood_group || "N/A";
  const district = request.recipientDistrict || request.district || "N/A";
  const upazila = request.recipientUpazila || request.upazila || "N/A";
  const phoneNumber = request.phoneNumber || request.phone || "";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
   
        <button
          onClick={() => navigate(-1)}
          className={`${primaryBtn} mb-6 inline-flex items-center gap-2`}
        >
          <LuArrowLeft className="text-base shrink-0" />
          <span>Back to List</span>
        </button>

       
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800/80 overflow-hidden">
     
          <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="bg-white/20 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 inline-block">
                {request.status || "Pending"} Emergency Request
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight flex items-center gap-2">
                <LuUser className="shrink-0 opacity-80" />{" "}
                {request.requesterName || "Anonymous Patient"}
              </h1>
            </div>

      
            <div className="bg-white dark:bg-gray-950 text-red-600 dark:text-red-500 text-3xl font-black px-6 py-3 rounded-2xl shadow-lg shrink-0 flex items-center justify-center min-w-[85px] border border-red-50 dark:border-gray-800">
              {bloodGroup}
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
     
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-950 text-red-500 border border-gray-100 dark:border-gray-800/60">
                  <LuHospital className="text-xl" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Hospital Name
                  </h4>
                  <p className="text-gray-900 dark:text-gray-100 font-bold mt-0.5 truncate">
                    {request.hospitalName || "Not Specified"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 break-words">
                    {request.fullAddress ||
                      request.address ||
                      "No full address added"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-950 text-blue-500 border border-gray-100 dark:border-gray-800/60">
                  <LuMapPin className="text-xl" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Location Area
                  </h4>
                  <p className="text-gray-900 dark:text-gray-100 font-bold mt-0.5">
                    {upazila}, {district}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Bangladesh
                  </p>
                </div>
              </div>

              {/* DAte*/}
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-950 text-green-500 border border-gray-100 dark:border-gray-800/60">
                  <LuCalendar className="text-xl" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Donation Date
                  </h4>
                  <p className="text-gray-900 dark:text-gray-100 font-bold mt-0.5">
                    {request.donationDate || "Urgent/Today"}
                  </p>
                </div>
              </div>

         
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-950 text-amber-500 border border-gray-100 dark:border-gray-800/60">
                  <LuClock className="text-xl" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Required Time
                  </h4>
                  <p className="text-gray-900 dark:text-gray-100 font-bold mt-0.5">
                    {request.donationTime || "ASAP"}
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-gray-800" />

          
            <div>
              <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <LuFileText className="text-red-500" /> Medical Reason / Message
              </h4>
              <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800/60 text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {request.medicalReason ||
                  request.reason ||
                  "No additional message was provided. For details, please call the number given below directly."}
              </div>
            </div>

            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase block">
                  Current Status
                </span>
                <span className="inline-flex items-center text-xs font-extrabold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-100 dark:border-amber-900/20 uppercase mt-1.5">
                  {request.status || "pending"}
                </span>
              </div>

             
              {phoneNumber ? (
                <a
                  href={`tel:${phoneNumber}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-red-600/10 transition duration-150 text-sm"
                >
                  <LuPhone className="text-base shrink-0" />
                  <span>Call Requester ({phoneNumber})</span>
                </a>
              ) : (
                <span className="text-sm text-gray-400 italic">
                  No phone number provided
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestDetails;