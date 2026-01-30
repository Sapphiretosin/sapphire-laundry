import React from "react";
import { motion } from "framer-motion";
import iphone from "../assets/app.jpg"; 

const AppPromo = () => {
  return (
    <section
      id="app"
      className="py-24 px-6 md:px-16 bg-gradient-to-b from-blue-50 via-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <h3 className="text-blue-700 font-semibold mb-2 uppercase tracking-wide">
            Laundry service for your business!
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Tap. Clean. Deliver.
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Download our app and request our laundry service. Your clothes
            washed, folded and delivered to your doorstep. So go ahead and say
            yes to more time with the family, more happy hours, and more
            slapping the snooze button every morning — we've got laundry day
            covered.
          </p>

          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
            Download App
          </button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="relative w-full max-w-md">
            <motion.img
              src={iphone}
              alt="Sapphire Laundry App Preview"
              className="rounded-3xl shadow-2xl w-full object-contain"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />
            {/* Soft glow effect */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-300/20 rounded-full blur-2xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppPromo;
