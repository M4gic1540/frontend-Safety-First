import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/loginApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response.access);

      toast.success("Bienvenido! 🎉");
      reset();
      navigate("/");
    } catch (err) {
      toast.error("Credenciales Incorrectas, por favor intente de nuevo.");
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
          Bienvenido de nuevo 👋
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Nombre de usuario
            </label>
            <motion.input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              whileFocus={{ scale: 1.02 }}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Contraseña
            </label>
            <motion.input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              whileFocus={{ scale: 1.02 }}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-600 transition-all"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            Iniciar Sesión
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
