import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import  {createCategory}  from "../services/categoriesApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CategoryForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
    }, [navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await createCategory(data);
            toast.success("Categoría agregada exitosamente");
            reset(); // Limpiar el formulario después de enviar
        } catch (error) {
            toast.error("Error al agregar la categoría");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Agregar Categoría</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-medium">Nombre</label>
                    <input
                        type="text"
                        {...register("name", { required: "El nombre es obligatorio" })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block font-medium">Descripción</label>
                    <textarea
                        {...register("description", { required: "La descripción es obligatoria" })}
                        className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <button
                    type="submit"
                    className={`w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded ${loading ? "opacity-50" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Enviando..." : "Agregar Categoría"}
                </button>
            </form>
        </div>
    );
}

export default CategoryForm;
