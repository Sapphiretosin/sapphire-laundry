// src/components/Services.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaTshirt, FaTruckPickup, FaBroom, FaHandsWash, FaHotel } from "react-icons/fa";
import { MdIron } from "react-icons/md";
import { useCart } from "../context/CartContext";

// Sapphire-branded Images
import laundry from "../assets/sapphire3.jpg"; 
import drycleaning from "../assets/sapphire5.jpg";
import ironing from "../assets/sapphire4.jpg";
import delivery from "../assets/sapphire2.jpg";
import commercial from "../assets/sapphire3.jpg";
import folding from "../assets/sapphire1.jpg";

const Services = () => {
  const { addToCart } = useCart();

  const services = [
    {
      image: laundry,
      icon: <FaHandsWash size={35} className="text-blue-600" />,
      title: "Laundry Service",
      price: 2500,
      description: "Top-quality washing and folding services for your clothes.",
    },
    {
      image: drycleaning,
      icon: <FaBroom size={35} className="text-blue-600" />,
      title: "Dry Cleaning",
      price: 3000,
      description: "Eco-friendly dry cleaning keeping your garments spotless.",
    },
    {
      image: ironing,
      icon: <MdIron size={35} className="text-blue-600" />,
      title: "Ironing Service",
      price: 1500,
      description: "Crisp professional finish for all your outfits.",
    },
    {
      image: delivery,
      icon: <FaTruckPickup size={35} className="text-blue-600" />,
      title: "Pickup & Delivery",
      price: 500,
      description: "Free pickup & delivery, saving you time.",
    },
    {
      image: commercial,
      icon: <FaHotel size={35} className="text-blue-600" />,
      title: "Commercial Laundry",
      price: 10000,
      description: "Reliable laundry for hotels, gyms, restaurants, offices.",
    },
    {
      image: folding,
      icon: <FaTshirt size={35} className="text-blue-600" />,
      title: "Folding Service",
      price: 1000,
      description: "Neatly folded laundry ready to store or wear.",
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
    <section id="services" className="py-24 px-6 md:px-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Professional laundry and dry-cleaning services — fast, reliable, and affordable.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:scale-105 transition duration-500"
          >
            <div className="relative w-full h-52 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transform hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="p-8 text-center">
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="font-bold text-blue-700 mb-4">₦{service.price.toLocaleString()}</p>
              <button
                onClick={() => addToCart({ name: service.title, price: service.price })}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
