import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const packages = [
  {
    name: "Standard Package",
    clothes: "50 Clothes Per Month",
    items: [
      "4 T-Shirts",
      "1 Pair of Jeans",
      "3 Button-Down Shirts",
      "1 Pair of Shorts",
      "7 Pairs of Underwear",
      "6 Pairs of Socks",
      "1 Towel",
      "1 Set of Sheets",
    ],
    price: "€349.00",
    highlighted: false,
  },
  {
    name: "Enterprise Package",
    clothes: "60 Clothes Per Month",
    items: [
      "4 T-Shirts",
      "2 Pairs of Jeans",
      "4 Button-Down Shirts",
      "2 Pairs of Shorts",
      "8 Pairs of Underwear",
      "6 Pairs of Socks",
      "2 Towels",
      "2 Sets of Sheets",
    ],
    price: "€399.00",
    highlighted: false,
  },
  {
    name: "Premium Package",
    clothes: "80 Clothes Per Month",
    items: [
      "6 T-Shirts",
      "3 Pairs of Jeans",
      "4 Button-Down Shirts",
      "2 Pairs of Shorts",
      "9 Pairs of Underwear",
      "8 Pairs of Socks",
      "2 Towels",
      "2 Sets of Sheets",
    ],
    price: "€449.00",
    oldPrice: "€549.00",
    highlighted: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
  }),
};

const PricePackages = () => {
  return (
    <section
      id="pricing"
      className="py-24 px-6 md:px-16 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h3 className="text-blue-700 font-semibold mb-2 uppercase tracking-wide">
          What We Offer
        </h3>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Price Packages
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our prices are simple and affordable — easy on your pocket compared to
          high-street rates.
        </p>
      </motion.div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {packages.map((pkg, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            className={`relative bg-white rounded-3xl shadow-lg p-10 flex flex-col justify-between transition duration-500 hover:-translate-y-2 ${
              pkg.highlighted
                ? "border-4 border-blue-600 shadow-blue-100"
                : "border border-gray-100"
            }`}
            animate={{ scale: [1, 1.05, 1] }} // Continuous zoom
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 4 + i * 0.3,
              ease: "easeInOut",
            }}
          >
            {/* Discount Badge */}
            {pkg.highlighted && (
              <span className="absolute -top-4 right-6 bg-blue-600 text-white text-sm px-4 py-1 rounded-full shadow-md font-medium">
                Best Value
              </span>
            )}

            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
              <p className="text-blue-600 font-medium mb-4">{pkg.clothes}</p>

              <ul className="space-y-2 mb-6">
                {pkg.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600">
                    <FaCheckCircle className="text-blue-500" size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price + CTA */}
            <div className="text-center">
              <div className="mb-4">
                {pkg.oldPrice && (
                  <span className="text-gray-400 line-through mr-2">{pkg.oldPrice}</span>
                )}
                <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-2xl bg-blue-600 text-white hover:bg-blue-700"
              >
                Order Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricePackages;
