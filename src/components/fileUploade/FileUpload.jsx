import { useState } from "react";

const FileUploadModal = ({ onClose, onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            onFileUpload(selectedFile);
            setSelectedFile(null);
            onClose();
        } else {
            alert("Please select a file to upload.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-primary p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-white mb-4">Upload Image</h2>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-accent file:text-white hover:file:bg-opacity-90"
                />
                {selectedFile && (
                    <p className="text-white mt-2 text-sm">Selected File: {selectedFile.name}</p>
                )}
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleUpload}
                        className="px-4 py-2 bg-accent text-white rounded hover:bg-opacity-90 transition-colors"
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUploadModal;
