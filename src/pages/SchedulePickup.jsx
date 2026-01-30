import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext"; // ✅ Use the hook
import { motion } from "framer-motion";

const SchedulePickup = () => {
  const { cart, clearCart } = useCart(); // ✅ useCart hook instead of useContext(CartContext)

  const [location, setLocation] = useState({ lat: null, lng: null });
  const [loadingLocation, setLoadingLocation] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pickupDate: "",
    deliveryDate: "",
    comment: "",
  });

  // Get user current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoadingLocation(false);
      },
      (err) => {
        console.log("Location error:", err);
        setLoadingLocation(false);
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty! Add services first.");
      return;
    }

    const cartDetails = cart
      .map((item) => `${item.title || item.name} - ₦${item.price.toLocaleString()}`)
      .join("\n");

    const message = `
🧺 New Pickup Order
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}

📍 Location:
Lat: ${location.lat}
Lng: ${location.lng}
Google Maps: https://maps.google.com/?q=${location.lat},${location.lng}

Services:
${cartDetails}

Pickup Date: ${formData.pickupDate}
Delivery Date: ${formData.deliveryDate}
Comment: ${formData.comment || "None"}
`;

    const whatsappNumber = "2348101099961";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    clearCart();
  };

  return (
    <div className="mt-24 px-6 md:px-20 py-12 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Schedule a Pickup
      </h1>

      {loadingLocation ? (
        <p className="text-center">Fetching your location…</p>
      ) : (
        <p className="text-center text-green-600">
          Location captured successfully!
        </p>
      )}

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
          required
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleChange}
          type="date"
          required
          className="w-full border px-4 py-2 rounded-lg"
        />

        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Additional Notes"
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
