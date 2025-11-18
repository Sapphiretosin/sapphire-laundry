import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Prices from "./components/Prices";
import CommercialLaundry from "./components/CommercialLaundry";
import WhyChooseUs from "./components/WhyChooseUs";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import FAQ from "./components/FAQ";
import Contacts from "./components/Contacts";
import Cart from "./pages/Cart";
import SchedulePickup from "./pages/ShedulePickup";
import { CartContext } from "./context/CartContext";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/commercial" element={<CommercialLaundry />} />
        <Route path="/whyus" element={<WhyChooseUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/schedule-pickup" element={<SchedulePickup />} />
        <Route path="/CartContext" element={<CartContext />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
