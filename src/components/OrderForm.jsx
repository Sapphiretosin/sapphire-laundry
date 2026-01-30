import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useCart } from "../context/CartContext";

const OrderForm = () => {
  const { cart } = useCart();
  const [form, setForm] = useState({ name: "", address: "", phone: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderDetails = cart.map((i) => i.name).join(", ");

    const templateParams = {
      user_name: form.name,
      user_phone: form.phone,
      user_address: form.address,
      user_order: orderDetails,
    };

    emailjs.send(
      "service_xxxxxx", // Replace
      "template_xxxxxx", // Replace
      templateParams,
      "public_key_here" // Replace
    );

    const message = encodeURIComponent(
      `New Laundry Order:
Name: ${form.name}
Phone: ${form.phone}
Address: ${form.address}
Order: ${orderDetails}.

Thank you for choosing Sapphire Laundry — we will get back to you soonest!`
    );

    window.open(`https://wa.me/2349126065952?text=${message}`, "_blank");

    alert("Order received! We will contact you soonest.");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded"
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Home Address"
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 mt-4 rounded-lg"
      >
        Submit Order
      </button>
    </form>
  );
};

export default OrderForm;
