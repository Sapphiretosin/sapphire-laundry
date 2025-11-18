import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";

const SchedulePickup = () => {
  const { cart, clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pickupDate: "",
    deliveryDate: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty! Please add services before scheduling a pickup.");
      return;
    }

    const cartDetails = cart
      .map((item) => `${item.name} - ₦${item.price.toLocaleString()}`)
      .join("\n");

    const message = `
🧺 New Pickup Order
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
Services:
${cartDetails}
Pickup Date: ${formData.pickupDate}
Delivery Date: ${formData.deliveryDate}
Comment: ${formData.comment}
`;

    // WhatsApp URL
    const whatsappNumber = "2348101099961"; // your real number without +
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Email URL
    const mailtoLink = `mailto:sapphirelaundry25@gmail.com?subject=New Pickup Order&body=${encodeURIComponent(message)}`;

    // Open WhatsApp first, then email after short delay to avoid pop-up blockers
    window.open(whatsappUrl, "_blank");
    setTimeout(() => {
      window.open(mailtoLink, "_blank");
    }, 500);

    alert("Your pickup request has been sent successfully!");
    clearCart();
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      pickupDate: "",
      deliveryDate: "",
      comment: "",
    });
  };

  return (
    <div className="mt-24 px-6 md:px-20 py-12 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Schedule a Pickup</h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name *"
          required
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email *"
          type="email"
          required
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address *"
          required
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          name="pickupDate"
          value={formData.pickupDate}
          onChange={handleChange}
          type="date"
          placeholder="Pick-Up Date"
          required
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleChange}
          type="date"
          placeholder="Delivery Date"
          required
          className="w-full border px-4 py-2 rounded-lg"
        />
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Your Comment"
          className="w-full border px-4 py-2 rounded-lg"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-full w-full hover:bg-blue-700 transition"
        >
          Order Now
        </button>
      </motion.form>
    </div>
  );
};

export default SchedulePickup;
