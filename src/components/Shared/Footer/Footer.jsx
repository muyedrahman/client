import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-gray-100 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            Blood Donation App
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            A user-friendly platform connecting donors with those in need of
            blood. Join our community and help save lives across Bangladesh!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/donation-request", label: "Donation Requests" },
              { to: "/search-page", label: "Search Donors" },
              { to: "/blog", label: "Blog" },
              { to: "/dashboard", label: "Dashboard" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
          <ul className="space-y-2 text-sm mb-5">
            <li className="flex items-center gap-2 text-gray-400">
              <MdEmail className="text-red-400 flex-shrink-0" size={16} />
              support@bloodapp.com
            </li>
            <li className="flex items-center gap-2 text-gray-400">
              <MdPhone className="text-red-400 flex-shrink-0" size={16} />
              +880 123 456 789
            </li>
          </ul>

          {/* Social Icons */}
          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-400 transition-colors duration-200"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 pt-5 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-gray-400 font-medium">
            Blood Donation Application
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
