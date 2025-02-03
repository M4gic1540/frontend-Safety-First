import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getUserById, updateUser } from '../services/userApi'; // Asegúrate de importar el servicio adecuado

function EditForm() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);





    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(userId);
                setValue('username', userData.username);
                setValue('email', userData.email);
                setValue('first_name', userData.first_name);
                setValue('last_name', userData.last_name);
                setValue('is_superuser', userData.is_superuser || false);
                setValue('is_staff', userData.is_staff || false);
                setLoading(false);
            } catch (err) {
                setError('Error fetching user data.');
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, setValue]);

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                is_superuser: data.is_superuser === true || data.is_superuser === "on",
                is_staff: data.is_staff === true || data.is_staff === "on",
            };

            await updateUser(userId, formattedData);
            toast.success('User updated successfully!');
            navigate('/dashboard');
        } catch (err) {
            toast.error('Error updating user.');
        }
    };


    if (loading) return <p>Loading user data...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit User</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Username */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        {...register('username', { required: 'Username is required' })}
                        className="p-2 border rounded w-full"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        className="p-2 border rounded w-full"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* First Name */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="first_name">First Name</label>
                    <input
                        id="first_name"
                        type="text"
                        {...register('first_name', { required: 'First name is required' })}
                        className="p-2 border rounded w-full"
                    />
                    {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
                </div>

                {/* Last Name */}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="last_name">Last Name</label>
                    <input
                        id="last_name"
                        type="text"
                        {...register('last_name', { required: 'Last name is required' })}
                        className="p-2 border rounded w-full"
                    />
                    {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-2" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password')}
                        className="p-2 border rounded w-full"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Superuser Checkbox */}
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('is_superuser')}
                            checked={watch("is_superuser")}
                            onChange={(e) => setValue("is_superuser", e.target.checked)}
                            className="form-checkbox"
                        />
                        <span className="ml-2">Grant superuser privileges</span>
                    </label>
                </div>

                {/* Staff Checkbox */}
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('is_staff')}
                            checked={watch("is_staff")}
                            onChange={(e) => setValue("is_staff", e.target.checked)}
                            className="form-checkbox"
                        />
                        <span className="ml-2">Grant staff privileges</span>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditForm;
