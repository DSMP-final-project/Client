import { Mail, Phone, MapPin } from 'lucide-react';

export default function ProfileInfo({ profile, isEditing, editedProfile, onChange }) {
    return (
        <div className="p-8">
            <div className="flex items-center gap-8 mb-8">
                <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-accent"
                />
                <div className="flex-1">
                    {!isEditing ? (
                        <h2 className="text-3xl font-bold text-secondary">{profile.name}</h2>
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
                        <p className="text-accent mt-2">{profile.occupation}</p>
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
                            <Mail className="text-accent" />
                            {!isEditing ? (
                                <span>{profile.email}</span>
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
                            <Phone className="text-accent" />
                            {!isEditing ? (
                                <span>{profile.phone}</span>
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
                            <MapPin className="text-accent" />
                            {!isEditing ? (
                                <span>{profile.location}</span>
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