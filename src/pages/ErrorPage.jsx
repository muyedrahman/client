import { useNavigate } from "react-router";
import Button from "../components/Shared/Button/Button";
import {  primaryBtn, secondaryBtn } from "../components/Shared/Button/buttonStyles";
import Error from "../assets/images/error.png";


const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          {/* Warning Icon Container */}
          <p className="p-3 text-red-500 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/20">
            <img src={Error} alt="Errror" />
          </p>

          {/* Error Message */}
          <h1 className="mt-4 text-2xl font-black text-gray-900 dark:text-white md:text-3xl tracking-tight">
            Something Went Wrong!
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            An unexpected error has occurred. Here are some helpful links to get
            you back on track:
          </p>

          {/* Action Buttons */}
          <div className="flex items-center w-full mt-8 gap-3 justify-center">
            {/* Go Back Button (Using secondaryBtn) */}
            <button
              onClick={() => navigate(-1)}
              className={`${secondaryBtn} flex items-center gap-x-2 text-sm`}
            >
              <span>Go back</span>
            </button>

            {/* Take Me Home Button (Using primaryBtn via Shared Button Component) */}
            <button 
            onClick={() => navigate("/")} 
            className={primaryBtn}>
              Take Me Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;