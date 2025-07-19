"use client";
import { useState, useEffect } from "react";

interface EditableField {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea";
}

interface ModalEditGenericProps {
  initialData: Record<string, any>;
  editableFields: EditableField[];
  onClose: () => void;
  onUpdate: (updatedFields: Record<string, any>) => void;
}

const ModalEditGeneric = ({
  initialData,
  editableFields,
  onClose,
  onUpdate,
}: ModalEditGenericProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [modifiedFields, setModifiedFields] = useState<Record<string, any>>({});

  useEffect(() => {
    setFormData(initialData);
    setModifiedFields({});
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value !== initialData[name]) {
      setModifiedFields((prev) => ({ ...prev, [name]: value }));
    } else {
      const updated = { ...modifiedFields };
      delete updated[name];
      setModifiedFields(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(modifiedFields).length > 0) {
      onUpdate(modifiedFields);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative bg-white rounded-lg p-6 shadow-md max-w-xl w-full text-center space-y-4">
        <h2 className="text-2xl font-bold text-sky-800 mb-4">Editar</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {editableFields.map(({ name, label, type = "text" }) => (
            <div key={name}>
              <label className="block text-gray-700 font-semibold mb-1">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditGeneric;
