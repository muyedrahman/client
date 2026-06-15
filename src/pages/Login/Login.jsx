import { useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import SocialLogin from "../Auth/SocialLogin/SocialLogin";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Error from "../../assets/images/error.png"

const LoginPage = () => {
  const { signIn, loading, user  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (user) return <Navigate to={from} replace={true} />;
  if (loading) return <LoadingSpinner />;

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      await signIn(data.email.trim(), data.password);

      toast.success("Login Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      if (err.message.includes("auth/invalid-credential")) {
        toast.error("Incorrect email or password!");
      } else {
        toast.error("Login Failed! Please try again.");
      }

      // setLoading(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
                 bg-red-50 dark:bg-gray-950
                 px-4 transition-colors duration-300"
    >
      <div
        className="max-w-md w-full bg-white dark:bg-gray-900
                   border border-gray-100 dark:border-gray-800
                   p-8 rounded-2xl shadow-lg"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Sign in to continue to Blood Donation
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Sign in to your account
          </span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium
                         text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>

            <div className="relative">
              <AiOutlineMail
                className="absolute left-3 top-1/2 -translate-y-1/2
                           text-gray-400 dark:text-gray-500"
                size={18}
              />

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm
                           bg-white dark:bg-gray-800
                           text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500
                           outline-none transition-all duration-200
                           ${
                             errors.email
                               ? "border-red-500 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-800"
                               : "border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                           }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <img src={Error} alt="error" className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium
                         text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>

            <div className="relative">
              <AiOutlineLock
                className="absolute left-3 top-1/2 -translate-y-1/2
                           text-gray-400 dark:text-gray-500"
                size={18}
              />

              <input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="******"
                className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm
                           bg-white dark:bg-gray-800
                           text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500
                           outline-none transition-all duration-200
                           ${
                             errors.password
                               ? "border-red-500 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-800"
                               : "border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                           }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-400 dark:text-gray-500
                           hover:text-gray-600
                           dark:hover:text-gray-300
                           transition-colors"
              >
                {showPass ? (
                  <AiOutlineEyeInvisible size={18} />
                ) : (
                  <AiOutlineEye size={18} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <img src={Error} alt="error" className="w-4 h-4" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 hover:bg-red-700
                       disabled:opacity-60 disabled:cursor-not-allowed
                       text-white font-semibold py-3 rounded-xl
                       shadow-md shadow-red-200 
                       hover:scale-[1.02] active:scale-100
                       transition-all duration-300 mt-1
                       flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span
                  className="w-4 h-4 border-2 border-white
                             border-t-transparent rounded-full animate-spin"
                />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Signup Link */}
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm mt-1">
            Don't have an account?
            <Link
              to="/signup"
              className="text-red-600 dark:text-red-400 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm mt-1">
            Return to
            <Link
              to="/"
              className="text-red-600 dark:text-red-400 font-semibold hover:underline m-1"
            >
              Home Page
            </Link>
          </p>

          {/* Social Login Divider */}
          <div className="relative my-1">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs text-gray-400 dark:text-gray-500">
                or continue with
              </span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>

          <SocialLogin />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;