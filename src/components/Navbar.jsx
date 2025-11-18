import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import sapphire11 from "../assets/sapphire11.png";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // toggle between login/register
  const location = useLocation();
  const { cart } = useContext(CartContext);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleBlog = () => setBlogOpen(!blogOpen);
  const toggleAuth = () => setAuthOpen(!authOpen);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Services", to: "/services" },
    { name: "Pricing", to: "/prices" },
    { name: "Commercial", to: "/commercial" },
    { name: "Why Us", to: "/whyus" },
  ];

  const blogLinks = [
    { name: "Blog", to: "/blog" },
    { name: "Blog Post", to: "/blogpost" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple demo login
    setUser({ name: "John Doe" });
    setAuthOpen(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setUser({ name: "New User" });
    setAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setAuthOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={sapphire11}
            alt="Sapphire Laundry Logo"
            className="w-14 h-14 object-cover rounded-full drop-shadow-md"
          />
          <span className="text-2xl font-extrabold text-blue-700 tracking-wide">
            Sapphire Laundry
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.to}
                className={`${
                  isActive(link.to)
                    ? "text-blue-600 font-semibold"
                    : "text-gray-800"
                } hover:text-blue-600 transition`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Blog Dropdown */}
          <li className="relative">
            <button
              onMouseEnter={() => setBlogOpen(true)}
              onMouseLeave={() => setBlogOpen(false)}
              className="text-gray-800 hover:text-blue-600 transition flex items-center gap-1"
            >
              Blog
            </button>
            {blogOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-8 left-0 bg-white shadow-lg rounded-lg py-2 w-48"
                onMouseEnter={() => setBlogOpen(true)}
                onMouseLeave={() => setBlogOpen(false)}
              >
                {blogLinks.map((link, idx) => (
                  <li key={idx} className="px-4 py-2 hover:bg-blue-50">
                    <Link
                      to={link.to}
                      className="text-gray-800 block hover:text-blue-600"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </li>

          {/* Schedule Pickup & Cart */}
          <li className="flex items-center gap-4">
            <Link to="/schedule">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 hover:shadow-2xl transition"
              >
                Schedule a Pickup
              </motion.button>
            </Link>

            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition"
              >
                <FaShoppingCart size={20} />
              </motion.div>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {cart.length}
                </span>
              )}
            </Link>
          </li>

          {/* Auth Dropdown */}
          <li className="relative">
            <button
              onClick={toggleAuth}
              className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition"
            >
              <FaUser /> {user ? user.name : "Account"}
            </button>

            {authOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-72 p-4"
              >
                {!user ? (
                  <div>
                    <div className="flex justify-between mb-2">
                      <button
                        className={`px-4 py-2 rounded ${
                          showLogin ? "bg-blue-600 text-white" : "bg-gray-100"
                        }`}
                        onClick={() => setShowLogin(true)}
                      >
                        Log In
                      </button>
                      <button
                        className={`px-4 py-2 rounded ${
                          !showLogin ? "bg-blue-600 text-white" : "bg-gray-100"
                        }`}
                        onClick={() => setShowLogin(false)}
                      >
                        Register
                      </button>
                    </div>

                    {showLogin ? (
                      <form onSubmit={handleLogin} className="flex flex-col gap-3">
                        <input
                          type="email"
                          placeholder="Email"
                          className="p-2 border rounded"
                          required
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="p-2 border rounded"
                          required
                        />
                        <div className="flex justify-between items-center text-sm">
                          <label>
                            <input type="checkbox" className="mr-1" />
                            Remember Me
                          </label>
                          <button className="text-blue-600 hover:underline">
                            Forgot Password?
                          </button>
                        </div>
                        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                          Log In
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleRegister} className="flex flex-col gap-3">
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="p-2 border rounded"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          className="p-2 border rounded"
                          required
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="p-2 border rounded"
                          required
                        />
                        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                          Create Account
                        </button>
                      </form>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left bg-gray-100 px-4 py-2 rounded hover:bg-blue-50"
                  >
                    Logout
                  </button>
                )}
              </motion.div>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu (can add mobile auth similar to desktop) */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-white shadow-md"
        >
          {/* Existing mobile links here */}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
