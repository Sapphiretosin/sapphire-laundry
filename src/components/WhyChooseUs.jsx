import React from "react";
import { motion } from "framer-motion";

// 🖼️ Import images
import experience from "../assets/experience.jpg";
import convenience from "../assets/app.jpg";
import express from "../assets/deliveryjet2.jpg";
import prices from "../assets/prices.jpg";
import order from "../assets/order.jpg";
import assurance from "../assets/assurance.jpg";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Personalized Experience",
      description:
        "We take utmost care of your clothes, segregating based on the cloth type and giving you instant clothes to make a statement.",
      image: experience,
    },
    {
      title: "Convenience",
      description:
        "With just a tap of a button, your laundry gets done, giving you leisure time to spend with family and friends.",
      image: convenience,
    },
    {
      title: "Express Delivery",
      description:
        "With our super express delivery, we would get your laundry done in less than 8 hours.",
      image: express,
    },
    {
      title: "Affordable Pricing",
      description:
        "Prices that suit your pocket are one of our USPs. You can choose between two flexible pricing options.",
      image: prices,
    },
    {
      title: "Quality Assurance",
      description:
        "We use the best-in-class products to assure that your favorite clothes always look their best.",
      image: assurance,
    },
    {
      title: "Instant Order Updates",
      description:
        "Regular updates of your order help you track your laundry and plan accordingly.",
      image: order,
    },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <section id="whyus" className="py-24 px-6 md:px-16 bg-gray-50 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Why Choose Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          We have a 20,000-square-foot, state-of-the-art workshop where all
          cleaning, spot removal, pressing, inspection, and packaging of your
          items take place — ensuring quality and care every step of the way.
        </motion.p>
      </div>

      {/* Feature Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariant}
            className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
            animate={{ scale: [1, 1.05, 1] }} // zoom in and out
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 4 + index * 0.2, // slightly different speed per card
              ease: "easeInOut",
            }}
          >
            {/* Background Image */}
            <motion.img
              src={feature.image}
              alt={feature.title}
              className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/50 transition duration-500"></div>

            {/* Text Content */}
            <div className="relative p-8 text-white text-center z-10">
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <div className="text-center mt-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-blue-600 text-white px-10 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-2xl"
        >
          Get Service Now
        </motion.button>
      </div>
    </section>
  );
};

export default WhyChooseUs;
