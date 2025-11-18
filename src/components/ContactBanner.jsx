import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";

const ContactBanner = () => {
  return (
    <section className="relative py-24 px-6 md:px-16 bg-gradient-to-r from-blue-700 to-blue-500 text-white overflow-hidden">
      {/* Soft animated bubbles */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-52 h-52 bg-blue-300/20 rounded-full blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg uppercase tracking-widest mb-3 text-blue-100"
        >
          Quality Service with Free Collection & Delivery
        </motion.h3>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
        >
          It is our goal to offer you the best possible laundry <br />
          and dry cleaning service available.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8"
        >
          {/* Phone */}
          <a
            href="tel+234:8101099961"
            className="flex items-center justify-center gap-3 bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-50 transition"
          >
            <FaPhoneAlt /> +2348101099961
          </a>

          {/* Button */}
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-10 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-2xl">
            Get Service Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactBanner;
