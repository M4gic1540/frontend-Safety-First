import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/userApi";
import { motion } from "framer-motion";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [superuserKey, setSuperuserKey] = useState("");
    const [isSuperuser, setIsSuperuser] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    const navigate = useNavigate();

    const handleSuperuserKeyChange = (e) => {
        const value = e.target.value;
        setSuperuserKey(value);

        const isSuper = value === "superuser25";
        setIsSuperuser(isSuper);
        setIsStaff(isSuper);
    };

    const onSubmit = async (data) => {
        try {
            const userData = { ...data, is_superuser: isSuperuser, is_staff: isStaff };
            await createUser(userData);
            toast.success("User created successfully! 🎉");
            reset();
            navigate("/login");
        } catch (error) {
            console.error("Error creating user:", error);
            toast.error("Failed to create user. Please try again later.");
        }
    };

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.div
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Registrarse 🚀
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {["Nombre de usuario", "Email", "Nombre", "Apellido", "Contraseña"].map(
                        (field) => (
                            <div key={field}>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    {field.replace("_", " ")}
                                </label>
                                <motion.input
                                    type={field === "password" ? "password" : "text"}
                                    {...register(field, {
                                        required: `${field.replace("_", " ")} is required`,
                                    })}
                                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                    whileFocus={{ scale: 1.02 }}
                                />
                                {errors[field] && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors[field].message}
                                    </p>
                                )}
                            </div>
                        )
                    )}

                    {/* Superuser Key */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Superuser (optional)
                        </label>
                        <motion.input
                            type="text"
                            value={superuserKey}
                            onChange={handleSuperuserKeyChange}
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            whileFocus={{ scale: 1.02 }}
                        />
                        {isSuperuser && (
                            <motion.div
                                className="mt-2 flex flex-col space-y-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <label className="inline-flex items-center">
                                    <input type="checkbox" checked readOnly className="form-checkbox" />
                                    <span className="ml-2">Superuser Privileges</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" checked readOnly className="form-checkbox" />
                                    <span className="ml-2">Staff Member</span>
                                </label>
                            </motion.div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-600 transition-all"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        Registrarse
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default Register;
