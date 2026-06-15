import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { primaryBtn } from "../../../components/Shared/Button/buttonStyles";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // JSON  
  useEffect(() => {
    fetch("/Districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  // District  
  const handleDistrictChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const found = districts.find((d) => d.id === selectedId);
    setUpazilas(found ? found.upazilas : []);
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const requestData = {
      requesterName: form.requesterName.value,
      requesterEmail: form.requesterEmail.value,
      recipientName: form.recipientName.value,
      recipientDistrict:
        form.recipientDistrict.options[form.recipientDistrict.selectedIndex]
          .text,
      recipientUpazila: form.recipientUpazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
      status: "pending",
    };

    try {
      const { data } = await axiosSecure.post(
        "/donation-requests",
        requestData,
      );

      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Created!",
          text: "Your donation request has been submitted.",
          confirmButtonColor: "#c0392b",
        });
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong. Try again.",
        confirmButtonColor: "#c0392b",
      });
    }
  };

  // Darkmm
  const inputStyle = `w-full border px-4 py-2 rounded-lg outline-none
    bg-white dark:bg-gray-800 
    border-gray-300 dark:border-gray-700 
    text-gray-900 dark:text-white 
    focus:border-red-400 dark:focus:border-red-500 transition-colors
    [&>option]:bg-white [&>option]:dark:bg-gray-800 
    [&>option]:text-gray-900 [&>option]:dark:text-white`;

  const labelStyle =
    "text-sm text-gray-600 dark:text-gray-400 mb-1 block font-medium";

  return (
    <div className="p-6 bg-red-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-500 mb-6 text-center">
          Create Donation Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Requester Name - Read Only */}
          <div>
            <label className={labelStyle}>Requester Name</label>
            <input
              type="text"
              name="requesterName"
              defaultValue={user?.displayName}
              readOnly
              className="w-full border px-4 py-2 rounded-lg 
              bg-gray-100 dark:bg-gray-800/50 
              border-gray-200 dark:border-gray-700
              cursor-not-allowed text-gray-500 dark:text-gray-400"
            />
          </div>

          {/* Requester Email -  */}
          <div>
            <label className={labelStyle}>Requester Email</label>
            <input
              type="email"
              name="requesterEmail"
              defaultValue={user?.email}
              readOnly
              className="w-full border px-4 py-2 rounded-lg 
              bg-gray-100 dark:bg-gray-800/50 
              border-gray-200 dark:border-gray-700
              cursor-not-allowed text-gray-500 dark:text-gray-400"
            />
          </div>

          {/* Recipient Name */}
          <div>
            <label className={labelStyle}>Recipient Name</label>
            <input
              type="text"
              name="recipientName"
              placeholder="Enter recipient name"
              required
              className={inputStyle}
            />
          </div>

          {/* District & Upazila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* District */}
            <div>
              <label className={labelStyle}>Recipient District</label>
              <select
                name="recipientDistrict"
                required
                onChange={handleDistrictChange}
                className={inputStyle}
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className={labelStyle}>Recipient Upazila</label>
              <select
                name="recipientUpazila"
                required
                disabled={!upazilas.length}
                className={`${inputStyle} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <option value="">
                  {upazilas.length ? "Select Upazila" : "Select District First"}
                </option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hospital Name */}
          <div>
            <label className={labelStyle}>Hospital Name</label>
            <input
              type="text"
              name="hospitalName"
              placeholder="e.g. Dhaka Medical College Hospital"
              required
              className={inputStyle}
            />
          </div>

          {/* Full Address */}
          <div>
            <label className={labelStyle}>Full Address</label>
            <input
              type="text"
              name="fullAddress"
              placeholder="e.g. Zahir Raihan Rd, Dhaka"
              required
              className={inputStyle}
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className={labelStyle}>Blood Group</label>
            <select name="bloodGroup" required className={inputStyle}>
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Donation Date</label>
              <input
                type="date"
                name="donationDate"
                required
                className={`${inputStyle} dark:[color-scheme:dark]`}
              />
            </div>
            <div>
              <label className={labelStyle}>Donation Time</label>
              <input
                type="time"
                name="donationTime"
                required
                className={`${inputStyle} dark:[color-scheme:dark]`}
              />
            </div>
          </div>

          {/* Request Message */}
          <div>
            <label className={labelStyle}>Request Message</label>
            <textarea
              name="requestMessage"
              rows={4}
              placeholder="Why do you need blood? Explain in detail..."
              required
              className={`${inputStyle} resize-none`}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-2">
            <button type="submit" className={primaryBtn}>
              Request Blood Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;