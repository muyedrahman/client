import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("");

  //  TanStack Query ->>> data fetch
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users", filter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users${filter ? `?status=${filter}` : ""}`,
      );
      return data;
    },
  });

  //  Block / Unblock
  const handleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";

    const result = await Swal.fire({
      title: "Are you sure?",
      text:
        newStatus === "blocked"
          ? "User will be blocked!"
          : "User will be unblocked!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c0392b",
      confirmButtonText: "Yes!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${id}/status`, { status: newStatus });
        refetch();
        Swal.fire("Done!", `User ${newStatus} successfully`, "success");
      } catch (error) {
        Swal.fire("Error!", "Something went wrong", "error");
      }
    }
  };

  //  Role Change
  const handleRole = async (id, role) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `User will be ${role}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c0392b",
      confirmButtonText: "Yes!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${id}/role`, { role });
        refetch();
        Swal.fire("Done!", `User is now ${role}`, "success");
      } catch (error) {
        Swal.fire("Error!", "Something went wrong", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:!bg-gray-950">
        <p className="text-xl font-medium text-gray-700 dark:text-gray-300 animate-pulse">
          Loading users...
        </p>
      </div>
    );
  }

  return (
    
    <div className="p-6 bg-gray-50 dark:!bg-gray-950 min-h-screen transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-700 dark:text-red-500">
        All Users
      </h2>

      {/*  Filter Buttons */}
      <div className="mb-6 flex justify-end gap-2">
        {["", "active", "blocked"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
              ${
                filter === f
                  ? "bg-red-600 text-white border-red-600 shadow-sm"
                  : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
          >
            {f === "" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto shadow-md rounded-xl border border-gray-100 dark:border-gray-800/60 bg-white dark:bg-gray-900">
        <table className="min-w-full text-sm text-gray-800 dark:text-gray-200">
          <thead className="bg-red-600 dark:bg-red-700 text-white font-semibold">
            <tr>
              <th className="py-3.5 px-4 text-left">#</th>
              <th className="py-3.5 px-4 text-left">Avatar</th>
              <th className="py-3.5 px-4 text-left">Name</th>
              <th className="py-3.5 px-4 text-left">Email</th>
              <th className="py-3.5 px-4 text-left">Role</th>
              <th className="py-3.5 px-4 text-left">Status</th>
              <th className="py-3.5 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {users.map((user, idx) => (
              <tr
                key={user._id}
               
                className={`transition-colors duration-150 
                  ${
                    idx % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-red-50/40 dark:bg-gray-950/40"
                  } hover:bg-gray-50/80 dark:hover:bg-gray-800/50`}
              >
                <td className="py-3.5 px-4 font-medium">{idx + 1}</td>

                <td className="py-3.5 px-4">
                  <img
                    src={user.image || "https://i.pravatar.cc/100"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
                  />
                </td>

                <td className="py-3.5 px-4 font-medium text-gray-900 dark:text-gray-100">
                  {user.name}
                </td>
                <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">
                  {user.email}
                </td>

                {/*  Role Badge */}
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide capitalize
                    ${
                      user.role === "admin"
                        ? "bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-400 border border-green-200/50 dark:border-green-900/30"
                        : user.role === "volunteer"
                          ? "bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/30"
                          : "bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/30"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/*  Status Badge */}
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide capitalize
                    ${
                      user.status === "blocked"
                        ? "bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-400 border border-red-200/50 dark:border-red-900/30"
                        : "bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-400 border border-green-200/50 dark:border-green-900/30"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                {/*  Action Buttons */}
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        handleStatus(user._id, user.status || "active")
                      }
                      className={`px-3 py-1.5 rounded-lg text-white text-xs font-medium transition shadow-sm
                        ${
                          user.status === "blocked"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                      {user.status === "blocked" ? "Unblock" : "Block"}
                    </button>

                    {/*  Make Volunteer */}
                    {user.role === "donor" && (
                      <button
                        onClick={() => handleRole(user._id, "volunteer")}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition shadow-sm"
                      >
                        Make Volunteer
                      </button>
                    )}

                    {/* Make Admin */}
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleRole(user._id, "admin")}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium transition shadow-sm"
                      >
                        Make Admin
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-400 dark:text-gray-500 font-medium"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;