// import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import toast from "react-hot-toast";
// import axios from "axios";
// import LoadingSpinner from './../../components/Shared/LoadingSpinner';
// import { imageUpload } from "../../utils";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const { createUser, updateUserProfile, loading, } = useAuth();
//   const data = useLoaderData();
//   const location = useLocation();
//   const from = location.state || "/";

//   // React Hook Form
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   // console.log(errors)

//   const selectedDistrict = watch("district");

//   const districts = data.map((d) => d.name);

//   const filteredUpazilas =
//     data.find((d) => d.name === selectedDistrict)?.upazilas || [];

//   const onSubmit = async (data) => {
//     const { name, image, email, password, bloodGroup, district, upazila } =
//       data;

//     const imageFile = image[0];

//     try {
//       // data
//       // const res = await axios.post(
//       //   `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
//       //   formData,
//       // );
//       const imageURL = await imageUpload(imageFile);

//       //1. User Registration
//       const result = await createUser(email, password);
//       //2. IMAGE upload
//       // const cloudinaryImageUrl = await imageUploadCloudinary(imageFile);
//       // console.log(cloudinaryImageUrl);

//       // 4.save the data in db
//       // cloudinaryImageUrl
//       try {
//         const userInfo = {
//           name,
//           email,
//           image: imageURL,
//           blood_group: bloodGroup,
//           district,
//           upazila,
//           role: "donor",
//           status: "active",
//           createdAt: new Date().toISOString(),
//         };

//         // 4️ Save to MongoDB
//         const res = await axios.post(
//           `${import.meta.env.VITE_API_URL}/users`,
//           userInfo,
//         );

//         console.log("MongoDB Response:", res.data);
//       } catch (error) {
//         console.log(error);
//       }

//       //3. Save username & profile photo  +++++++++++ , cloudinaryImageUrl
//       await updateUserProfile(name, imageURL);
//       console.log(result);
//       // 5.Navigate part
//       navigate(from, { replace: true });
//       toast.success("Signup Successful");
//     } catch (err) {
//       console.log(err);
//       toast.error(err?.message);
//     }
//   };

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   const password = watch("password");
//   if(loading) return <LoadingSpinner></LoadingSpinner>

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
//       <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg">
//         <h2 className="text-3xl font-bold text-center text-gray-900">
//           Sign Up for Blood Donation
//         </h2>

//         <form
//           className="mt-6 flex flex-col gap-4"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           {/* Name */}
//           <input
//             type="text"
//             placeholder="Full Name"
//             {...register("name", { required: "Name is required" })}
//             className="w-full border border-gray-300 rounded-lg px-4 py-3"
//           />
//           {errors.name && <p className="text-red-600">{errors.name.message}</p>}

//           {/* Email */}
//           <input
//             type="email"
//             placeholder="Enter Your Email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//             })}
//             className="w-full border border-gray-300 rounded-lg px-4 py-3"
//           />
//           {errors.email && (
//             <p className="text-red-600">{errors.email.message}</p>
//           )}

//           {/* Avatar  Image Upload  */}
//           <input
//             type="file"
//             placeholder="Enter Your"
//             accept="image/*"
//             {...register("image", { required: "Avatar is required" })}
//             className="w-full border border-gray-300 rounded-lg px-4 py-3"
//           />
//           {errors.image && (
//             <p className="text-red-600">{errors.image.message}</p>
//           )}

//           {/* Blood Group */}
//           <select
//             {...register("bloodGroup", { required: "Blood group is required" })}
//             className="w-full border border-gray-300 rounded-lg px-4 py-3"
//           >
//             <option value="">Select Blood Group</option>
//             {bloodGroups.map((bg) => (
//               <option key={bg} value={bg}>
//                 {bg}
//               </option>
//             ))}
//           </select>
//           {errors.bloodGroup && (
//             <p className="text-red-600">{errors.bloodGroup.message}</p>
//           )}

//           {/* Password */}
//           <input
//             type="password"
//             placeholder="Password"
//             {...register("password", {
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password must be at least 6 characters",
//               },
//             })}
//             className="w-full border border-gray-300 rounded-lg px-4 py-3"
//           />
//           {errors.password && (
//             <p className="text-red-600">{errors.password.message}</p>
//           )}

