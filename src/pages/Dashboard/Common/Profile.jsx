import { useState, useEffect, useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  primaryBtn,
  secondaryBtn,
} from "../../../components/Shared/Button/buttonStyles";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const inputClass = (editable) =>
  `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200
   ${
     editable
       ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
       : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
   }`;

const labelClass =
  "block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();

  const [userData, setUserData] = useState({});
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [saving, setSaving] = useState(false);

  
  const originalUserData = useRef({});

 
  useEffect(() => {
    fetch("/Districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

   
  useEffect(() => {
    if (!user?.email) return;
    const fetchUser = async () => {
      try {
        const { data } = await axiosSecure.get(`/users/${user.email}`);
        setUserData(data || {});
        originalUserData.current = data || {};  

        if (data?.district) {
          const found = districts.find((d) => d.name === data.district);
          if (found) setUpazilas(found.upazilas);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile data");
      } finally {
        setUserDataLoading(false);
      }
    };
    fetchUser();
  }, [user?.email, districts.length, axiosSecure]);

 
  const handleDistrictChange = (e) => {
    const selectedName = e.target.value;
    const found = districts.find((d) => d.name === selectedName);
    setUpazilas(found ? found.upazilas : []);
    setUserData((prev) => ({ ...prev, district: selectedName, upazila: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
 

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const updatedData = {
        name: userData.name,
        blood_group: userData.blood_group,
        district: userData.district,
        upazila: userData.upazila,
      };
      await axiosSecure.patch(`/users/update/${userData.email}`, updatedData);
      toast.success("Profile updated successfully!");

    
      originalUserData.current = { ...userData, ...updatedData };
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

 
  const handleCancel = () => {
    setIsEditing(false);
     
    setUserData(originalUserData.current);

    if (originalUserData.current?.district) {
      const found = districts.find(
        (d) => d.name === originalUserData.current.district,
      );
      if (found) setUpazilas(found.upazilas);
    } else {
      setUpazilas([]);
    }
  };

  if (loading || userDataLoading) return <LoadingSpinner />;
  if (!user) return null;

  const avatar =
    userData?.image ||
    user?.photoURL ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const roleColors = {
    admin: "bg-purple-500",
    volunteer: "bg-blue-500",
    donor: "bg-red-500",
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-red-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-md overflow-hidden">
           
          <div className="h-32 bg-gradient-to-r from-red-500 to-red-700 relative">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          <div className="px-6 pb-6">
            
            <div className="flex items-end justify-between -mt-12 mb-4">
              <div className="relative">
                <img
                  src={avatar}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow-md"
                />
                <span
                  className={`absolute bottom-0 right-0 px-2.5 py-0.5 text-xs text-white rounded-full font-bold tracking-wide uppercase ${
                    roleColors[role] || "bg-red-500"
                  }`}
                >
                  {role}
                </span>
              </div>

              
              <div className="flex gap-2 mt-14">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`${primaryBtn} text-sm`}
                  >
                      Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className={`${secondaryBtn} text-sm`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      disabled={saving}
                      className={`${primaryBtn} text-sm flex items-center gap-2`}
                    >
                      {saving && (
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Meta Info */}
            <div className="mb-5">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {userData.name || user?.displayName || "User"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {userData.email || user?.email}
              </p>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 mb-5" />

            {/* Profile Form Canvas */}
            <div className="space-y-4">
              {/* Full Name Input */}
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  name="name"
                  value={userData.name || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  placeholder="Your full name"
                  className={inputClass(isEditing)}
                />
              </div>

              {/* Immutable Email Address */}
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  value={userData.email || user?.email || ""}
                  readOnly
                  className={inputClass(false)}
                />
              </div>

              {/* Blood Group Select */}
              <div>
                <label className={labelClass}>Blood Group</label>
                <select
                  name="blood_group"
                  value={userData.blood_group || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={inputClass(isEditing)}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Geolocation Section: District & Upazila */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>District</label>
                  <select
                    value={userData.district || ""}
                    onChange={handleDistrictChange}
                    disabled={!isEditing}
                    className={inputClass(isEditing)}
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Upazila</label>
                  <select
                    name="upazila"
                    value={userData.upazila || ""}
                    onChange={handleChange}
                    disabled={!isEditing || upazilas.length === 0}
                    className={inputClass(isEditing && upazilas.length > 0)}
                  >
                    <option value="">
                      {upazilas.length === 0
                        ? "Select district first"
                        : "Select Upazila"}
                    </option>
                    {upazilas.map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Editing Feedback  */}
            {isEditing && (
              <p className="mt-5 text-xs text-center text-gray-400 dark:text-gray-500 font-medium animate-pulse">
                  You are in edit mode — make changes and click Save
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;