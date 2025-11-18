import React, { useState } from "react";
import { FaPalette } from "react-icons/fa";

const ColorSwitcher = () => {
  const [theme, setTheme] = useState("blue");

  const colors = ["blue", "red", "green", "purple", "orange"];

  const changeColor = () => {
    const nextColor = colors[(colors.indexOf(theme) + 1) % colors.length];
    setTheme(nextColor);

    // change all h1 and p tags
    const h1s = document.querySelectorAll("h1");
    const ps = document.querySelectorAll("p");

    h1s.forEach(h1 => (h1.style.color = nextColor));
    ps.forEach(p => (p.style.color = nextColor));
  };

  return (
    <button
      onClick={changeColor}
      className="fixed left-6 top-1/2 transform -translate-y-1/2 bg-white text-2xl shadow-lg rounded-full p-3 hover:rotate-45 transition-transform duration-300 z-50"
      title="Change text color"
    >
      <FaPalette
        className={`text-${theme}-600 transition-all duration-300`}
      />
    </button>
  );
};

export default ColorSwitcher;
