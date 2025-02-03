import React from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Mensaje enviado correctamente");
        e.target.reset();
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center p-6 bg-gray-100">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-red-700 mb-4 text-center"
                >
                    Contáctanos
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="text-lg text-gray-800 text-center max-w-xl"
                >
                    ¿Tienes preguntas o sugerencias? Escríbenos o llámanos. ¡Estaremos encantados de atenderte!
                </motion.p>

                {/* Sección de contacto */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {/* Información de contacto */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white shadow-lg p-6 rounded-lg flex flex-col gap-4"
                    >
                        <h2 className="text-2xl font-bold text-red-700 mb-2">Información</h2>
                        <div className="flex items-center gap-2 text-gray-800">
                            <FaEnvelope className="text-red-700" />
                            <a href="mailto:t.gonzalezb24@gmail.com" className="hover:underline">t.gonzalezb24@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-2 text-gray-800">
                            <FaPhone className="text-red-700" />
                            <a href="tel:+1234567890" className="hover:underline">+569 40384760</a>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                            <a href="https://facebook.com" className="text-red-700 text-2xl hover:text-red-800"><FaFacebook /></a>
                            <a href="https://twitter.com" className="text-red-700 text-2xl hover:text-red-800"><FaTwitter /></a>
                            <a href="https://instagram.com" className="text-red-700 text-2xl hover:text-red-800"><FaInstagram /></a>
                            <a href="https://whatsapp.com" className="text-red-700 text-2xl hover:text-red-800"><FaWhatsapp /></a>
                        </div>
                    </motion.div>

                    {/* Formulario de contacto */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white shadow-lg p-6 rounded-lg"
                    >
                        <h2 className="text-2xl font-bold text-red-700 mb-4">Envíanos un mensaje</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <motion.input
                                whileFocus={{ scale: 1.05 }}
                                type="text"
                                placeholder="Nombre"
                                className="p-3 border rounded-lg focus:ring-2 focus:ring-red-700"
                                required
                            />
                            <motion.input
                                whileFocus={{ scale: 1.05 }}
                                type="email"
                                placeholder="Correo electrónico"
                                className="p-3 border rounded-lg focus:ring-2 focus:ring-red-700"
                                required
                            />
                            <motion.textarea
                                whileFocus={{ scale: 1.05 }}
                                placeholder="Tu mensaje"
                                rows="4"
                                className="p-3 border rounded-lg focus:ring-2 focus:ring-red-700"
                                required
                            ></motion.textarea>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition"
                            >
                                Enviar
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Contact;
