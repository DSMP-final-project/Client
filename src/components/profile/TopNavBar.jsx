import { Home, Trash2 } from 'lucide-react';

export default function TopNavBar({ onHome, onDelete }) {
    return (
        <div className="bg-secondary p-4 text-white flex justify-between items-center">
            <button
                onClick={onHome}
                className="flex items-center gap-2 hover:text-light transition-colors"
            >
                <Home size={20} />
                <span>Home</span>
            </button>
            <h1 className="text-2xl font-bold">Profile</h1>
            <button
                onClick={onDelete}
                className="flex items-center gap-2 text-warning hover:text-light transition-colors"
            >
                <Trash2 size={20} />
                <span>Delete</span>
            </button>
        </div>
    );
}