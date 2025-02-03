import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Images = [
    "https://mdcare.cl/wp-content/uploads/2021/09/77d928fe-1e67-11ec-a992-53b242dedc27-1-1024x442.jpg",
    "https://cdn-cinfasalud.cinfa.com/wp-content/uploads/2019/03/CinfaSalud-botiquin-hogar-600.jpg?x19187",
    "https://cdnx.jumpseller.com/ubl-store/image/25560449/FOTO_BOTIQUIN.jpeg.jpeg?1657118690",
];

const sliderVariants = {
    incoming: (direction) => ({
        x: direction > 0 ? "100%" : "-100%", // Se mueve de izquierda a derecha o viceversa
        opacity: 0,
    }),
    active: { x: 0, opacity: 1 },
    exit: (direction) => ({
        x: direction > 0 ? "-100%" : "100%", // Sale en dirección contraria
        opacity: 0,
    }),
};

const sliderTransition = {
    duration: 0.6, // Transición más rápida
    ease: "easeInOut",
};

const Carrusel = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = () => {
        setDirection(1);
        setIndex((prevIndex) => (prevIndex + 1) % Images.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setIndex((prevIndex) => (prevIndex - 1 + Images.length) % Images.length);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
            <div className="relative w-full h-60 md:h-96">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={index}
                        src={Images[index]}
                        alt={`Slide ${index + 1}`}
                        className="absolute w-full h-full object-cover"
                        variants={sliderVariants}
                        initial="incoming"
                        animate="active"
                        exit="exit"
                        transition={sliderTransition}
                        custom={direction}
                    />
                </AnimatePresence>
            </div>

            {/* Botones de Navegación */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                    onClick={prevSlide}
                    className="p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition"
                    aria-label="Anterior"
                >
                    {"<"}
                </button>
                <button
                    onClick={nextSlide}
                    className="p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition"
                    aria-label="Siguiente"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default Carrusel;
