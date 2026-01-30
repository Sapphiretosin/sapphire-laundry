import React from "react";
import { FaShoppingCart, FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ use hook

const MobileStickyButtons = () => {
  const { user, cart } = useCart(); // ✅ useCart hook
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (!user) {
      alert("You must log in or create an account to access the cart!");
      return;
    }
    navigate("/cart");
  };

  const handlePickupClick = () => {
    if (!user) {
      alert("You must log in or create an account to schedule a pickup!");
      return;
    }
    navigate("/schedule-pickup");
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-4 z-50">
      {/* Cart Button */}
      <button
        onClick={handleCartClick}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center relative hover:bg-blue-700 transition"
      >
        <FaShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
            {cart.length}
          </span>
        )}
      </button>

      {/* Schedule Pickup Button */}
      <button
        onClick={handlePickupClick}
        className="bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition"
      >
        <FaTruck size={24} />
      </button>
    </div>
  );
};

export default MobileStickyButtons;