//           {/* Confirm Password */}
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             {...register("confirmPassword", {
//               required: "Confirm Password is required",
//               validate: (value) =>
//                 value === password || "Passwords do not match",
//             })}
//             className="w-full border border-gray-300 rounded-lg px-4 py-3"
//           />
//           {errors.confirmPassword && (
//             <p className="text-red-600">{errors.confirmPassword.message}</p>
//           )}

//           {/* District */}
//           <select
//             {...register("district", { required: "District is required" })}
//             className="w-full border border-gray-300 rounded-lg px-4 py-3"
//           >
//             <option value="">Select District</option>
//             {districts.map((d) => (
//               <option key={d} value={d}>
//                 {d}
//               </option>
//             ))}
//           </select>

//           {/* Upazila */}
//           <select
//             {...register("upazila", { required: "Upazila is required" })}
//             className="w-full border border-gray-300 rounded-lg px-4 py-3"
//             disabled={!selectedDistrict}
//           >
//             <option value="">Select Upazila</option>
//             {filteredUpazilas.map((u) => (
//               <option key={u.id} value={u.name}>
//                 {u.name}
//               </option>
//             ))}
//           </select>

//           {/* Submit */}
//           <button className="bg-red-600 text-white font-semibold py-3 rounded-full mt-2">
//             Sign Up
//           </button>
//         </form>

//         <p className="text-gray-600 text-center mt-4">
//           Already have an account?
//           <Link to="/login" className="text-red-600 font-semibold">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingSpinner from "./../../components/Shared/LoadingSpinner";
import { imageUpload } from "../../utils";
import { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import Error from "../../assets/images/error.png";
import User from "../../assets/images/user.png";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, loading } = useAuth();
  const data = useLoaderData();
  const location = useLocation();
  const from = location.state || "/";
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedDistrict = watch("district");
  const password = watch("password");

  const districts = data.map((d) => d.name);
  const filteredUpazilas =
    data.find((d) => d.name === selectedDistrict)?.upazilas || [];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formData) => {
    const { name, image, email, password, bloodGroup, district, upazila } =
      formData;
    const imageFile = image[0];
    setSubmitting(true);
    try {
      const imageURL = await imageUpload(imageFile);
      await createUser(email, password);

      const userInfo = {
        name,
        email,
        image: imageURL,
        blood_group: bloodGroup,
        district,
        upazila,
        role: "donor",
        status: "active",
        createdAt: new Date().toISOString(),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
      await updateUserProfile(name, imageURL);

      toast.success("Signup Successful! Welcome");
      navigate(from, { replace: true });
    } catch (err) {
      if (err.message.includes("auth/email-already-in-use")) {
        toast.error("Email already registered!");
      } else {
        toast.error(err?.message || "Signup failed!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  //   Reusable input class  
  const inputClass = (hasError) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border text-sm
     bg-white dark:bg-gray-800
     text-gray-900 dark:text-white
     placeholder-gray-400 dark:placeholder-gray-500
     outline-none transition-all duration-200
     ${
       hasError
         ? "border-red-500 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-800"
         : "border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
     }`;

  const selectClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border text-sm
     bg-white dark:bg-gray-800
     text-gray-900 dark:text-white
     outline-none transition-all duration-200
     ${
       hasError
         ? "border-red-500 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-800"
         : "border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
     }`;

  const errorMsg = (msg) => (
    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <img src={Error} alt="error" className="w-4 h-4" /> {msg}
    </p>
  );

  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div
      className="min-h-screen flex items-center justify-center
                    bg-red-50 dark:bg-gray-950
                    px-4 py-10 transition-colors duration-300"
    >
      <div
        className="max-w-lg w-full bg-white dark:bg-gray-900
                      border border-gray-100 dark:border-gray-800
                      p-8 rounded-2xl shadow-lg"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Join our blood donation community
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/*  Full Name*/}
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>
            <div className="relative">
              <AiOutlineUser
                className="absolute left-3 top-1/2 -translate-y-1/2
                           text-gray-400 dark:text-gray-500"
                size={18}
              />
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className={inputClass(errors.name)}
                {...register("name", {
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
            </div>
            {errors.name && errorMsg(errors.name.message)}
          </div>

          {/*  Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
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
                className={inputClass(errors.email)}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
            </div>
            {errors.email && errorMsg(errors.email.message)}
          </div>

          {/*  Profile Photo  */}
          <div>
            <label htmlFor="image" className={labelClass}>
              Profile Photo
            </label>
            <div className="flex items-center gap-4">
              {/* Preview */}
              <div
                className="w-14 h-14 rounded-full border-2 border-dashed 
                              border-gray-300 dark:border-gray-600 
                              overflow-hidden flex items-center justify-center
                              bg-gray-50 dark:bg-gray-800 flex-shrink-0"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">
                    <img src={User} alt="" />
                  </span>
                )}
              </div>
              <input
                id="image"
                type="file"
                accept="image/*"
                className={`w-full text-sm text-gray-500 dark:text-gray-400
                           file:mr-3 file:py-2 file:px-4 file:rounded-xl
                           file:border-0 file:text-sm file:font-semibold
                           file:bg-red-50 file:text-red-600
                           dark:file:bg-red-900/20 dark:file:text-red-400
                           hover:file:bg-red-100 dark:hover:file:bg-red-900/30
                           transition-colors cursor-pointer
                           border ${errors.image ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                           rounded-xl`}
                {...register("image", {
                  required: "Profile photo is required",
                  onChange: handleImageChange,
                })}
              />
            </div>
            {errors.image && errorMsg(errors.image.message)}
          </div>

          {/* ── Blood Group ── */}
          <div>
            <label htmlFor="bloodGroup" className={labelClass}>
              Blood Group
            </label>
            <select
              id="bloodGroup"
              className={selectClass(errors.bloodGroup)}
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
            >
              <option value="">  Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            {errors.bloodGroup && errorMsg(errors.bloodGroup.message)}
          </div>

          {/* ── District & Upazila ── */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="district" className={labelClass}>
                District
              </label>
              <select
                id="district"
                className={selectClass(errors.district)}
                {...register("district", {
                  required: "District is required",
                })}
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.district && errorMsg(errors.district.message)}
            </div>

            <div>
              <label htmlFor="upazila" className={labelClass}>
                Upazila
              </label>
              <select
                id="upazila"
                className={`${selectClass(errors.upazila)} 
                  disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={!selectedDistrict}
                {...register("upazila", {
                  required: "Upazila is required",
                })}
              >
                <option value="">
                  {selectedDistrict
                    ? "Select Upazila"
                    : "Select district first"}
                </option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
              {errors.upazila && errorMsg(errors.upazila.message)}
            </div>
          </div>

          {/* Password   */}
          <div>
            <label htmlFor="password" className={labelClass}>
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
                placeholder="Min. 6 characters"
                className={inputClass(errors.password)}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[0-9])/,
                    message: "Must include at least 1 uppercase & 1 number",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-400 hover:text-gray-600
                           dark:text-gray-500 dark:hover:text-gray-300
                           transition-colors"
              >
                {showPass ? (
                  <AiOutlineEyeInvisible size={18} />
                ) : (
                  <AiOutlineEye size={18} />
                )}
              </button>
            </div>
            {errors.password && errorMsg(errors.password.message)}

            {/* Password strength hint */}
            {watch("password") && !errors.password && (
              <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                  Password looks good!
              </p>
            )}
          </div>

          {/*  Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm Password
            </label>
            <div className="relative">
              <AiOutlineLock
                className="absolute left-3 top-1/2 -translate-y-1/2
                           text-gray-400 dark:text-gray-500"
                size={18}
              />
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                className={inputClass(errors.confirmPassword)}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-400 hover:text-gray-600
                           dark:text-gray-500 dark:hover:text-gray-300
                           transition-colors"
              >
                {showConfirm ? (
                  <AiOutlineEyeInvisible size={18} />
                ) : (
                  <AiOutlineEye size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && errorMsg(errors.confirmPassword.message)}
            {watch("confirmPassword") &&
              !errors.confirmPassword &&
              watch("confirmPassword") === password && (
                <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                  Passwords match!
                </p>
              )}
          </div>

          {/*   Submit */}
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
                Creating Account...
              </>
            ) : (
              
              "Sign Up"
            )}
          </button>
        </form>

        {/* Login link */}
        <p className="text-gray-500 dark:text-gray-400 text-center text-sm mt-5">
          Already have an account?
          <Link
            to="/login"
            className="text-red-600 dark:text-red-400 font-semibold hover:underline"
          >
            Sign In
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
      </div>
    </div>
  );
};

export default SignUp;