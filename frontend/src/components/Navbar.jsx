import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaStore, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
     
      <Link
        to="/"
        onClick={closeMenu}
        className="text-2xl font-bold text-blue-600 flex items-center gap-2"
      >
        <FaStore className="text-blue-500" />
        VibeCommerce
      </Link>

      <div className="hidden md:flex gap-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600 transition">
          Products
        </Link>
        <Link
          to="/cart"
          className="hover:text-blue-600 transition flex items-center gap-1"
        >
          <FaShoppingCart /> Cart
        </Link>
        <Link to="/checkout" className="hover:text-blue-600 transition">
          Checkout
        </Link>
      </div>

      <button
        onClick={toggleMenu}
        className="text-gray-700 text-2xl md:hidden focus:outline-none"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 text-gray-700 font-medium md:hidden animate-slideDown">
          <Link to="/" onClick={closeMenu} className="hover:text-blue-600 transition">
            Products
          </Link>
          <Link
            to="/cart"
            onClick={closeMenu}
            className="hover:text-blue-600 transition flex items-center gap-1"
          >
            <FaShoppingCart /> Cart
          </Link>
          <Link to="/checkout" onClick={closeMenu} className="hover:text-blue-600 transition">
            Checkout
          </Link>
        </div>
      )}
    </nav>
  );
}
