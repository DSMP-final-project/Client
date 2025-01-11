import {useEffect, useState} from 'react';
import {Edit2, Save, X, Delete} from 'lucide-react';
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        gender: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        postalCode: ''
    });

    const [formData, setFormData] = useState(user);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    let profileData;

    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const email = decodedToken?.sub;

    const getCustomer = async () => {
        const response = await axios.get(`http://localhost:8083/api/v1/customer/${email}`)

        profileData = response?.data?.object
        setFormData(profileData)
    }

    useEffect(() => {
        getCustomer().then(r => console.log(r));
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.userName.trim()) newErrors.userName = 'Username is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required'; else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setUser(formData);
            setIsEditing(false);
            try {
                const response = await axios.put(`http://localhost:8083/api/v1/customer/update/${email}`, formData)
                alert("Profile details Updated.")
            } catch (ex) {
                alert("Something wend wrong")
            }
            console.log('Profile updated:', formData);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev, [name]: value
        }));
    };

    const handleCancel = () => {

        //setFormData(user);
        setErrors({});
        setIsEditing(false);
    };

    const backToHome = () => {
        navigate("/")
    }

    const deleteAcc = async () => {
        const isConfirm=window.confirm("Are you sure..");

        if (isConfirm){
            try {
                const response = await axios.delete(`http://localhost:8083/api/v1/customer/${email}`)
                localStorage.removeItem("jwtToken");
                navigate("/")
            }catch (ex){
                alert("something went wrong..");
            }
        }
    }

    const profilePicture = "";

    return (<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
                <div className="flex flex-col justify-center items-center">
                    <div
                        className={`w-[140px] h-[160px] shadow-md rounded-full flex items-center justify-center 
                        ${profilePicture ? "bg-no-repeat bg-cover bg-center" : "bg-[#D9D9D9] text-gray-800"}`}
                        style={profilePicture ? {backgroundImage: `url("${profilePicture}")`} : {}}
                    >
                        {!profilePicture && (
                            <span className="text-4xl font-bold">
                                        {formData.userName
                                            .split(" ")
                                            .map((word) => word[0])
                                            .join("")
                                        }
                            </span>)
                        }
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{formData.userName}</h2>
                </div>
                <div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full rounded-md border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                        />
                        {errors.firstName && (<p className="text-red-500 text-sm mt-1">{errors.firstName}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full rounded-md border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                        />
                        {errors.lastName && (<p className="text-red-500 text-sm mt-1">{errors.lastName}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full rounded-md border ${errors.userName ? 'border-red-500' : 'border-gray-300'} px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                        />
                        {errors.userName && (<p className="text-red-500 text-sm mt-1">{errors.userName}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                        />
                        {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                        />
                        {errors.phone && (<p className="text-red-500 text-sm mt-1">{errors.phone}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full rounded-md border max-h-[80px] min-h-[80px] ${errors.address ? 'border-red-500' : 'border-gray-300'} px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                        />
                        {errors.address && (<p className="text-red-500 text-sm mt-1">{errors.address}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full rounded-md border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                        />
                        {errors.postalCode && (<p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>)}
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={backToHome}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
                    >
                        Back
                    </button>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <button
                        type="button"
                        onClick={deleteAcc}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
                    >
                        <Delete/>
                        Delete Profile
                    </button>
                    {!isEditing && (<button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
                    >
                        <Edit2 className="w-4 h-4"/>
                        Edit Profile
                    </button>)}
                    {isEditing && (<div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            <X className="w-4 h-4"/>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
                        >
                            <Save className="w-4 h-4"/>
                            Save Changes
                        </button>
                    </div>)}
                </div>
            </div>
        </form>
    </div>);
};

export default UserProfile;