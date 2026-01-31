import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import sapphire11 from "../assets/sapphire logo.png";
import { registerUser, loginUser } from "../utils/api";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const location = useLocation();
  const { user, setUser } = useCart();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleAuth = () => setAuthOpen(!authOpen);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Services", to: "/services" },
    { name: "Pricing", to: "/prices" },
    { name: "Commercial", to: "/commercial" },
    { name: "Why Us", to: "/whyus" },
    { name: "Schedule Pickup", to: "/schedule-pickup" },
  ];

  const isActive = (path) => location.pathname === path;

  // Persist user
  useEffect(() => {
    const savedUser = localStorage.getItem("sapphireUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const saveUser = (userData, token) => {
    setUser(userData);
    localStorage.setItem("sapphireUser", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(fullName, email, password);
      saveUser(data.user, data.token);
      setAuthOpen(false);
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.message);
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      saveUser(data.user, data.token);
      setAuthOpen(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.message);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("sapphireUser");
    localStorage.removeItem("token");
    setUser(null);
    setAuthOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="flex justify-between items-center px-4 md:px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <img
              src={sapphire11}
              alt="Sapphire Laundry Logo"
              className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full drop-shadow-md"
            />
            <span className="text-lg md:text-2xl font-extrabold text-primary tracking-wide">
              Sapphire Laundry
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.to}
                  className={`${isActive(link.to)
                    ? "text-primary font-semibold"
                    : "text-foreground"
                    } hover:text-primary transition`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {user?.role === "superadmin" && (
              <li>
                <Link to="/super-admin" className="text-primary font-bold hover:underline">Super Admin</Link>
              </li>
            )}

            {user?.role === "outlet_owner" && (
              <li>
                <Link to="/outlet-dashboard" className="text-primary font-bold hover:underline">Outlet Panel</Link>
              </li>
            )}

            {!user && (
              <li>
                <Link to="/outlet-register" className="text-muted-foreground hover:text-primary transition text-sm">Become a Partner</Link>
              </li>
            )}

            {/* Make Payment Button */}
            <li>
              <Link
                to="/payment"
                className={`${isActive("/payment")
                  ? "text-primary font-semibold"
                  : "text-foreground"
                  } hover:text-primary transition`}
              >
                Make Payment
              </Link>
            </li>

            {/* Auth Button */}
            <li>
              <button
                onClick={toggleAuth}
                className="flex items-center gap-2 text-foreground hover:text-primary transition"
              >
                <FaUser /> {user ? user.name || user.username : "Account"}
              </button>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-gray-800" onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-white shadow-md"
          >
            <ul className="flex flex-col gap-4 p-4">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-foreground hover:text-primary transition ${isActive(link.to) ? "text-primary font-semibold" : ""
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* Make Payment Button */}
              <li>
                <Link
                  to="/payment"
                  onClick={() => setMenuOpen(false)}
                  className={`block text-foreground hover:text-primary transition ${isActive("/payment") ? "text-primary font-semibold" : ""
                    }`}
                >
                  Make Payment
                </Link>
              </li>

              {/* Auth / Account */}
              <li>
                <button
                  onClick={toggleAuth}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition"
                >
                  <FaUser /> {user ? user.name || user.username : "Account"}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </nav>

      {/* Auth Modal */}
      {authOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-lg w-96 relative"
          >
            <div className="flex justify-between mb-4">
              <button
                className={`px-4 py-2 rounded ${showLogin ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                onClick={() => setShowLogin(true)}
              >
                Log In
              </button>
              <button
                className={`px-4 py-2 rounded ${!showLogin ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                onClick={() => setShowLogin(false)}
              >
                Register
              </button>
            </div>

            {!user ? (
              showLogin ? (
                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      id="rememberMeLogin"
                    />
                    <label htmlFor="rememberMeLogin" className="text-sm">
                      Remember Me
                    </label>
                  </div>
                  <button className="bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition">
                    Log In
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="p-2 border rounded"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      id="rememberMeRegister"
                    />
                    <label htmlFor="rememberMeRegister" className="text-sm">
                      Remember Me
                    </label>
                  </div>
                  <button className="bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition">
                    Create Account
                  </button>
                </form>
              )
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-left bg-gray-100 px-4 py-2 rounded hover:bg-blue-50"
              >
                Logout
              </button>
            )}

            {/* Close Modal */}
            <button
              onClick={() => setAuthOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
            >
              <FaTimes />
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Navbar;
