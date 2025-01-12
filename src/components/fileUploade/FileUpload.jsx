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
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Image</h2>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
                {selectedFile && (
                    <p className="text-gray-600 mt-2 text-sm">Selected File: {selectedFile.name}</p>
                )}
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleUpload}
                        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUploadModal;
