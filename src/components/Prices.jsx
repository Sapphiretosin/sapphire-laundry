import React from "react";
import { motion } from "framer-motion";
import { FaTshirt, FaBroom, FaHandsWash, FaSteam } from "react-icons/fa";

const Prices = () => {
  const services = [
    {
      icon: <FaHandsWash size={32} className="text-blue-600 transition-all duration-500" />,
      title: "Laundry Service",
      price: "$2.50 / lb",
      description: "Professional wash & fold service with quality detergents.",
    },
    {
      icon: <FaBroom size={32} className="text-blue-600 transition-all duration-500" />,
      title: "Dry Cleaning",
      price: "$5.00 / item",
      description: "Gentle and eco-friendly cleaning for all fabric types.",
    },
    {
      icon: <FaSteam size={32} className="text-blue-600 transition-all duration-500" />,
      title: "Ironing Service",
      price: "$1.50 / item",
      description: "Get your clothes perfectly pressed and wrinkle-free.",
    },
    {
      icon: <FaTshirt size={32} className="text-blue-600 transition-all duration-500" />,
      title: "Folding Service",
      price: "$1.00 / lb",
      description: "Neatly folded garments, ready to store or wear instantly.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="prices"
      className="relative py-24 px-6 md:px-16 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Floating Bubbles */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-blue-300/30 rounded-full blur-3xl animate-pulse"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-300/30 rounded-full blur-3xl animate-pulse"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Header Section */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-blue-700 font-semibold mb-2 uppercase tracking-wide"
        >
          Affordable Prices
        </motion.h3>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Our Dry Cleaning & Laundry Prices
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Our prices are simple and affordable — easy on your pocket compared
          to high-street rates, with no hidden charges.
        </motion.p>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
              className="group bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center cursor-pointer"
              animate={{ scale: [1, 1.05, 1] }} // Continuous zoom in/out
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 4 + index * 0.2,
                ease: "easeInOut",
              }}
            >
              {/* Icon fades out on hover */}
              <div className="mb-4 group-hover:opacity-0 transition-opacity duration-500">
                {service.icon}
              </div>

              {/* Content moves up on hover */}
              <div className="transform transition-all duration-500 group-hover:-translate-y-2 text-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h4>
                <p className="text-blue-600 font-bold text-lg mb-3">{service.price}</p>
                <p className="text-gray-500 text-sm text-center leading-relaxed mb-5">
                  {service.description}
                </p>
                {/* Order Now Button */}
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-md">
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prices;
