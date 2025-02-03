import React, { createContext, useState, useEffect } from 'react';
import { getUserById } from '../services/userApi';
import axios from 'axios';

// Crear el contexto
export const UserContext = createContext();


// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); // Obtener token JWT

      if (!token) {
        setLoading(false);
        return;
      }

    

      try {
        // Decodificar el token para obtener el userId (en caso de que tu backend lo incluya en el payload)
        const userId = localStorage.getItem('userid'); // Ajusta esto según cómo almacenes el userId

        if (userId) {
          const response = await axios.get(`http://127.0.0.1:8000/api/users/users/${userId}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
