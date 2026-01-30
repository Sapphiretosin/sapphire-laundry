import React from "react";
import blog4 from "../assets/blog4.jpg";
import { FaLeaf, FaTruck, FaDollarSign, FaPhoneAlt, FaStar } from "react-icons/fa";

const Experience = () => {
  return (
    <section className="bg-white py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">

        {/* Content Side */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-lg text-blue-600 font-semibold uppercase tracking-wide">
            4 Years of Experience
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug mt-2">
            We Are <span className="text-blue-600">Passionate</span> About Laundry
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            We are professionals in the laundry and dry-cleaning business,
            which means we stay up to date on the latest technologies,
            cleaning methods, and solutions for delicate fabrics. We maintain
            the highest standards of business integrity by following
            environmental safety rules and regulations. We are passionate
            about changing the way you think about laundry!
          </p>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <FaTruck className="text-blue-600 text-2xl" />
              <span className="text-gray-800 font-medium">Free Collection & Delivery</span>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <FaDollarSign className="text-blue-600 text-2xl" />
              <span className="text-gray-800 font-medium">Affordable Prices</span>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <FaStar className="text-blue-600 text-2xl" />
              <span className="text-gray-800 font-medium">Best Quality</span>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <FaLeaf className="text-blue-600 text-2xl" />
              <span className="text-gray-800 font-medium">Eco-Friendly</span>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start sm:col-span-2">
              <FaPhoneAlt className="text-blue-600 text-2xl" />
              <span className="text-gray-800 font-medium">
                Call for Quality Services:
                <br />
                <span className="text-blue-600 font-semibold">0810 109 9961</span>
              </span>
            </div>
          </div>

          {/* Flowing marquee text */}
          <div className="mt-10 overflow-hidden whitespace-nowrap border-t border-blue-100 pt-4">
            <div className="animate-marquee text-blue-600 font-semibold text-lg tracking-wide">
              100% Customer Satisfaction • Pay Online in Seconds • Eco-Friendly • Save Time and Money • Best Quality • Affordable Prices • Free Pickup & Delivery • 100% Customer Satisfaction •
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={blog4}
            alt="Laundry Experience"
            className="rounded-2xl shadow-xl w-full sm:w-4/5 md:w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Experience;
