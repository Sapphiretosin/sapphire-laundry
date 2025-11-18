import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // Function to calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // Get current and delivery dates
  const orderDate = new Date();
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + Math.floor(Math.random() * 4) + 4); // 4–7 days

  // Function to generate a digital receipt
  const generateReceipt = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    let receiptContent = `
      <h2>Sapphire Laundry - Invoice</h2>
      <p>Date: ${new Date().toDateString()}</p>
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>Service</th>
          <th>Price (₦)</th>
        </tr>
        ${cart
          .map(
            (item) =>
              `<tr><td>${item.name}</td><td>₦${item.price.toLocaleString()}</td></tr>`
          )
          .join("")}
      </table>
      <h3>Total: ₦${totalPrice.toLocaleString()}</h3>
      <p>Expected Delivery: ${deliveryDate.toDateString()}</p>
    `;

    const receiptWindow = window.open("", "Receipt", "width=600,height=600");
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
    receiptWindow.print();
  };

  return (
    <div className="mt-24 px-6 md:px-20 py-12">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-lg p-6">
            {cart.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center border-b border-gray-200 py-4"
              >
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">₦{item.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </motion.div>
            ))}

            {/* Cart summary */}
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

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-end gap-4 mt-8">
              <button
                onClick={clearCart}
                className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={generateReceipt}
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 shadow-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
