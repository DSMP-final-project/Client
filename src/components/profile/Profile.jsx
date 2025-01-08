import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Lock, Edit2, Save, X } from 'lucide-react';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        firstName: 'John',
        lastName: 'Doe',
        userName: 'johndoe',
        gender: 'MALE',
        email: 'john.doe@example.com',
        password: '********',
        phone: '+1234567890',
        address: '123 Main St, City',
        postalCode: '12345'
    });

    const [formData, setFormData] = useState(user);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.userName.trim()) newErrors.userName = 'Username is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setUser(formData);
            setIsEditing(false);
            // Here you would typically make an API call to update the user profile
            console.log('Profile updated:', formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCancel = () => {
        setFormData(user);
        setErrors({});
        setIsEditing(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`mt-1 block w-full rounded-md border ${
                                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                                } px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`mt-1 block w-full rounded-md border ${
                                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                                } px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`mt-1 block w-full rounded-md border ${
                                    errors.userName ? 'border-red-500' : 'border-gray-300'
                                } px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                            />
                            {errors.userName && (
                                <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 ${
                                    isEditing ? 'bg-white' : 'bg-gray-50'
                                }`}
                            >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`mt-1 block w-full rounded-md border ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`mt-1 block w-full rounded-md border ${
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                } px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`mt-1 block w-full rounded-md border ${
                                    errors.address ? 'border-red-500' : 'border-gray-300'
                                } px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`mt-1 block w-full rounded-md border ${
                                    errors.postalCode ? 'border-red-500' : 'border-gray-300'
                                } px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                            />
                            {errors.postalCode && (
                                <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                            )}
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default UserProfile;