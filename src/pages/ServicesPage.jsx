import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext"; // ✅ use your hook

// Images for services
import laundry from "../assets/sapphire1.jpg";
import drycleaning from "../assets/sapphire2.jpg";
import ironing from "../assets/sapphire3.jpg";
import pickup from "../assets/sapphire4.jpg";

// Commercial services array
const commercialServices = [
  { image: laundry, title: "Laundry Service", price: 2500, description: "Professional wash & fold service for businesses." },
  { image: drycleaning, title: "Dry Cleaning", price: 3000, description: "Eco-friendly dry cleaning for your business uniforms." },
  { image: ironing, title: "Ironing Service", price: 1500, description: "Crisp ironing for shirts, uniforms, and more." },
  { image: pickup, title: "Pickup & Delivery", price: 500, description: "We pick up and deliver your laundry at your convenience." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" } }),
};

const ServicesPage = () => {
  const { addToCart } = useCart(); // ✅ always use your custom hook

  return (
    <div className="bg-gray-50 min-h-screen py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Commercial Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the services your business needs and order instantly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
          {commercialServices.map((service, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center"
            >
              <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-blue-700 font-bold mb-4">₦{service.price.toLocaleString()}</p>
              <button
                onClick={() => addToCart({ title: service.title, price: service.price })}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
              >
                Order Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
