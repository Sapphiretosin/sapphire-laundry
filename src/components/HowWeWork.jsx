import React from "react";
import { motion } from "framer-motion";
import { FaTshirt, FaTruck, FaSoap, FaSmile } from "react-icons/fa";

// 🖼️ Import your step images
import van from "../assets/van.jpg";
import delivery from "../assets/delivery.jpg";
import eco from "../assets/eco-friendly.jpg";
import dirty from "../assets/dirty.jpg";

const steps = [
  {
    id: "01",
    image: dirty,
    icon: <FaTshirt size={35} className="text-blue-600" />,
    title: "Bag Up All Your Dirty Clothes",
    description:
      "We are pleased to pick up your laundry and ensure that it is expertly laundered, pressed, and handled with care.",
  },
  {
    id: "02",
    image: van,
    icon: <FaTruck size={35} className="text-blue-600" />,
    title: "We Pick Up Your Laundry",
    description:
      "Our friendly drivers arrive on schedule to collect your laundry right from your doorstep — stress-free and reliable.",
  },
  {
    id: "03",
    image: eco,
    icon: <FaSoap size={35} className="text-blue-600" />,
    title: "We Clean with Care",
    description:
      "Your clothes are cleaned using eco-friendly products — protecting both your fabrics and the planet.",
  },
  {
    id: "04",
    image: delivery,
    icon: <FaSmile size={35} className="text-blue-600" />,
    title: "We Deliver Fresh Laundry",
    description:
      "We return your freshly cleaned laundry folded, pressed, and ready to wear — right on time, every time.",
  },
];

const HowWeWork = () => {
  return (
    <section id="how-we-work" className="bg-white py-24 px-6 md:px-16">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Get Your Clothes Collected & Delivered
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl font-semibold text-blue-600 mb-6"
        >
          How We Work
        </motion.h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Our service is dedicated to making your life easier by providing
          convenient laundry pick-up and delivery. Give yourself one less thing
          to worry about with our professional wash and fold service.
        </p>
        <p className="text-gray-600 mb-6">
          We’ve been in the laundry business for more than{" "}
          <span className="font-semibold text-blue-600">12 years</span> and
          would love to earn your trust. Try us today and save{" "}
          <span className="font-semibold text-blue-600">$10</span> off your
          first order of 20 pounds or more!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          Get Service Now
        </motion.button>
      </div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-3xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover transform hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Step {step.id}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h4>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

{/* Marquee / Flowing Text Section */}
<section className="bg-blue-600 py-3 overflow-hidden relative">
  <div className="whitespace-nowrap animate-marquee text-white text-lg font-medium flex items-center">
    <span className="mx-8">💳 Pay Online in Seconds</span>
    <span className="mx-8">🌱 Eco-Friendly</span>
    <span className="mx-8">⏱️ Save Time & Money</span>
    <span className="mx-8">📞 Call Us: 08101099961</span>
  </div>
</section>


export default HowWeWork;
