import { Edit3, Save, X } from 'lucide-react';

export default function EditControls({ isEditing, onEdit, onSave, onCancel }) {
    return (
        <div className="bg-secondary border-t border-accent/20 p-4 flex justify-end">
            {!isEditing ? (
                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 bg-accent hover:bg-opacity-90 px-4 py-2 rounded-lg transition-colors text-white"
                >
                    <Edit3 size={18} />
                    Edit Profile
                </button>
            ) : (
                <div className="flex gap-2">
                    <button
                        onClick={onSave}
                        className="flex items-center gap-2 bg-accent hover:bg-opacity-90 px-4 py-2 rounded-lg transition-colors text-white"
                    >
                        <Save size={18} />
                        Save
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex items-center gap-2 bg-warning hover:bg-opacity-90 px-4 py-2 rounded-lg transition-colors text-white"
                    >
                        <X size={18} />
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}