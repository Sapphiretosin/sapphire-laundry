import React from "react";
import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";

const FixedOrderButton = () => {
  return (
    <motion.a
      href="tel:+2348101099961"
      whileHover={{ scale: 1.05 }}
      className="fixed bottom-6 left-6 sm:left-8 z-50 flex items-left gap-2 px-6 py-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-2xl transition"
    >
      <FaPhone className="text-white" />
      Order Now
    </motion.a>
  );
};

export default FixedOrderButton;
