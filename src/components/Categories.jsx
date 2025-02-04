import React, { useEffect, useState } from "react";
import { getCategories } from "../services/categoriesApi";
import CategoryForm from "./CategoryForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-center text-red-700 mb-6">
                    Categorías Disponibles
                </h2>

                {loading && <p className="text-red-700 text-center">Cargando categorías...</p>}
                {error && <p className="text-red-500 text-center">Error: {error}</p>}
                {!loading && !error && categories.length === 0 && (
                    <p className="text-gray-500 text-center">No hay categorías disponibles.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="p-4 bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <h3 className="text-lg font-semibold text-red-700">{category.name}</h3>
                            <p className="text-gray-600">{category.description}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-10 rounded-lg p-6 max-w-lg mx-auto">
                    <CategoryForm />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Categories;
