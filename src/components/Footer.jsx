import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import imgurl from "../imgs/Safety.png";

const Footer = () => {
  return (
    <footer className="bg-red-700 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center md:text-left">

        {/* Sección: Información */}
        <div className="flex flex-col items-center md:items-start">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              id="logo-img"
              src={imgurl}
              alt="Logo"
              className="w-16 md:w-24 h-auto rounded-full"
            />
          </Link>
          <p className="text-sm mt-2">Los mejores productos para tu seguridad</p>
        </div>

        {/* Sección: Enlaces */}
        <div>
          <h3 className="text-lg font-semibold">Enlaces</h3>
          <ul className="mt-2 space-y-1">
            <li>
              <Link to="/" className="hover:underline">
                Inicio
              </Link>
            </li>
            {["Productos", "Contacto", "Nosotros"].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className="hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sección: Redes Sociales */}
        <div>
          <h3 className="text-lg font-semibold">Síguenos</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} className="hover:text-gray-300 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} className="hover:text-gray-300 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} className="hover:text-gray-300 transition" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={24} className="hover:text-gray-300 transition" />
            </a>
            <a href="mailto:u5Ko6@example.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope size={24} className="hover:text-gray-300 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center border-t border-white/30 pt-4 text-sm">
        <p>&copy; 2025 Safety First. Todos los derechos reservados.</p>
        <p className="text-xs mt-1">Diseñado con ❤️ por Tomas González Borje</p>
      </div>
    </footer>
  );
};

export default Footer;
