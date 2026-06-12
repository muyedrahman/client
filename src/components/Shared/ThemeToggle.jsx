import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark"); // ← DaisyUI এর জন্য
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light"); // ← DaisyUI এর জন্য
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      title="Toggle Dark Mode"
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 
                 text-gray-700 dark:text-yellow-300 
                 hover:scale-110 transition-all duration-200"
    >
      {dark ? (
        // Sun
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707
               M6.343 17.657l-.707.707m12.728 0l-.707-.707
               M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ) : (
        // Moon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 
               9.003 9.003 0 0012 21a9.003 9.003 0 
               008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}

// import { useEffect, useState } from "react";

// export default function ThemeToggle() {
//   const [dark, setDark] = useState(
//     () => localStorage.getItem("theme") === "dark",
//   );

//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [dark]);

//   return (
//     <button
//       onClick={() => setDark(!dark)}
//       title="Toggle Dark Mode"
//       className="p-2 rounded-full bg-gray-100 dark:bg-gray-700
//                  text-gray-700 dark:text-yellow-300
//                  hover:scale-110 transition-all duration-200"
//     >
//       {dark ? (
//         // Sun icon
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-5 h-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707
//                M6.343 17.657l-.707.707m12.728 0l-.707-.707
//                M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
//           />
//         </svg>
//       ) : (
//         // Moon icon
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-5 h-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M20.354 15.354A9 9 0 018.646 3.646
//                9.003 9.003 0 0012 21a9.003 9.003 0
//                008.354-5.646z"
//           />
//         </svg>
//       )}
//     </button>
//   );
// }
// export default ThemeToggle;
