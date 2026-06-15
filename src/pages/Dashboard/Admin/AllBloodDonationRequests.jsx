import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { primaryBtn, secondaryBtn } from "../../../components/Shared/Button/buttonStyles";

const AllBloodDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //   request load
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-requests", filter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation-requests${filter ? `?status=${filter}` : ""}`,
      );
      return data;
    },
  });

  //   Status Update
  const handleStatusUpdate = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Mark as ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c0392b",
      confirmButtonText: "Yes!",
    });
    if (result.isConfirmed) {
      await axiosSecure.patch(`/donation-requests/${id}`, { status });
      refetch();
      Swal.fire("Done!", `Status updated to ${status}`, "success");
    }
  };

  //   Delete -  only+ Admin
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c0392b",
      confirmButtonText: "Yes, Delete!",
    });
    if (result.isConfirmed) {
      await axiosSecure.delete(`/donation-requests/${id}`);
      refetch();
      Swal.fire("Deleted!", "Request deleted", "success");
    }
  };

  //   Pagination
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const paginatedRequests = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:!bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
          Loading requests...
        </p>
      </div>
    );
  }

  return (
   
    <div className="p-6 bg-gray-50 dark:!bg-gray-950 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-500">
          All Blood Donation Requests
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {["", "pending", "inprogress", "done", "canceled"].map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setCurrentPage(1);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200
                ${
                  filter === f
                    ? "bg-red-600 text-white border-red-600 shadow-sm"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
            >
              {f === ""
                ? "All"
                : f === "inprogress"
                  ? "In Progress"
                  : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl bg-white dark:bg-gray-900 shadow-md border border-gray-100 dark:border-gray-800/60">
        <table className="w-full text-sm text-gray-800 dark:text-gray-200">
          <thead className="bg-red-600 dark:bg-red-700 text-white font-semibold">
            <tr>
              <th className="px-4 py-3.5 text-left">#</th>
              <th className="px-4 py-3.5 text-left">Requester</th>
              <th className="px-4 py-3.5 text-left">Recipient</th>
              <th className="px-4 py-3.5 text-left">Location</th>
              <th className="px-4 py-3.5 text-left">Blood</th>
              <th className="px-4 py-3.5 text-left">Date</th>
              <th className="px-4 py-3.5 text-left">Status</th>
              <th className="px-4 py-3.5 text-left">Donor Info</th>
              <th className="px-4 py-3.5 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {paginatedRequests.map((req, idx) => (
              <tr
                key={req._id}
                
                className={`transition-colors duration-150 
                  ${
                    idx % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-red-50/30 dark:bg-gray-950/40"
                  } hover:bg-gray-50/80 dark:hover:bg-gray-800/50`}
              >
                <td className="px-4 py-3.5 font-medium">
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </td>
                <td className="px-4 py-3.5">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {req.requesterName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {req.requesterEmail}
                  </p>
                </td>
                <td className="px-4 py-3.5 font-medium text-gray-900 dark:text-gray-100">
                  {req.recipientName}
                </td>
                <td className="px-4 py-3.5 text-gray-600 dark:text-gray-400">
                  {req.recipientDistrict}, {req.recipientUpazila}
                </td>
                <td className="px-4 py-3.5 font-bold text-red-600 dark:text-red-400">
                  {req.bloodGroup}
                </td>
                <td className="px-4 py-3.5 text-gray-700 dark:text-gray-300">
                  {req.donationDate}
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={req.status} />
                </td>
                <td className="px-4 py-3.5 text-xs text-gray-600 dark:text-gray-400">
                  {req.status === "inprogress" ? (
                    <div className="space-y-0.5">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        {req.donorName}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {req.donorEmail}
                      </p>
                    </div>
                  ) : (
                    <span className="text-gray-300 dark:text-gray-600">—</span>
                  )}
                </td>

                {/* Action Buttons */}
                <td className="px-4 py-3.5">
                  <div className="flex gap-1.5 flex-wrap">
                    {req.status === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(req._id, "done")}
                          className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1 rounded-lg text-xs font-medium transition shadow-sm"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "canceled")
                          }
                          className="bg-gray-500 hover:bg-gray-600 text-white px-2.5 py-1 rounded-lg text-xs font-medium transition shadow-sm"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {/* Edit -> Admin */}
                    {role === "admin" && req.status === "pending" && (
                      <Link
                        to={`/dashboard/edit-donation-request/${req._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg text-xs font-medium transition shadow-sm text-center"
                      >
                        Edit
                      </Link>
                    )}

                    {/* Delete -> Admin */}
                    {role === "admin" && req.status === "pending" && (
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded-lg text-xs font-medium transition shadow-sm"
                      >
                        Delete
                      </button>
                    )}

                    <Link
                      to={`/donation-requests/${req._id}`}
                      className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-lg text-xs font-medium transition border border-gray-200/40 dark:border-gray-700 text-center"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-10 text-gray-400 dark:text-gray-500 font-medium"
                >
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-6">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className={secondaryBtn}
          
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3.5 py-2 rounded-xl border text-sm font-semibold transition-all duration-200
                ${
                  currentPage === page
                    ? "bg-red-600 text-white border-red-600 shadow-sm"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={
              () => setCurrentPage((p) => p - 1)  
            }
            // onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className={primaryBtn}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

 
const StatusBadge = ({ status }) => {
  const styles = {
    pending:
      "bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-200/40 dark:border-amber-900/20",
    inprogress:
      "bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-400 border border-blue-200/40 dark:border-blue-900/20",
    done: "bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-400 border border-green-200/40 dark:border-green-900/20",
    canceled:
      "bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-400 border border-red-200/40 dark:border-red-900/20",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
      ${styles[status] || "bg-gray-100 text-gray-800"}`}
    >
      {status === "inprogress" ? "In Progress" : status}
    </span>
  );
};

export default AllBloodDonationRequests;