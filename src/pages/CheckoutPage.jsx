import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import LocationPicker from "../components/LocationPicker";
import axios from "axios";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  // Load Paystack SDK
  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Paystack payment
  const handlePaystackPayment = () => {
    if (!window.PaystackPop) return alert("Paystack SDK not loaded.");

    const handler = window.PaystackPop.setup({
      key: "pk_test_02310639cf6fa8048712645b61052108fda49378",
      email: formData.email,
      amount: calculateTotal() * 100,
      currency: "NGN",
      firstname: formData.name,
      callback: async function (response) {
        try {
          const orderDetails = {
            ...formData,
            cart,
            comment,
            paymentMethod: "Paystack",
            outletId: selectedOutlet?._id || selectedOutlet?.id,
          };

          const token = localStorage.getItem("token");
          const res = await axios.post(
            "http://localhost:5000/api/payment/verify-paystack",
            {
              reference: response.reference,
              orderDetails,
            },
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );

          if (res.data.success) {
            alert("Payment successful & order saved!");
            setSubmitted(true);
            clearCart();
            resetForm();
          } else {
            alert("Payment verification failed: " + res.data.message);
          }
        } catch (err) {
          alert("Error verifying payment: " + (err.response?.data?.message || err.message));
        }
      },
      onClose: function () {
        alert("Payment window closed.");
      },
    });

    handler.openIframe();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill all fields!");
      return;
    }

    if (!selectedOutlet) {
      alert("Please select a nearby outlet on the map first!");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (paymentMethod === "paystack") {
      handlePaystackPayment();
      return;
    }

    // Bank or USSD flow
    try {
      const orderDetails = {
        ...formData,
        cart,
        comment,
        paymentMethod,
        outletId: selectedOutlet?._id || selectedOutlet?.id,
        paymentStatus: "pending"
      };

      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/orders",
        orderDetails,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.success) {
        let paymentMessage = "";
        if (paymentMethod === "bank") {
          paymentMessage = `\n\nPlease make a bank transfer to:
BANK: Zenith Bank
ACCOUNT NAME: Sapphire Laundromart
ACCOUNT NUMBER: 1234567890`;
        } else if (paymentMethod === "ussd") {
          paymentMessage = `\n\nDial this USSD code to make payment:
*737*1*${calculateTotal()}*1234567890#`;
        }

        alert("Order submitted successfully!" + paymentMessage);
        setSubmitted(true);
        clearCart();
        resetForm();
      }
    } catch (err) {
      alert("Error submitting order: " + (err.response?.data?.message || err.message));
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", address: "" });
    setComment("");
    setPaymentMethod("");
  };

  return (
    <div className="checkout-container max-w-4xl mx-auto p-6 pt-32 pb-24">
      <h2 className="text-4xl font-bold mb-8 text-primary">Checkout</h2>

      <div className="mb-12 bg-card p-6 rounded-3xl border border-border shadow-md">
        <h3 className="text-xl font-bold mb-4">1. Select Nearby Outlet</h3>
        <LocationPicker
          onOutletChange={(outlet) => setSelectedOutlet(outlet)}
        />
        {selectedOutlet && (
          <p className="mt-4 text-green-600 font-bold">
            Selected: {selectedOutlet.name}
          </p>
        )}
      </div>

      <h3 className="text-xl font-bold mb-4">2. Your Details</h3>

      {submitted && (
        <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
          Order submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          placeholder="Additional comments"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <h3 className="mt-4 font-semibold">Select Payment Method</h3>
        <div className="flex flex-col gap-2 mt-2">
          <label>
            <input
              type="radio"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Bank Transfer
          </label>
          <label>
            <input
              type="radio"
              value="ussd"
              checked={paymentMethod === "ussd"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            USSD
          </label>
          <label>
            <input
              type="radio"
              value="paystack"
              checked={paymentMethod === "paystack"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Paystack
          </label>
        </div>

        <button
          type="submit"
          className="bg-primary text-primary-foreground w-full py-3 rounded hover:bg-primary/90 mt-4 transition shadow-md"
        >
          Submit Order
        </button>
      </form>

      <div className="cart-summary mt-8">
        <h3 className="text-xl font-semibold mb-2">Your Order</h3>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item, i) => (
            <p key={i}>
              {item.name} × {item.quantity} — ₦{item.price * item.quantity}
            </p>
          ))
        )}
        <h3 className="mt-2 font-bold">Total: ₦{calculateTotal()}</h3>
      </div>
    </div>
  );
}
