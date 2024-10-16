// src/components/Modal.js
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-lg">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white bg-red-500 px-2 py-1 rounded"
                >
                    X
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root') // Ensure this element exists in your HTML
    );
};

export default Modal;
