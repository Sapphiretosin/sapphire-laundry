import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Sapphire Laundry</h2>
          <p className="text-gray-400 mb-3">
            We are professionals in the laundry and dry cleaning business, 
            keeping up with the latest technologies and cleaning methods.
          </p>
          <div className="flex gap-4 mt-1">
            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Contacts Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contacts</h3>
          <p className="text-gray-400">4, Ilokun Estate, opp. New Reality Christian Centre, Ado Ekiti, Nigeria</p>
          <p className="text-gray-400 mt-1">Mon–Fri: 8:00am–7:00pm</p>
          <p className="text-gray-400 mt-1">noreply@sapphirelaundry.com</p>
          <p className="text-gray-400 mt-1">(234) 810 109 9961</p>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Newsletter Subscribe</h3>
          <p className="text-blue-600 mb-3">
            Sign up and receive our special offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-md flex-1 text-blue-600 focus:outline-none w-full sm:w-auto"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
            > Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-2">
        <p>© 2025 Sapphire Laundry. All Rights Reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition">Terms and Conditions</a>
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
