import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaTshirt,
  FaTruckPickup,
  FaBroom,
  FaHandsWash,
  FaHotel,
} from "react-icons/fa";
import { MdIron } from "react-icons/md";
import { CartContext } from "../context/CartContext";

// 🖼️ Import images
import laundry from "../assets/laundry-service.jpg";
import drycleaning from "../assets/drycleaning.jpg";
import ironing from "../assets/ironing.jpg";
import pickup from "../assets/pickup.jpg";
import commercial from "../assets/commercial-laundry.jpg";
import folding from "../assets/folding.jpg";

const Services = () => {
  const { addToCart } = useContext(CartContext);

  const services = [
    {
      image: laundry,
      icon: <FaHandsWash size={35} className="text-blue-600" />,
      title: "Laundry Service",
      price: 2500,
      description:
        "We provide top-quality washing and folding services, ensuring your clothes are fresh, clean, and well cared for.",
    },
    {
      image: drycleaning,
      icon: <FaBroom size={35} className="text-blue-600" />,
      title: "Dry Cleaning",
      price: 3000,
      description:
        "Our eco-friendly dry cleaning keeps your garments spotless and gentle on fabrics while protecting the environment.",
    },
    {
      image: ironing,
      icon: <MdIron size={35} className="text-blue-600" />,
      title: "Ironing Service",
      price: 1500,
      description:
        "Get that crisp, professional finish with our expert ironing services — perfect for all your outfits.",
    },
    {
      image: pickup,
      icon: <FaTruckPickup size={35} className="text-blue-600" />,
      title: "Pickup & Delivery",
      price: 500,
      description:
        "We offer free pickup and delivery, saving you time and giving you one less thing to worry about.",
    },
    {
      image: commercial,
      icon: <FaHotel size={35} className="text-blue-600" />,
      title: "Commercial Laundry",
      price: 10000,
      description:
        "Reliable laundry solutions for hotels, gyms, restaurants, and offices — efficient and affordable.",
    },
    {
      image: folding,
      icon: <FaTshirt size={35} className="text-blue-600" />,
      title: "Folding Service",
      price: 1000,
      description:
        "We fold your laundry neatly so it’s ready to be stored or worn right away. Clean, crisp, and organized.",
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
          We are dedicated to making your life easier by providing professional laundry and dry-cleaning services — fast, reliable, and affordable.
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
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition duration-500"
          >
            {/* Image Section */}
            <div className="relative w-full h-52 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transform hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content Section */}
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
