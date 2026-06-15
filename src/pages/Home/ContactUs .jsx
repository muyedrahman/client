const ContactUs = () => {
  return (
    <div className="py-20 bg-red-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mt-3 text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Have questions or want to get involved? Send us a message or reach us
          via phone in case of emergency.
        </p>

        {/* Content */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <form
            className="bg-white dark:bg-gray-800 
                           border border-gray-100 dark:border-gray-700
                           p-8 rounded-2xl shadow-lg flex flex-col gap-4
                           transition-colors duration-300"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 dark:border-gray-600 
                         rounded-lg px-4 py-3 
                         bg-white dark:bg-gray-700
                         text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-red-500
                         transition-colors duration-200"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 dark:border-gray-600 
                         rounded-lg px-4 py-3 
                         bg-white dark:bg-gray-700
                         text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-red-500
                         transition-colors duration-200"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="border border-gray-300 dark:border-gray-600 
                         rounded-lg px-4 py-3 
                         bg-white dark:bg-gray-700
                         text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-red-500
                         transition-colors duration-200 resize-none"
              required
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 
                         text-white font-semibold px-6 py-3 
                         rounded-full shadow hover:scale-105 
                         transition-all duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Info */}
          <div className="flex flex-col justify-center gap-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Emergency Contact
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              <span className="font-semibold text-gray-900 dark:text-white">
                Phone:
              </span>{" "}
              +1 (234) 567-890
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              <span className="font-semibold text-gray-900 dark:text-white">
                Email:
              </span>{" "}
              support11@bloodhub.com
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Feel free to reach us anytime. We're here to help you save lives!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;