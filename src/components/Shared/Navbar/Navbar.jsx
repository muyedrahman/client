// 2clou
import Container from "../Container";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo (1).png";
import ThemeToggle from "../ThemeToggle";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);  
  const [dropOpen, setDropOpen] = useState(false);  
  const dropRef = useRef(null);

  // outside click — dropdown  
  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

   
  const closeAll = () => {
    setIsOpen(false);
    setDropOpen(false);
  };

  // active link style
  const navLinkClass = ({ isActive }) =>
    `font-semibold transition-colors duration-200 hover:text-red-600 ${
      isActive ? "text-red-600" : "text-gray-700 dark:text-gray-200"
    }`;

  return (
    <div
      className="fixed w-full bg-white dark:bg-gray-900 z-50 shadow-sm 
                    border-b border-gray-100 dark:border-gray-800 transition-colors duration-300"
    >
      <Container>
        <div className="flex items-center justify-between h-16">
           
          <Link
            to="/"
            onClick={closeAll}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <img
              src={logo}
              alt="BloodBond logo"
              className="h-10 w-auto rounded-full"
            />
          </Link>

          {/*  CENTER: Desktop Links  */}
          <nav className="hidden md:flex items-center gap-7">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
        
            <NavLink to="/search-page" className={navLinkClass}>
              Search
            </NavLink>
            {user && (
              <NavLink to="/founding" className={navLinkClass}>
                Funding
              </NavLink>
            )}
            <NavLink to="/blog" className={navLinkClass}>
              Blog
            </NavLink>
          </nav>

          {/* RIGHT: Theme + Profile/Auth */}
          <div className="flex items-center gap-3">
           
            <ThemeToggle />

            {/*  LOGGED IN: Profile Dropdown   */}
            {user ? (
              <div className="relative hidden md:block" ref={dropRef}>
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center gap-2 p-1 rounded-full 
                             border-2 border-transparent hover:border-red-400 
                             transition-all duration-200"
                  aria-label="Profile menu"
                >
                  <img
                    src={user?.photoURL || avatarImg}
                    referrerPolicy="no-referrer"
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </button>

                {/* Dropdown */}
                {dropOpen && (
                  <div
                    className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-800 
                                  rounded-xl shadow-lg border border-gray-100 
                                  dark:border-gray-700 overflow-hidden z-50"
                  >
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="font-bold text-sm text-gray-900 dark:text-white truncate">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={closeAll}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold
                                 text-gray-700 dark:text-gray-200
                                 hover:bg-red-50 dark:hover:bg-red-900/20 
                                 hover:text-red-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logOut();
                        closeAll();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-3 
                                 text-sm font-semibold text-red-600
                                 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* LOGGED OUT: Login + Signup   */
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold 
                             text-red-600 border border-red-200 
                             hover:bg-red-50 dark:hover:bg-red-900/20 
                             dark:text-red-400 dark:border-red-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl text-sm font-semibold 
                             text-white bg-red-600 hover:bg-red-700 
                             transition-colors shadow-sm shadow-red-200"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/*   HAMBURGER: Mobile Only   */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? (
                <AiOutlineClose size={22} />
              ) : (
                <AiOutlineMenu size={22} />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/*  MOBILE MENU (dropdown panel) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
                    bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800
                    ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <Container>
          <nav className="py-3 flex flex-col gap-1">
           
            {user && (
              <div
                className="flex items-center gap-3 px-3 py-3 mb-1 
                              bg-red-50 dark:bg-red-900/20 rounded-xl"
              >
                <img
                  src={user?.photoURL || avatarImg}
                  referrerPolicy="no-referrer"
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-red-300"
                />
                <div className="overflow-hidden">
                  <p className="font-bold text-sm text-gray-900 dark:text-white truncate">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            {/* Nav links */}
            {[
              { to: "/", label: "Home", end: true },
              { to: "/search-page", label: "Search" },
              { to: "/blog", label: "Blog" },
            ].map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeAll}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-xl text-sm font-semibold transition-colors
                   ${
                     isActive
                       ? "bg-red-50 dark:bg-red-900/20 text-red-600"
                       : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                   }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Funding — logged in only */}
            {user && (
              <NavLink
                to="/founding"
                onClick={closeAll}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-xl text-sm font-semibold transition-colors
                   ${
                     isActive
                       ? "bg-red-50 dark:bg-red-900/20 text-red-600"
                       : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                   }`
                }
              >
                Funding
              </NavLink>
            )}

            {/* Divider */}
            <div className="border-t border-gray-100 dark:border-gray-800 my-1" />

            {/* Auth */}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeAll}
                  className="px-3 py-3 rounded-xl text-sm font-semibold 
                             text-gray-700 dark:text-gray-200
                             hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logOut();
                    closeAll();
                  }}
                  className="w-full text-left px-3 py-3 rounded-xl text-sm font-semibold 
                             text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 px-1 py-2">
                <Link
                  to="/login"
                  onClick={closeAll}
                  className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold 
                             text-red-600 border border-red-200 dark:border-red-800
                             hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeAll}
                  className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold 
                             text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;


// import Container from '../Container'
// import { AiOutlineMenu } from 'react-icons/ai'
// import { useEffect, useState } from 'react'
// import { Link } from 'react-router'
// import useAuth from '../../../hooks/useAuth'
// import avatarImg from '../../../assets/images/placeholder.jpg'
// import logo from '../../../assets/images/logo (1).png'
// import axios from 'axios'
// import ThemeToggle from '../ThemeToggle'

// const Navbar = () => {
//   const { user, logOut,setLoading } = useAuth()
//   const [isOpen, setIsOpen] = useState(false)
//   const [users, setUsers] = useState([]);
//   const [image ,setImage ]=useState({})
//    // 🔹 get users from backend
//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API_URL}/users`
//         );
//         const result =data.map(d=>setImage(d.image))
//         setUsers(data); //  dynamic data
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     getUsers();
//   }, []);
// console.log(image)
//   return (
//     <div className="fixed w-full bg-white z-10 shadow-sm">
//       <div className="py-4">
//         <Container>
//           <div className="flex items-center justify-between">
//             {/* LEFT: Logo */}
//             <Link to="/" className="flex items-center gap-2">
//               <img
//                 className="rounded-full"
//                 src={logo}
//                 alt="logo"
//                 md:width="200"
//                 md:height="100"
//               />
//             </Link>

//             {/* RIGHT: Links + Dropdown */}
//             <div className="flex items-center gap-6">
//               {/* RIGHT SIDE MAIN LINKS (Desktop Only) */}
//               <div className="hidden md:flex items-center gap-6 text-base font-semibold">
//                 {/* <Link to='/donation-request' className='hover:text-red-600 transition'>
//               Donation Request
//             </Link> */}
//                 <Link
//                   to="/search-page"
//                   className="hover:text-red-600 transition"
//                 >
//                   Search Page
//                 </Link>

//                 {user && (
//                   <Link
//                     to="/founding"
//                     className="hover:text-red-600 transition"
//                   >
//                     Funding
//                   </Link>
//                 )}

//                 <Link to="/blog" className="hover:text-red-600 transition">
//                   Blog
//                 </Link>
//               </div>

//               {/* DROPDOWN MENU */}
//               <div className="relative">
//                 <div
//                   onClick={() => setIsOpen(!isOpen)}
//                   className="p-4 md:py-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
//                 >
//                   <AiOutlineMenu />
//                   <div className="hidden md:block">
//                     <img
//                       className="rounded-full"
//                       referrerPolicy="no-referrer"
//                       src={user?.photoURL ? user?.photoURL || image : avatarImg}
//                       // src={users? users?.image || user?.image :avatarImg  }
//                       alt="profile"
//                       height="30"
//                       width="30"
//                     />
//                   </div>
//                 </div>

//                 {/* Dropdown Items */}
//                 {isOpen && (
//                   <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[12vw] bg-white overflow-hidden right-0 top-12 text-sm">
//                     <div className="flex flex-col cursor-pointer ">
//                       {/* Mobile-only links */}
//                       <Link
//                         to="/"
//                         className="block md:hidden px-4 py-3  transition  hover:text-white hover:bg-red-500 hover:rounded-md font-bold"
//                       >
//                         Home
//                       </Link>

//                       <Link
//                         to="/donation-request"
//                         className="block md:hidden px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md"
//                       >
//                         Donation Request
//                       </Link>
//                       <Link
//                         to="/search-page"
//                         className="block md:hidden px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md"
//                       >
//                         Search Page
//                       </Link>

//                       {user && (
//                         <Link
//                           to="/founding"
//                           className="block md:hidden px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md"
//                         >
//                           Funding
//                         </Link>
//                       )}

//                       <Link
//                         to="/blog"
//                         className="block md:hidden px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md"
//                       >
//                         Blog
//                       </Link>

//                       {/* Auth Options */}
//                       {user ? (
//                         <>
//                           <Link
//                             to="/dashboard"
//                             className="px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md"
//                           >
//                             Dashboard
//                           </Link>

//                           <div
//                             onClick={logOut}
//                             className="px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md cursor-pointer"
//                           >
//                             Logout
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <div className="flex items-center gap-3">
//                             <ThemeToggle />
                           
//                           </div>

//                           <Link
//                             to="/login"
//                             className="px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md "
//                           >
//                             Login
//                           </Link>

//                           <Link
//                             to="/signup"
//                             className="px-4 py-3  transition font-bold hover:text-white hover:bg-red-500 hover:rounded-md"
//                           >
//                             Sign Up
//                           </Link>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default Navbar
