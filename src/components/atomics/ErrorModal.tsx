"use client";

import React from "react";

type ErrorModalProps = {
  message: string;
  onClose: () => void;
};

const ErrorModal = ({ message, onClose }: ErrorModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo transparente con overlay oscuro */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Modal opaco */}
      <div className="relative bg-white rounded-lg p-6 shadow-md max-w-sm w-full text-center space-y-4">
        <h2 className="text-lg font-semibold text-red-600">¡Error!</h2>
        <p className="text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
