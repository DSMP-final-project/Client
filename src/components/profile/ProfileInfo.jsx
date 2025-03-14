import {Mail, MapPin, Phone} from 'lucide-react';
import Cookies from 'js-cookie';
import axiosFetch from "../utils/auth/Auth.js";
import {useEffect, useState} from "react";
import FileUploadModal from "./FileUploadModel.jsx";

export default function ProfileInfo({profile, isEditing, editedProfile, onChange}) {
    const userId = Cookies.get("userId");
    const [user, setUser] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const [imageId, setImageId] = useState('');
    const [isFileEditing, setIsFileEditing] = useState(false);


    const getUserData = async () => {
        return axiosFetch.get(`api/v1/customer/${userId}`);
    }
    useEffect(() => {
        getUserData().then(r => setUser(r?.data?.object))
    }, [userId]);

    useEffect(() => {
        setImageUrl(user?.profileImage?.resourceUrl)
        setImageId(user?.profileImage?.propertyId)
    }, [user?.profileImage?.propertyId]);

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("profileImage", file);
        console.log(formData)

        try {
            if (imageUrl) {
                await axiosFetch.put(`api/v1/profile-images/${imageId}`, formData);
                alert("Image successfully updated.");
            } else {
                const response = await axiosFetch.post(`api/v1/profile-images/${userId}`, formData);
                console.log(response)
                alert("Image successfully uploaded.");
            }
            window.location.reload();
        } catch (error) {
            alert("Failed to upload image");
        }
    };

    const deleteProfilePic = async () => {
        const isConfirm = window.confirm("Are you sure you want to delete your profile picture?");

        if (isConfirm) {
            try {
                await axiosFetch.delete(`api/v1/profile-images/${imageId}`);
                window.location.reload();
            } catch (error) {
                alert("Something went wrong.");
            }
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center gap-8 mb-8">
                <div
                    className={`w-32 h-32 shadow-md rounded-full flex items-center justify-center 
                            hover:cursor-pointer ${imageUrl ?
                        "bg-no-repeat bg-cover bg-center" : "bg-[#D9D9D9] text-gray-800"}`}
                    style={imageUrl ? {backgroundImage: `url("${imageUrl}")`} : {}}
                    onClick={() => setIsFileEditing(true)}
                >
                    {!imageUrl && (
                        <span className="text-4xl font-bold">
                                    {user.userName ? user.userName.split(" ").map((word) =>
                                        word[0]).join("") : null}
                                </span>
                    )}
                </div>
                {isFileEditing && (
                    <FileUploadModal
                        onClose={() => setIsFileEditing(false)}
                        onFileUpload={handleImageUpload}
                        hasImg={imageUrl}
                        onDelete={deleteProfilePic}
                    />
                )}
                <div className="flex-1">
                    {!isEditing ? (
                        <h2 className="text-3xl font-bold text-secondary">{user.userName}</h2>
                    ) : (
                        <input
                            type="text"
                            name="name"
                            value={editedProfile.name}
                            onChange={onChange}
                            className="text-3xl font-bold text-secondary bg-light rounded px-3 py-1 w-full"
                        />
                    )}
                    {!isEditing ? (
                        <p className="text-accent mt-2">{user.gender}</p>
                    ) : (
                        <input
                            type="text"
                            name="occupation"
                            value={editedProfile.occupation}
                            onChange={onChange}
                            className="text-accent mt-2 bg-light rounded px-3 py-1 w-full"
                        />
                    )}
                </div>
            </div>

            <div className="grid gap-6">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-secondary">About</h3>
                    {!isEditing ? (
                        <p className="text-gray-600">{profile.bio}</p>
                    ) : (
                        <textarea
                            name="bio"
                            value={editedProfile.bio}
                            onChange={onChange}
                            className="w-full h-32 bg-light rounded px-3 py-2 text-gray-600"
                        />
                    )}
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-secondary">Contact Information</h3>
                    <div className="grid gap-4">
                        <div className="flex items-center gap-3">
                            <Mail className="text-accent"/>
                            {!isEditing ? (
                                <span>{user.email}</span>
                            ) : (
                                <input
                                    type="email"
                                    name="email"
                                    value={editedProfile.email}
                                    onChange={onChange}
                                    className="bg-light rounded px-3 py-1 flex-1"
                                />
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="text-accent"/>
                            {!isEditing ? (
                                <span>{user.phone}</span>
                            ) : (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editedProfile.phone}
                                    onChange={onChange}
                                    className="bg-light rounded px-3 py-1 flex-1"
                                />
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="text-accent"/>
                            {!isEditing ? (
                                <span>{user.address}</span>
                            ) : (
                                <input
                                    type="text"
                                    name="location"
                                    value={editedProfile.location}
                                    onChange={onChange}
                                    className="bg-light rounded px-3 py-1 flex-1"
                                />
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="text-accent"/>
                            {!isEditing ? (
                                <span>{user.postalCode}</span>
                            ) : (
                                <input
                                    type="text"
                                    name="location"
                                    value={editedProfile.location}
                                    onChange={onChange}
                                    className="bg-light rounded px-3 py-1 flex-1"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}