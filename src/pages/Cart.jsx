// src/pages/Cart.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // ✅ Correct import
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const orderDate = new Date();
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + Math.floor(Math.random() * 4) + 4);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address || cart.length === 0) {
      alert("Please fill all fields and have at least one service in your cart!");
      return;
    }

    const servicesList = cart.map(
      (item) => `${item.title || item.name} x${item.quantity} (₦${item.price * item.quantity})`
    );

    const message = `Hello! New order received:
Services:
${servicesList.join("\n")}
Comments: ${comment || "None"}
Customer Info: ${formData.name}, ${formData.email}, ${formData.phone}
Address: ${formData.address}
Total: ₦${totalPrice.toLocaleString()}`;

    // Send Email
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", { message }, "YOUR_PUBLIC_KEY")
      .then(() => console.log("Email sent"))
      .catch((err) => console.log(err));

    // WhatsApp notification
    const phoneNumber = "2349126065952";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");

    setSubmitted(true);
    clearCart();
    setFormData({ name: "", email: "", phone: "", address: "" });
    setComment("");
  };

  const printReceipt = () => {
    if (cart.length === 0) return alert("Cart is empty!");

    const orderId = "SL-" + Math.floor(Math.random() * 1000000);
    const logoUrl = "https://yourdomain.com/logo.png"; // replace with actual logo path

    const receiptContent = `
      <html>
      <head>
        <title>Sapphire Laundry Receipt</title>
        <style>
          body { font-family: Arial,sans-serif; margin:20px; background:#f8f9fa; }
          .container { max-width:800px; margin:auto; background:white; padding:20px; border-radius:10px; }
          .header { text-align:center; }
          .header img { width:80px; margin-bottom:10px; }
          h1 { color:#1e3a8a; margin:0; }
          table { width:100%; border-collapse:collapse; margin-top:20px; }
          th, td { border-bottom:1px solid #ddd; padding:8px; text-align:left; }
          th { background:#1e3a8a; color:white; }
          .total { text-align:right; font-weight:bold; margin-top:20px; color:#1e3a8a; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${logoUrl}" alt="Logo" />
            <h1>Sapphire Laundry</h1>
            <p>Order ID: ${orderId}</p>
            <p>Order Date: ${orderDate.toDateString()}</p>
            <p>Expected Delivery: ${deliveryDate.toDateString()}</p>
          </div>
          <table>
            <tr><th>Service</th><th>Qty</th><th>Unit (₦)</th><th>Subtotal (₦)</th></tr>
            ${cart.map(item => `<tr>
              <td>${item.title || item.name}</td>
              <td>${item.quantity}</td>
              <td>₦${item.price.toLocaleString()}</td>
              <td>₦${(item.price*item.quantity).toLocaleString()}</td>
            </tr>`).join('')}
          </table>
          <div class="total">Total: ₦${totalPrice.toLocaleString()}</div>
          <div><strong>Customer:</strong> ${formData.name}</div>
          <div><strong>Address:</strong> ${formData.address}</div>
          <div><strong>Comments:</strong> ${comment || "None"}</div>
        </div>
      </body>
      </html>
    `;

    const receiptWindow = window.open("", "Receipt", "width=800,height=900");
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
    receiptWindow.focus();
    receiptWindow.print();
  };

  return (
    <div className="mt-24 px-6 md:px-20 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          {cart.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center border-b border-gray-200 py-4"
            >
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{item.title || item.name}</h3>
                <p className="text-gray-500 text-sm">
                  ₦{item.price.toLocaleString()} x{" "}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1 text-center"
                  />
                </p>
                <p className="text-gray-700 font-semibold">
                  Subtotal: ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </motion.div>
          ))}

          <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-gray-700">
              <p className="font-semibold">Order Date: {orderDate.toDateString()}</p>
              <p className="font-semibold text-blue-600">
                Expected Delivery: {deliveryDate.toDateString()}
              </p>
            </div>

            <div className="text-right mt-4 md:mt-0">
              <h2 className="text-2xl font-bold text-blue-700">
                Total: ₦{totalPrice.toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="mt-8">
            {submitted && (
              <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
                Thank you! Your order has been submitted.
              </div>
            )}
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded"/>
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded"/>
              <input type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded"/>
              <input type="text" name="address" placeholder="Your Address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border rounded"/>
              <textarea value={comment} placeholder="Comments or special instructions" onChange={(e)=>setComment(e.target.value)} className="w-full px-4 py-2 border rounded" rows={3}/>
              <button type="submit" className="bg-green-600 text-white w-full py-3 rounded-full font-semibold hover:bg-green-700 transition">
                Submit Order
              </button>
              <button type="button" onClick={printReceipt} className="bg-blue-600 text-white w-full py-3 rounded-full font-semibold hover:bg-blue-700 transition">
                Print Receipt
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
