import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Hero.css";
import Hero1 from "../assets/download66.png";
import Hero2 from "../assets/download77.png";
import Hero3 from "../assets/download88.png";
import Hero4 from "../assets/download99.png";

const heroPairs = [
  [
    { img: Hero1, title: "Laundry Service", desc: "We care for the clothes you wear." },
    { img: Hero2, title: "Dry Cleaning", desc: "Cleaning excellence guaranteed." },
  ],
  [
    { img: Hero3, title: "Ironing Service", desc: "Crisp clothes every time." },
    { img: Hero4, title: "Pickup & Delivery", desc: "Convenient and fast." },
  ],
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [bubbles, setBubbles] = useState([]);

  // Slide hero images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroPairs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Generate bubble data once
  useEffect(() => {
    const bubbleData = Array.from({ length: 25 }).map(() => ({
      size: Math.floor(Math.random() * 40) + 20,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 8 + 6, // bubbles rise at different speeds
    }));
    setBubbles(bubbleData);
  }, []);

  const pair = heroPairs[index];

  return (
    <div className="w-full h-screen relative overflow-hidden flex pt-20">
      {/* Floating Bubbles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {bubbles.map((b, idx) => (
          <div
            key={idx}
            className="bubble"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Hero images + text */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="flex w-full h-full absolute z-20"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {pair.map((item, idx) => (
            <div key={idx} className="w-1/2 relative">
              <img src={item.img} alt={item.title} className="hero-image" />
              <motion.div
                className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-center text-white px-6 z-30"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
                <p className="text-lg md:text-xl mb-6">{item.desc}</p>

                {/* Modern Order Now Button */}
                <Link to="/order" className="group relative inline-block">
                  <motion.button
                    className="relative px-6 md:px-6 py-2 md:py-3 text-base md:text-lg font- rounded-full -lg text-white shadow-lg bg-blue-700 transition- overflow-hidden"
                   
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Left overlay */}
                    <span className="absolute top-0 left-0 h-full w-1/2 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                    
                    {/* Right overlay */}
                    <span className="absolute top-0 right-0 h-full w-1/2 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                    
                    {/* Button text */}
                    <span className="relative z-10">Order Now</span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Hero;
