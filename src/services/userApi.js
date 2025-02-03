import axios from 'axios';

// Base URL de la API
const BASE_URL = 'http://127.0.0.1:8000/api/users/users/';

// Crear una instancia de Axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener el token del localStorage
const getToken = () => localStorage.getItem('token');

// Configuración del token JWT usando un interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Configurar el token en cada solicitud
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para verificar si el token está disponible
const isTokenAvailable = () => {
  const token = getToken();
  return token !== null;
};

// Función para obtener todos los usuarios
export const getAllUsers = async () => {
  if (!isTokenAvailable()) {
    throw new Error('Token not available or expired.');
  }

  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Unable to fetch users. Please try again later.');
  }
};

// Función para obtener un usuario por ID
export const getUserById = async (userId) => {
  if (!isTokenAvailable()) {
    throw new Error('Token not available or expired.');
  }

  try {
    const response = await api.get(`/${userId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw new Error(`Unable to fetch user with ID ${userId}.`);
  }
};

export const createUser = async (userData) => {
  if (!isTokenAvailable()) {
    throw new Error('Token not available or expired.');
  }

  try {
    const response = await api.post('/', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Unable to create user. Please try again later.');
  }
};


// Función para actualizar un usuario existente
export const updateUser = async (userId, userData) => {
  try {
    console.log("Sending update:", userData); // Depuración
    const response = await api.put(`/${userId}/`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error.response?.data || error);
    throw new Error(`Unable to update user with ID ${userId}.`);
  }
};

// Función para eliminar un usuario
export const deleteUser = async (userId) => {
  if (!isTokenAvailable()) {
    throw new Error('Token not available or expired.');
  }

  try {
    const response = await api.delete(`/${userId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw new Error(`Unable to delete user with ID ${userId}.`);
  }
};
