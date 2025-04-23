import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"; // Make sure you have @heroicons/react installed

const PopupModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
        <div className="flex items-center space-x-3 mb-4">
          <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
          <h2 className="text-xl font-semibold text-red-600">Alert</h2>
        </div>
        <p className="text-gray-700 text-md">{message}</p>
        <button
          className="mt-6 w-full px-6 py-2 bg-gradient-to-r from-red-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
