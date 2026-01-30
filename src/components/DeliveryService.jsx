// src/components/DeliveryServices.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";

// Images for delivery fleet (replace with your actual image paths)
import jet from "../assets/deliveryjet2.jpg";
import van from "../assets/vans.jpg";
import motorcycle from "../assets/motocycles.jpg";
import bicycle from "../assets/bicycles.jpg";

const fleet = [
  { image: jet, title: "Delivery Jets" },
  { image: van, title: "Delivery Vans" },
  { image: motorcycle, title: "Motorcycles" },
  { image: bicycle, title: "Bicycles" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const DeliveryServices = () => {
  return (
    <section className="relative py-24 px-6 md:px-16 bg-gradient-to-r from-blue-700 to-blue-500 text-white overflow-hidden">
      {/* Animated background bubbles */}
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

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Fast & Reliable Delivery Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-blue-100 mb-12 text-lg md:text-xl"
        >
          From jets to bicycles, we ensure your laundry is delivered safely and on time.
        </motion.p>

        {/* Fleet display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {fleet.map((vehicle, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg cursor-pointer hover:shadow-2xl transition"
            >
              <img
                src={vehicle.image}
                alt={vehicle.title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="font-semibold text-lg">{vehicle.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryServices;
