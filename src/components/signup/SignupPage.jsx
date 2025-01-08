import {useState} from 'react';
import {AlertCircle} from 'lucide-react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        userName: '',
        postalCode: '',
       gender:''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_URL;

    /*const validateEmail = async (email) => {
        try {
            const response = await axios.get(
                `https://api.neverbounce.com/v4/single-check?key=AIzaSyDx4iICsj6zjk8HB42bNKSxympZYKbC8d8&email=${email}`
            );
            return response.data.result === 'valid'; // Returns true if the email is valid
        } catch (error) {
            console.error('Error validating email:', error);
            return false;
        }
    };*/


    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 0) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.userName) {
            newErrors.userName = 'Username is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {

        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

       // validateEmail(formData.email)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(`${baseUrl}/api/v1/users/signup`, formData)
                alert("Sign up successful...");
               navigate("/login");
            } catch (e) {
                alert("Something went wrong " + e);
            }
        }
        console.log(formData)
    };

    const handleGenderChange =(e)=>{
        setFormData({ ...formData, gender: e.target.value });
    }

    const renderField = (name, label, type, placeholder) => (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-start" htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full p-2 border rounded-md ${
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-gray-500`}
            />
            {errors[name] && (
                <div className="mt-2 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4"/>
                    <span>{errors[name]}</span>
                </div>
            )}
        </div>
    );

    const radio=(value)=> (
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-start">
                    <input
                        type="radio"
                        name="gender"
                        value={value}
                        checked={formData.gender === value}
                        onChange={handleGenderChange}
                    />
                    {value}
                </label>
            </div>
    );

    return (
        <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {renderField('firstName', 'Firstname', 'text', 'First Name')}
                {renderField('lastName', 'Lastname', 'text', 'Last Name')}
                {renderField('userName', 'Username', 'text', 'Choose a username')}
                <div className="flex gap-5">
                    {radio("MALE")}
                    {radio("FEMALE")}
                </div>
                {renderField('email', 'Email', 'email', 'Enter your email')}
                {renderField('password', 'Password', 'password', 'Choose a password')}
                {renderField('phone', 'Phone', 'text', 'Contact Number')}
                {renderField('address', 'Address', 'text', 'Address')}
                {renderField('postalCode', 'Postalcode', 'text', 'Postalcode')}
                <button
                    type="submit"
                    className="w-full bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
                >
                    Sign Up
                </button>
            </form>
            <div className="mt-6">
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-gray-700 hover:text-gray-800">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;