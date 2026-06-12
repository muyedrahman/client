import { Outlet } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
const MainLayout = () => {
  return (
    <div
      className="min-h-screen bg-white dark:bg-gray-950 
                    text-gray-900 dark:text-gray-100 
                    transition-colors duration-300"
    >
      <Navbar />
      <div className="pt-24 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout
