import React from "react";

type AlertModalProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
};

const AlertModal: React.FC<AlertModalProps> = ({
  message,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-lg font-semibold text-red-600 mb-4">Error</h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
