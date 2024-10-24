import React, { useState } from 'react';

const EditProjectForm = ({ project, onSave, onClose }) => {
    const [formData, setFormData] = useState(project);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
            {['title', 'description', 'liveLink', 'gitHubLink', 'image'].map((field) => (
                <input
                    key={field}
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                    className="w-full border p-2 mb-4"
                />
            ))}
            <button onClick={handleSubmit} className="bg-green-500 text-white py-2 px-4 rounded-md mr-4">
                Save
            </button>
            <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded-md">
                Cancel
            </button>
        </div>
    );
};

export default EditProjectForm;
