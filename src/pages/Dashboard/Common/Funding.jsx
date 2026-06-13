// import { useEffect, useState } from "react";
// import axios from "axios";
// import useAuth from "../../../hooks/useAuth";
// import toast from "react-hot-toast";

// const Funding = () => {
//   const { user, loading } = useAuth();

//   const [funds, setFunds] = useState([]);
//   const [amount, setAmount] = useState("");
//   const [pageLoading, setPageLoading] = useState(true);

//   //   Load Funding History
//   useEffect(() => {
//     const fetchFunds = async () => {
//       if (!user) return;

//       try {
//         const token = await user.getIdToken();  

//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API_URL}/funds`,
//           {
//             headers: {
//               authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         setFunds(data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load funds");
//       } finally {
//         setPageLoading(false);
//       }
//     };

//     fetchFunds();
//   }, [user]);

//   //   Stripe Payment
//   const handleGiveFund = async () => {
//     if (!amount || amount < 1) {
//       toast.error("Enter valid amount");
//       return;
//     }

//     try {
//       const token = await user.getIdToken(); 

//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/create-checkout-session`,
//         {
//           amount: Number(amount),
//           name: user.displayName || "Anonymous",
//           email: user.email,
//         },
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       window.location.href = data.url;
//     } catch (err) {
//       console.error(err);
//       toast.error("Payment failed");
//     }
//   };

//   if (loading || pageLoading) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   const totalFund = funds.reduce((sum, f) => sum + f.amount, 0);

//   return (
//     <div className="min-h-screen bg-red-50 px-4 py-10">
//       <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
//           <h2 className="text-3xl font-bold text-red-700">Funding History</h2>

//           <div className="flex gap-3">
//             <input
//               type="number"
//               placeholder="Enter amount (USD)"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="border px-4 py-2 rounded-xl w-48"
//             />

//             <button
//               onClick={handleGiveFund}
//               className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold"
//             >
//               Give Fund
//             </button>
//           </div>
//         </div>

//         {funds.length === 0 ? (
//           <p className="text-center text-gray-500">No funding history found</p>
//         ) : (
//           <div className="overflow-x-auto rounded-xl shadow">
//             <table className="w-full">
//               <thead className="bg-red-600 text-white">
//                 <tr>
//                   <th className="px-6 py-3">Name</th>
//                   <th className="px-6 py-3">Amount</th>
//                   <th className="px-6 py-3">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {funds.map((fund, idx) => (
//                   <tr key={idx} className="border-b">
//                     <td className="px-6 py-4">{fund.name}</td>
//                     <td className="px-6 py-4 text-red-700 font-semibold">
//                       ${fund.amount}
//                     </td>
//                     <td className="px-6 py-4">
//                       {new Date(fund.date).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div className="mt-6 bg-red-100 p-4 rounded-xl text-center">
//           <h3 className="text-xl font-bold text-red-700">
//             Total Funds Collected: ${totalFund}
//           </h3>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Funding;

import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const Funding = () => {
  const { user, loading } = useAuth();

  const [funds, setFunds] = useState([]);
  const [amount, setAmount] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  //   Load Funding History
  useEffect(() => {
    const fetchFunds = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/funds`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );

        setFunds(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load funds");
      } finally {
        setPageLoading(false);
      }
    };

    fetchFunds();
  }, [user]);

  //   Stripe Payment
  const handleGiveFund = async () => {
    if (!amount || amount < 1) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      const token = await user.getIdToken();

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        {
          amount: Number(amount),
          name: user.displayName || "Anonymous",
          email: user.email,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  const totalFund = funds.reduce((sum, f) => sum + f.amount, 0);

  return (
    /* bg-red-50 কে ডার্ক মোডে dark:!bg-gray-950 দিয়ে ওভাররাইড করা হয়েছে */
    <div className="min-h-screen bg-gray-50 dark:!bg-gray-950 px-4 py-10 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* মেইন কার্ড bg-white থেকে ডার্ক মোডে dark:bg-gray-900 হবে */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-500">
            Funding History
          </h2>

          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="number"
              placeholder="Enter amount (USD)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              /* ইনপুট ফিল্ড ডার্ক মোড ফিক্স */
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-xl w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              onClick={handleGiveFund}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors shadow-sm"
            >
              Give Fund
            </button>
          </div>
        </div>

        {funds.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No funding history found
          </p>
        ) : (
          /* টেবিল কন্টেইনার ডার্ক মোড বর্ডার */
          <div className="overflow-x-auto rounded-xl shadow border border-gray-100 dark:border-gray-800">
            <table className="w-full text-left border-collapse">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {funds.map((fund, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 dark:border-gray-800/60 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-900 dark:text-gray-200">
                      {fund.name}
                    </td>
                    <td className="px-6 py-4 text-red-600 dark:text-red-400 font-bold">
                      ${fund.amount}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {new Date(fund.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* টোটাল ফান্ডের কার্ডটি ডার্ক মোডে হালকা লালচে থেকে ডার্ক রেড টিন্ট দেওয়া হয়েছে */}
        <div className="mt-6 bg-red-50 dark:bg-red-950/20 p-4 rounded-xl text-center border border-red-100 dark:border-red-900/30">
          <h3 className="text-xl font-bold text-red-700 dark:text-red-400">
            Total Funds Collected: ${totalFund}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Funding;
