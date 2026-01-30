import React, { useEffect, useState } from "react"; 
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { name: "Chinonso Okafor", role: "Fashion Designer", image: "https://randomuser.me/api/portraits/men/91.jpg", quote: "Sapphire Laundry saves me every week! My clothes always come back fresh, pressed, and perfectly folded. I love how easy the app is to use." },
  { name: "Amaka Eze", role: "Entrepreneur", image: "https://randomuser.me/api/portraits/women/65.jpg", quote: "I used to dread laundry day — now it’s just a tap on my phone. The express delivery is truly a lifesaver. Highly recommended!" },
  { name: "Tunde Balogun", role: "Banker", image: "https://randomuser.me/api/portraits/men/56.jpg", quote: "Affordable, reliable, and professional. I love the instant order updates and how they treat every piece of clothing with care." },
  { name: "Ngozi Obi", role: "Restaurant Manager", image: "https://randomuser.me/api/portraits/women/44.jpg", quote: "Running a restaurant means uniforms everywhere — Sapphire Laundry keeps my staff looking sharp and saves me hours every week." },
  { name: "Emeka Adewale", role: "Event Planner", image: "https://randomuser.me/api/portraits/men/79.jpg", quote: "Their attention to detail is incredible. From removing stains to packaging, everything feels premium. Totally worth it!" },
  { name: "Zoe Mensah", role: "Tech Consultant", image: "https://randomuser.me/api/portraits/women/50.jpg", quote: "The express delivery blew my mind — picked up in the morning, delivered fresh before evening. Sapphire Laundry is my go-to service." },
  { name: "Ifeanyi Chukwu", role: "Teacher", image: "https://randomuser.me/api/portraits/men/70.jpg", quote: "Sapphire Laundry saved me so much time! Excellent service." },
  { name: "Fatou Diop", role: "Marketing Manager", image: "https://randomuser.me/api/portraits/women/72.jpg", quote: "The team is reliable, quick, and trustworthy. Love their work!" },
  { name: "Ngozi Uche", role: "Nurse", image: "https://randomuser.me/api/portraits/women/33.jpg", quote: "Professional service and amazing quality. I am very satisfied." },
  { name: "Chuka Nnaji", role: "Photographer", image: "https://randomuser.me/api/portraits/men/38.jpg", quote: "Sapphire Laundry makes my busy life so much easier. Clothes come back perfect every time." },

  // Intercontinental customers
  { name: "Sophia Martinez", role: "Graphic Designer", image: "https://randomuser.me/api/portraits/women/21.jpg", quote: "The service is seamless and reliable. Perfect for a busy lifestyle." },
  { name: "Liam Johnson", role: "Software Engineer", image: "https://randomuser.me/api/portraits/men/14.jpg", quote: "Fast, professional, and my clothes look amazing. Highly recommend Sapphire Laundry!" },
  { name: "Isabella Rossi", role: "Entrepreneur", image: "https://randomuser.me/api/portraits/women/12.jpg", quote: "Exceptional attention to detail and timely delivery every time." },
  { name: "Noah Schmidt", role: "Teacher", image: "https://randomuser.me/api/portraits/men/22.jpg", quote: "I can finally relax on weekends. Sapphire Laundry takes care of everything!" },
  { name: "Aaliyah Khan", role: "Consultant", image: "https://randomuser.me/api/portraits/women/9.jpg", quote: "Reliable, professional, and excellent quality. Truly global service." },
  { name: "Mateo Lopez", role: "Chef", image: "https://randomuser.me/api/portraits/men/5.jpg", quote: "From pick-up to delivery, everything is seamless. Clothes always look great." },
  { name: "Olivia Brown", role: "Writer", image: "https://randomuser.me/api/portraits/women/11.jpg", quote: "Convenient, fast, and trustworthy. Sapphire Laundry never disappoints." },
  { name: "Ethan Clark", role: "Musician", image: "https://randomuser.me/api/portraits/men/6.jpg", quote: "Professional, fast, and always with a smile. Great global service!" },
  { name: "Nina Patel", role: "Architect", image: "https://randomuser.me/api/portraits/women/13.jpg", quote: "Effortless and professional. Sapphire Laundry is a lifesaver." },
  { name: "Aiden Taylor", role: "Engineer", image: "https://randomuser.me/api/portraits/men/8.jpg", quote: "Fast delivery, excellent results. I will keep using this service forever." }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 md:px-16 bg-gradient-to-b from-white to-blue-50 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
      >
        What Our Customers Say
      </motion.h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Real stories from people who trust{" "}
        <span className="text-blue-600 font-semibold">Sapphire Laundry</span>.
      </p>

      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-10 mx-auto max-w-2xl text-left"
          >
            <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">
              “{testimonials[index].quote}”
            </p>
            <div className="flex items-center gap-4">
              <img
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
              />
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">
                  {testimonials[index].name}
                </h4>
                <p className="text-sm text-gray-500">{testimonials[index].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-blue-600 w-6" : "bg-blue-200"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
