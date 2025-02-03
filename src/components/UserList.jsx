import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/userApi';
import { useNavigate } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para el indicador de carga
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true); // Activar carga
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // Si no hay token, redirigir al login
                    navigate('/login');
                    return;
                }

                const data = await getAllUsers();
                setUsers(data);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to fetch users. Please try again later.');
            } finally {
                setLoading(false); // Desactivar carga
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleEdit = (userId) => {
        // Redirigir a la página de edición de usuario
        navigate(`/edit-user/${userId}`);
    };

    const handleDelete = (userId) => {
        // Lógica para eliminar usuario
        // Se puede abrir un modal de confirmación para eliminar el usuario
        alert(`Eliminar usuario con ID: ${userId}`);
        
        // Llamada a la API para eliminar el usuario
        deleteUser(userId)
            .then(() => {
                // Actualizar la lista de usuarios despues de eliminar
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            })
            .catch((err) => {
                console.error('Error deleting user:', err);
                setError('Failed to delete user. Please try again later.');
            });
    };

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (users.length === 0) {
        return <p>No users found.</p>;
    }

    return (
        <div className="mx-auto p-4">
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="mb-2 p-4 bg-gray-100 rounded shadow">
                        <span className='font-bold'>ID: </span> {user.id} <br />
                        <span className='font-bold'>Nombre: </span>{user.first_name} <br />
                        <span className='font-bold'>Apellido: </span>{user.last_name} <br />
                        <span className='font-bold'>Email: </span>{user.email} <br />
                        <span className='font-bold'>Nombre de usuario: </span>{user.username} <br />
                        <span className='font-bold'>Rol: </span>{user.is_superuser ? ' (Admin)' : ' (User)'} <br />
                        <span className='font-bold'>Es staff: </span> {user.is_staff ? 'Si' : 'No'} <br />
                        <div className="mt-2">
                            <button
                                onClick={() => handleEdit(user.id)}
                                className='ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                aria-label={`Edit user ${user.username}`}
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className='ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                aria-label={`Delete user ${user.username}`}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
