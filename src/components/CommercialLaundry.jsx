import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ Import at top


// Images
import sapphirebank from "../assets/sapphire bank.jpg";
import  sapphirechurch from "../assets/sapphire church.jpg";
import sapphirespa from "../assets/sapphire spa.jpg";
import sapphirepark from "../assets/sapphire park.jpg";
import sapphirerestaurant from "../assets/sapphire restaurant.jpg";
import sapphiregym from "../assets/sapphire gym.jpg";
import sapphirehotel from "../assets/sapphire hotel.jpg";
import sapphirehospital from "../assets/sapphire hospital.jpg";

const clients = [
 { image: sapphirebank, title: "Banks & Financial Services", price: 5000 },
  { image: sapphirerestaurant, title: "Restaurants & Caterers", price: 8000 },
  { image: sapphirechurch, title: "Churches & Places of Worship", price: 9000 },
  { image: sapphiregym, title: "Gyms & Fitness Centers", price: 7000 },
  { image: sapphirehotel, title: "Hotels & Lodging", price: 10000 },
  { image: sapphirespa, title: "Spas & Salons", price: 6000 },
  { image: sapphirepark, title: "Parks & Recreational Facilities", price: 7500 },
  { image: sapphirehospital, title: "Hospitals & Clinics", price: 12000 },
];

// Variants for fade-up animation
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Container to stagger children
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const CommercialLaundry = () => {
  return (
    <section
      id="commercial"
      className="relative py-24 px-6 md:px-16 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Floating bubbles */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-blue-300/30 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 right-12 w-32 h-32 bg-purple-300/30 rounded-full blur-3xl"
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Section Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-blue-700 font-semibold mb-2 uppercase tracking-wide"
        >
          Laundry Service for Your Business!
        </motion.h3>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
        >
          Commercial Laundry Service
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12"
        >
          Outsource your laundry needs and let us handle the rest. We provide
          reliable, cost-effective laundry solutions tailored to your business,
          so you can focus on what you do best.
        </motion.p>

        {/* Client Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
            >
              <motion.img
                src={client.image}
                alt={client.title}
                className="w-full h-56 object-cover transform transition duration-700"
                whileHover={{ scale: 1.1 }}
              />
              <motion.div
                className="absolute inset-0 bg-black/40 flex justify-center items-center opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h4 className="text-white text-lg font-semibold text-center px-2">
                  {client.title}
                </h4>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Link to="/commercial-services">
            <button className="bg-blue-600 text-white px-10 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-2xl">
              Get Service Now
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CommercialLaundry;
