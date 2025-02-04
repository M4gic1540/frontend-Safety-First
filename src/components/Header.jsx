import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import imgurl from "../imgs/Safety.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="shadow-md bg-red-700">
      <nav className="flex items-center justify-between w-full max-w-6xl mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            id="logo-img"
            src={imgurl}
            alt="Logo"
            className="w-16 md:w-24 h-auto rounded-full"
          />
        </Link>

        {/* Menú de navegación (Escritorio) */}
        <ul className="hidden md:flex flex-1 justify-center space-x-8">
          <li>
            <Link to="/" className="hover:underline font-bold text-white">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/contacto" className="hover:underline font-bold text-white">
              Contacto
            </Link>
          </li>
          <li>
            <Link to="/nosotros" className="hover:underline font-bold text-white">
              Nosotros
            </Link>
          </li>
        </ul>

        {/* Botones de autenticación */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-md font-bold text-red-700 bg-white hover:bg-gray-200 transition"
              >
                Registrarse
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-md font-bold text-red-700 bg-white hover:bg-gray-200 transition"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md font-bold text-white bg-gray-800 hover:bg-gray-900 transition"
            >
              Cerrar sesión
            </button>
          )}
        </div>

        {/* Botón Hamburguesa (Móvil) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </nav>

      {/* Menú desplegable (Móvil) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-red-700 flex flex-col items-center gap-4 py-4"
          >
            <li>
              <Link
                to="/"
                className="text-white text-lg font-bold hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                className="text-white text-lg font-bold hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>
            <li>
              <Link
                to="/nosotros"
                className="text-white text-lg font-bold hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Nosotros
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-md font-bold text-red-700 bg-white hover:bg-gray-200 transition"
                >
                  Registrarse
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-md font-bold text-red-700 bg-white hover:bg-gray-200 transition"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 rounded-md font-bold text-white bg-gray-800 hover:bg-gray-900 transition"
              >
                Cerrar sesión
              </button>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
