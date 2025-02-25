import { useState } from 'react';
import TopNavBar from "./TopNavBar.jsx";
import EditControls from "./EditControls.jsx";
import ProfileInfo from "./ProfileInfo.jsx";
import DeleteModal from "./DeleteModel.jsx";
import {useNavigate} from "react-router-dom";

function Profile() {
    const navigate=useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [profile, setProfile] = useState({
        firstName: "Sarah Anderson",
        lastName: "Sarah Anderson",
        userName: "Sarah Anderson",
        email: "sarah.anderson@example.com",
        phone: "+1 (555) 123-4567",
        address: "San Francisco, CA",
        postalCode: "Senior Product Designer"
    });

    const [editedProfile, setEditedProfile] = useState(profile);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedProfile(profile);
    };

    const handleSave = () => {
        setProfile(editedProfile);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedProfile(profile);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        alert("Profile deleted successfully!");
        setProfile({
            name: "",
            email: "",
            phone: "",
            location: "",
            occupation: "",
            bio: ""
        });
        setShowDeleteConfirm(false);
    };

    const handleHome = () => {
       navigate("/");
    };

    return (
        <div className="min-h-screen bg-primary p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
                <TopNavBar onHome={handleHome} onDelete={handleDelete} />
                <EditControls
                    isEditing={isEditing}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
                <ProfileInfo
                    profile={profile}
                    isEditing={isEditing}
                    editedProfile={editedProfile}
                    onChange={handleChange}
                />
                {showDeleteConfirm && (
                    <DeleteModal
                        onClose={() => setShowDeleteConfirm(false)}
                        onConfirm={confirmDelete}
                    />
                )}
            </div>
        </div>
    );
}

export default Profile;