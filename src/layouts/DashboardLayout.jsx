// import { Outlet } from 'react-router'
// import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

// const DashboardLayout = () => {
//   return (
//     <div className='relative min-h-screen md:flex bg-white'>
//       {/* Left ----->Sidebar   */}
//       <Sidebar />
//       {/* Right Side ->>>> Dashboard   */}
//       <div className='flex-1  md:ml-64'>
//         <div className='p-5'>

//           <Outlet />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DashboardLayout

import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Content */}
      <div className="flex-1 md:ml-64">
        <div className="p-5 text-gray-900 dark:text-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;