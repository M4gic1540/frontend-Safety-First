import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/userApi';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce'; // Importar el hook

function UserList() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // Retrasa la búsqueda

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const data = await getAllUsers();
                setUsers(data);
                setFilteredUsers(data); // Inicialmente, mostrar todos los usuarios
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to fetch users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    useEffect(() => {
        if (!debouncedSearchTerm) {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter((user) =>
                `${user.first_name} ${user.last_name} ${user.username} ${user.email}`
                    .toLowerCase()
                    .includes(debouncedSearchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [debouncedSearchTerm, users]);

    const handleEdit = (userId) => {
        navigate(`/edit-user/${userId}`);
    };

    const handleDelete = async (userId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                await deleteUser(userId);
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            } catch (err) {
                console.error('Error deleting user:', err);
                setError('Failed to delete user. Please try again later.');
            }
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (filteredUsers.length === 0) return <p>No users found.</p>;

    return (
        <div className="mx-auto p-4">
            {/* Campo de búsqueda */}
            <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full"
            />

            <ul>
                {filteredUsers.map((user) => (
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
