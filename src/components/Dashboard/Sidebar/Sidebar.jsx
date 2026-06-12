import { useEffect, useState } from "react";
import { Link } from "react-router";
import logo from "../../../assets/images/logo (1).png";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import MenuItem from "./Menu/MenuItem";
import DonorMenu from "./Menu/DonorMenu";
import AdminMenu from "./Menu/AdminMenu";
import VolunteerMenu from "./Menu/VolunteerMenu";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";



const Sidebar = () => {
  const { setLoading } = useAuth();
  const [requests, setRequests] = useState([]);
  const [role,isRoleLoading] = useRole()
  // Fetch pending donation requests
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-requests?status=pending`,
        );
        setRequests(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);
  // console.log(requests);

  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
if(isRoleLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <>
      {/* dark:bg-gray-900  dark:text-white  */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden  dark:bg-gray-900  dark:text-white">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img src={logo} alt="logo" width="100" height="100" />
            </Link>
          </div>
        </div>
        {/* dark:focus:bg-gray-800 */}
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-800"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar  dark:bg-gray-900  text-gray-800 dark:text-white*/}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100
          dark:bg-gray-900  text-gray-800 dark:text-white
          w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
            isActive && "-translate-x-full" 
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Top Content */}
          <div>
            {/* Logo  dark:bg-gray-800 */}
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 dark:bg-gray-800 mx-auto">
              <Link to="/">
                <img src={logo} alt="logo" width="100" height="100" />
              </Link>
            </div>
          </div>

          {/* Middle Content */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              {/* Common Menu */}
              <MenuItem
                icon={MdDashboard}
                label="Dashboard"
                address="/dashboard"
              />

              {role === "donor" && <DonorMenu />}
              {role === "volunteer" && <VolunteerMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <hr className="border-gray-300 dark:border-gray-700" />

            <MenuItem
              icon={FcSettings}
              label="Profile"
              address="/dashboard/profile"
            />
            <button
              onClick={logOut}
              className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800  hover:text-gray-700 dark:hover:text-white  transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
