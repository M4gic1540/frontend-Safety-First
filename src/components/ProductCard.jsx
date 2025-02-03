import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ image, title, description, price }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden transition"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      {/* Imagen del producto */}
      <img src={image} alt={title} className="w-full h-56 object-cover" />

      {/* Contenido de la Card */}
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <p className="text-red-700 font-bold text-lg mt-2">${price}</p>

        {/* Botón de compra */}
        <button className="mt-4 bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition">
          Comprar
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
