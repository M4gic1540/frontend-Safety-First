import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold text-red-700">Acerca de Nosotros</h1>
          <p className="text-lg text-gray-800 mt-2">
            En <span className="font-bold">SafetyFirst</span>, nos especializamos en la venta de botiquines de primeros auxilios y extintores portátiles, garantizando seguridad en cualquier entorno.
          </p>
        </motion.div>

        {/* Sección Historia, Misión y Visión */}
        <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
          {["Nuestra Historia", "Misión", "Visión"].map((title, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white shadow-lg rounded-lg p-6 text-center"
            >
              <h2 className="text-2xl font-bold text-red-700">{title}</h2>
              <p className="text-gray-700 mt-2">
                {title === "Nuestra Historia" && "Fundados en 2024, hemos crecido hasta convertirnos en líderes del sector, proporcionando productos confiables y de alta calidad para hogares, empresas y deportes."}
                {title === "Misión" && "Brindar seguridad y confianza a través de productos de primeros auxilios y prevención de incendios, asegurando la tranquilidad de nuestros clientes."}
                {title === "Visión" && "Ser la empresa líder en seguridad y salud, ofreciendo soluciones innovadoras y accesibles en todo el país."}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Productos Complementarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-6xl mx-auto mt-12"
        >
          <h2 className="text-3xl font-bold text-red-700 text-center">Nuestros Productos</h2>
          <p className="text-lg text-gray-800 text-center mt-2">
            Contamos con una amplia gama de productos complementarios para primeros auxilios.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {["Vendas de diferentes tipos y tamaños", "Gasas estériles", "Alcohol yodado", "Agua oxigenada", "Antisépticos", "Crema para quemaduras", "Repelente de insectos", "Tijeras, pinzas y termómetros"].map((product, index) => (
              <motion.div
                key={product}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white shadow-md rounded-lg p-4 text-center"
              >
                <img src="https://placehold.co/500x500" alt={product} className="w-40 h-25 mx-auto mb-3" />
                <p className="text-gray-800 font-medium">{product}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
