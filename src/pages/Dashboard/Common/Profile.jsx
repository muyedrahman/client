import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();

  const [userData, setUserData] = useState({});
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // load districts
  useEffect(() => {
    fetch("/Districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  // load user
  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        const { data } = await axiosSecure.get("/users");
        const currentUser = data.find((u) => u.email === user.email);
        setUserData(currentUser || {});
      } catch (err) {
        console.error(err);
      } finally {
        setUserDataLoading(false);
      }
    };

    fetchUser();
  }, [user?.email]);

  // district change  
  const handleDistrictChange = (e) => {
    const selectedName = e.target.value;

    const found = districts.find((d) => d.name === selectedName);

    setUpazilas(found ? found.upazilas : []);

    setUserData((prev) => ({
      ...prev,
      district: selectedName,
      upazila: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // update
  const handleUpdate = async () => {
    try {
      const updatedData = {
        name: userData.name,
        blood_group: userData.blood_group,
        district: userData.district,
        upazila: userData.upazila,
      };

      await axiosSecure.patch(`/users/update/${userData.email}`, updatedData);

      toast.success("Profile updated successfully!");
      setUserData((prev) => ({ ...prev, ...updatedData }));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading || userDataLoading) return <LoadingSpinner />;
  if (!user) return null;

  const avatar =
    userData?.image ||
    user?.photoURL ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="p-6 bg-red-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-red-500 to-red-700" />

        <div className="flex flex-col items-center -mt-12 px-6 pb-6">
          <img
            src={avatar}
            className="h-24 w-24 rounded-full border-4 border-white object-cover"
          />

          <span className="mt-2 px-4 py-1 text-xs text-white bg-red-500 rounded-full">
            {role}
          </span>

          {/* buttons */}
          <div className="w-full flex justify-end mt-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="border px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* FORM */}
          <div className="w-full mt-4 space-y-4">
            {/* name */}
            <input
              name="name"
              value={userData.name || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              className="w-full border p-2 rounded"
            />

            {/* email */}
            <input
              value={userData.email || ""}
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />

            {/* blood */}
            <select
              name="blood_group"
              value={userData.blood_group || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>

            {/* district */} 
            <select
              onChange={handleDistrictChange}
              disabled={!isEditing}
              className="w-full border p-2 rounded"
              value={userData.district || ""}
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* upazila */}
            <select
              name="upazila"
              value={userData.upazila || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Upazila</option>
              {upazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;