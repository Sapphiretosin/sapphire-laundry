import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Prices from "./components/Prices";
import CommercialLaundry from "./components/CommercialLaundry";
import WhyChooseUs from "./components/WhyChooseUs";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import FAQ from "./components/FAQ";
import DeliveryServices from "./components/DeliveryService";
import MobileStickyButtons from "./components/MobileStickyButtons";

import Services from "./components/Services";
import CommercialServices from "./components/CommercialServices";
import OrderForm from "./components/OrderForm";

import Cart from "./pages/Cart";
import SchedulePickup from "./pages/SchedulePickup";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import OutletDashboard from "./pages/OutletDashboard";
import OutletRegistration from "./pages/OutletRegistration";


import { CartProvider } from "./context/CartContext";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";

function App() {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedOrder = localStorage.getItem("latestOrder");
    if (storedOrder) setOrder(JSON.parse(storedOrder));
  }, []);

  return (
    <CartProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/commercial" element={<CommercialLaundry />} />
          <Route path="/whyus" element={<WhyChooseUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/delivery-services" element={<DeliveryServices />} />


          {/* AUTH ROUTES */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule-pickup"
            element={
              <ProtectedRoute>
                <SchedulePickup />
              </ProtectedRoute>
            }
          />

          {/* SERVICE PAGES */}
          <Route path="/servicespage" element={<Services />} />
          <Route path="/commercial-services" element={<CommercialServices />} />
          <Route path="/orderform" element={<OrderForm />} />

          {/* ADMIN & MULTI-TENANT */}
          <Route path="/admin" element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          } />
          <Route path="/super-admin" element={
            <RequireRole role="superadmin">
              <SuperAdminDashboard />
            </RequireRole>
          } />
          <Route path="/outlet-dashboard" element={
            <RequireRole role="outlet_owner">
              <OutletDashboard />
            </RequireRole>
          } />
          <Route path="/outlet-register" element={<OutletRegistration />} />

          {/* CHECKOUT PAGE */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>

        <MobileStickyButtons />
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
