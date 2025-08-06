"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface EditableField {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea";
}

interface ModalEditGenericProps<T> {
  initialData: T;
  editableFields: EditableField[];
  onClose: () => void;
  onUpdate: (updatedFields: Partial<T>) => void;
}

function ModalEditGeneric<T extends Record<string, unknown>>({
  initialData,
  editableFields,
  onClose,
  onUpdate,
}: ModalEditGenericProps<T>) {
  const [formData, setFormData] = useState<T>(initialData);
  const [modifiedFields, setModifiedFields] = useState<Partial<T>>({});

  useEffect(() => {
    setFormData(initialData);
    setModifiedFields({});
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name in initialData && initialData[name as keyof T] !== value) {
      setModifiedFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const updated = { ...modifiedFields };
      delete updated[name as keyof T];
      setModifiedFields(updated);
    }
  };

  const handleSubmit = (e: FormEvent) => {
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
                  value={formData[name as keyof T] as string}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name as keyof T] as string}
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
}

export default ModalEditGeneric;
