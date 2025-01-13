import {useState} from "react";
import {AlertCircle, Eye, EyeOff, Lock} from "lucide-react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const ChangePasswordPopup = ({onClose}) => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const email = decodedToken.sub;
    const [errors, setErrors] = useState({});

    const formValidation = () => {
        const newErrors = {};
        if (!formData.oldPassword) {
            newErrors.oldPassword = 'This field is required.';
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'This field is required.';
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'This field is required.';
        } else if (formData.confirmPassword.length < 6) {
            newErrors.confirmPassword = 'Password must be at least 6 characters';
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (formValidation()) {
            if (formData.confirmPassword === (formData.newPassword)) {
                try {
                    const response = await axios.put(`http://localhost:8083/api/v1/users/password/${email}`, formData)
                    onClose();
                    alert("Password Change Successful..")
                } catch (error) {
                    newErrors.oldPassword = 'Old password incorrect.'
                    setErrors(newErrors);
                }
            } else {
                newErrors.newPassword = 'Password not match.';
                newErrors.confirmPassword = 'Password not match.';
                setErrors(newErrors);
            }
        }
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">Change Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4 ">
                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400"/>
                                </div>
                                <input
                                    name="oldPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 ${
                                        errors['oldPassword'] ? 'border-red-500' : 'border-gray-300'
                                    } focus:outline-none focus:ring-gray-500 focus:border-gray-500`}
                                    placeholder="Old password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400"/>
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400"/>
                                    )}
                                </button>
                            </div>
                            {errors['oldPassword'] && (
                                <div className="mt-2 text-red-500 text-sm flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4"/>
                                    <span>{errors['oldPassword']}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400"/>
                                </div>
                                <input
                                    name="newPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 ${
                                        errors['newPassword'] ? 'border-red-500' : 'border-gray-300'
                                    } focus:outline-none focus:ring-gray-500 focus:border-gray-500`}
                                    placeholder="New password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400"/>
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400"/>
                                    )}
                                </button>
                            </div>
                            {errors['newPassword'] && (
                                <div className="mt-2 text-red-500 text-sm flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4"/>
                                    <span>{errors['newPassword']}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400"/>
                                </div>
                                <input
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 ${
                                        errors['confirmPassword'] ? 'border-red-500' : 'border-gray-300'
                                    } focus:outline-none focus:ring-gray-500 focus:border-gray-500`}
                                    placeholder="Confirm password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400"/>
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400"/>
                                    )}
                                </button>
                            </div>
                            {errors['confirmPassword'] && (
                                <div className="mt-2 text-red-500 text-sm flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4"/>
                                    <span>{errors['confirmPassword']}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPopup;
