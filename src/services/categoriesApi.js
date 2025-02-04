import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/products/categories/";

// Obtener el token de localStorage
const getAuthToken = () => localStorage.getItem("token");

// Configurar la instancia de Axios
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para incluir el token solo en solicitudes autenticadas
apiClient.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Método para obtener todas las categorías (no requiere autenticación)
export const getCategories = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error(error.response?.data?.detail || "Failed to fetch categories");
    }
};

// Método para obtener una categoría por ID (no requiere autenticación)
export const getCategoryById = async (categoryId) => {
    try {
        const response = await axios.get(`${BASE_URL}${categoryId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching category ${categoryId}:`, error);
        throw new Error("Failed to fetch category");
    }
};

// Método para crear una nueva categoría (requiere autenticación)
export const createCategory = async (categoryData) => {
    try {
        const response = await apiClient.post("/", categoryData);
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw new Error("Failed to create category");
    }
};

// Método para actualizar una categoría (requiere autenticación)
export const updateCategory = async (categoryId, updatedData) => {
    try {
        const response = await apiClient.put(`/${categoryId}/`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error updating category ${categoryId}:`, error);
        throw new Error("Failed to update category");
    }
};

// Método para eliminar una categoría (requiere autenticación)
export const deleteCategory = async (categoryId) => {
    try {
        await apiClient.delete(`/${categoryId}/`);
        return { message: "Category deleted successfully" };
    } catch (error) {
        console.error(`Error deleting category ${categoryId}:`, error);
        throw new Error("Failed to delete category");
    }
};
