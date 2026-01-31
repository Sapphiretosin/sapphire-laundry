// src/components/CommercialServices.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

// Images
import sapphirebank from "../assets/sapphire bank.jpg";
import sapphirechurch from "../assets/sapphire church.jpg";
import sapphirespa from "../assets/sapphire spa.jpg";
import sapphirepark from "../assets/sapphire park.jpg";
import sapphirerestaurant from "../assets/sapphire restaurant.jpg";
import sapphiregym from "../assets/sapphire gym.jpg";
import sapphirehotel from "../assets/sapphire hotel.jpg";
import sapphirehospital from "../assets/sapphire hospital.jpg";

// Services with prices
const services = [
  { image: sapphirebank, title: "Banks & Financial Services", price: 5000 },
  { image: sapphirerestaurant, title: "Restaurants & Caterers", price: 8000 },
  { image: sapphirechurch, title: "Churches & Places of Worship", price: 9000 },
  { image: sapphiregym, title: "Gyms & Fitness Centers", price: 7000 },
  { image: sapphirehotel, title: "Hotels & Lodging", price: 10000 },
  { image: sapphirespa, title: "Spas & Salons", price: 6000 },
  { image: sapphirepark, title: "Parks & Recreational Facilities", price: 7500 },
  { image: sapphirehospital, title: "Hospitals & Clinics", price: 12000 },
];

// Animation config
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" },
  }),
};

const CommercialServices = () => {
  const { cart, addToCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Add item to cart
  const handleAddToCart = (service) => {
    addToCart({ ...service, quantity: 1 });
    alert(`${service.title} added to your cart!`);
  };

  // Form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Local-only submission (no EmailJS, no WhatsApp)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      cart.length === 0
    ) {
      alert("Please fill all fields and select at least one service!");
      return;
    }

    // Log details for now (local only)
    console.log("NEW ORDER RECEIVED:", {
      customer: formData,
      comment,
      cart,
    });

    // Success message
    setSubmitted(true);

    // Reset form
    setFormData({ name: "", email: "", phone: "", address: "" });
    setComment("");
  };

  return (
    <section className="py-24 px-6 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Commercial Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hover on a service and click "Order Now" to add it to your cart.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {services.map((service, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" }}
            variants={fadeUp}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-white"
          >
            <motion.img
              src={service.image}
              alt={service.title}
              className="w-full h-56 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="text-white text-lg font-semibold text-center px-2 mb-2">
                {service.title}
              </h4>
              <p className="text-white font-bold mb-2">₦{service.price}</p>
              <button
                onClick={() => handleAddToCart(service)}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition shadow-md"
              >
                Order Now
              </button>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Customer Info & Submit */}
      <div className="max-w-3xl mx-auto mt-16 bg-card p-8 rounded-xl shadow-lg border border-border text-foreground">
        <h3 className="text-2xl font-bold mb-6 text-center">Confirm Your Order</h3>

        {submitted && (
          <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
            Thank you for your order! We will contact you shortly.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <textarea
            value={comment}
            placeholder="Add comments or instructions..."
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            rows={3}
          />

          <button
            type="submit"
            className="bg-primary text-primary-foreground w-full py-3 rounded-full font-semibold hover:bg-primary/90 transition shadow-lg"
          >
            Submit Order
          </button>
        </form>
      </div>
    </section>
  );
};

export default CommercialServices;
