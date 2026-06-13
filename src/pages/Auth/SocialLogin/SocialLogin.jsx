import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";
import { secondaryBtn } from "../../../components/Shared/Button/buttonStyles";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location in social", location);

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);

        // create user in the database
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user data has been stored", res.data);
          navigate(location.state || "/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="text-center pb-8 transition-colors duration-300">
      
      <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
        OR
      </p>

      {/* Google Button */}
      <button
        onClick={handleGoogleSignIn}
        
        className={`${secondaryBtn} flex items-center justify-center gap-2.5 mx-auto px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-sm transition-all duration-200 shadow-sm`}
      >
         
        <svg
          aria-label="Google logo"
          width="18"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="shrink-0"
        >
          <g>
            
            <path d="m0 0H512V512H0" fill="transparent"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>

        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;