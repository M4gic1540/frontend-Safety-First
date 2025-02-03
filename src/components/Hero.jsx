import React from "react";
import { motion } from "framer-motion";
import Carrusel from "./Carrusel";

const Hero = ({ title, subtitle}) => {
    return (
        <section className="relative bg-gray-100">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center p-6">
                {/* Texto del Hero */}
                <motion.div
                    className="text-center md:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-red-700">
                        {title}
                    </h1>
                    <p className="text-lg text-gray-700 mt-4">
                        {subtitle}
                    </p>
                    <button className="mt-6 px-6 py-3 bg-red-700 text-white rounded-lg text-lg font-semibold hover:bg-red-800 transition">
                        Ver Productos
                    </button>
                </motion.div>

                {/* Imagen del Hero */}
                <motion.div
                    className="overflow-hidden rounded-2xl shadow-lg"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Carrusel />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
