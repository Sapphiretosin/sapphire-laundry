import React from "react";
import { FaLeaf, FaSmile, FaTshirt } from "react-icons/fa";

const ApproachSection = () => {
  return (
    <section id="approach" className="py-24 px-6 md:px-16 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">
          Trusted Laundry Service
        </h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-8">
          Our Approach
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          We approach workforce accommodations with a property development mindset.
          Our “Develop. Own. Operate.” business model produces integrated solutions
          that enable clients to focus on their core business.
          <br /><br />
          Clients benefit from consistent service delivery with greater cost and quality
          control as well as more efficient use of their operational and financial resources.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {/* High Quality */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <FaTshirt className="text-blue-600 text-4xl mb-4 mx-auto" />
            <h4 className="text-xl font-semibold mb-2">High Quality</h4>
            <p className="text-gray-600">
              We work hard to make sure that the clothes you get back are spotless and ready for action.
            </p>
          </div>

          {/* Cleaner & Greener */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <FaLeaf className="text-green-500 text-4xl mb-4 mx-auto" />
            <h4 className="text-xl font-semibold mb-2">Cleaner & Greener</h4>
            <p className="text-gray-600">
              We work with the environment in mind. No harsh chemicals.
            </p>
          </div>

          {/* Happiness Guarantee */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <FaSmile className="text-yellow-400 text-4xl mb-4 mx-auto" />
            <h4 className="text-xl font-semibold mb-2">Happiness Guarantee</h4>
            <p className="text-gray-600">
              If you're not completely satisfied with the wash or dry cleaning,
              we will re-process your clothes for free!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
