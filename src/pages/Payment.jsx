// src/pages/Payment.jsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import api from "@/utils/api"; // your axios setup

export default function Payment() {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  // Load logged-in user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("sapphireUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Fetch latest order for user
  useEffect(() => {
    async function fetchOrder() {
      if (!user) return;

      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/orders/latest/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.order) {
          setOrder(res.data.order);
        } else {
          setOrder(null); // no pending orders
        }
      } catch (err) {
        console.error("Error fetching latest order:", err);
        setOrder(null);
      }
    }

    fetchOrder();
  }, [user]);

  // Load Paystack SDK once
  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => setSdkLoaded(true);
      document.body.appendChild(script);
    } else {
      setSdkLoaded(true);
    }
  }, []);

  const handlePaystack = () => {
    if (!order) return alert("No pending order to pay for.");
    if (!sdkLoaded) return alert("Paystack SDK not loaded yet.");

    const handler = window.PaystackPop.setup({
      key: "pk_test_02310639cf6fa8048712645b61052108fda49378",
      email: user.email,
      amount: parseFloat(order.total) * 100, // kobo
      currency: "NGN",
      firstname: user.name,
      callback: function (response) {
        alert(`Payment successful! Reference: ${response.reference}`);
        // TODO: Send reference to backend to mark order as paid
      },
      onClose: function () {
        alert("Payment window closed.");
      },
    });

    handler.openIframe();
  };

  const handleBankTransfer = () => {
    if (!order) return alert("No pending order to pay for.");
    alert(
      `Bank Transfer Instructions:\nAccount: 1234567890\nBank: XYZ\nAmount: ₦${order.total}`
    );
  };

  const handleUSSD = () => {
    if (!order) return alert("No pending order to pay for.");
    alert(
      `USSD Payment:\nDial *123# and follow instructions to pay ₦${order.total}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-4 bg-gray-50">
      <h1 className="text-2xl font-bold">Make Payment</h1>
      {!order ? (
        <p className="text-red-500">You have no pending orders to pay for.</p>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <p>
            <strong>Order Amount:</strong> ₦{order.total}
          </p>
          <Button onClick={handlePaystack} className="w-full">
            Pay with Paystack
          </Button>
          <Button onClick={handleBankTransfer} className="w-full">
            Pay via Bank Transfer
          </Button>
          <Button onClick={handleUSSD} className="w-full">
            Pay via USSD
          </Button>
        </div>
      )}
    </div>
  );
}
