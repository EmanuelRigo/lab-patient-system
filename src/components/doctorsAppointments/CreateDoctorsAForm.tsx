"use client";

import { useState, useCallback, useEffect } from "react";
import GenericSearchInput from "../generics/GenericSearchInput";
import { Patient } from "../../../types/patient.types";
import doctorsAppointmentApi from "@/services/doctorsAppointment.api";
import medicalStudiesApi from "@/services/medicalStudies.api";
import { MedicalStudy } from "../../../types/medicalStudy.types";

interface CreateDoctorsAFormProps {
  onCreated?: (appointment: any) => void;
}

interface DoctorsAppointmentFormData {
  patientId: string;
  medicalStudyId: string;
  date: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
}

const CreateDoctorsAForm = ({ onCreated }: CreateDoctorsAFormProps) => {
  const [form, setForm] = useState<DoctorsAppointmentFormData>({
    patientId: "",
    medicalStudyId: "",
    date: "",
    reason: "",
    status: "scheduled",
  });

  const [patient, setPatient] = useState<Patient>();
  const [medicalStudies, setMedicalStudies] = useState<MedicalStudy[]>([]);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await medicalStudiesApi.getAll();
        setMedicalStudies(response);
      } catch (error) {
        console.error("Error al cargar estudios médicos:", error);
      }
    };

    fetchStudies();
  }, []);

  const fetchPatients = useCallback(
    async (query: string): Promise<Patient[]> => {
      const url = `http://localhost:8080/api/patient/search?firstName=${encodeURIComponent(
        query
      )}`;
      const res = await fetch(url);

      if (!res.ok) {
        console.error("Error al obtener pacientes:", res.statusText);
        return [];
      }

      const data = await res.json();
      return data.response || [];
    },
    []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await doctorsAppointmentApi.create(form);
      if (onCreated) onCreated(created);
      // reset form si querés
      setForm({
        patientId: "",
        medicalStudyId: "",
        date: "",
        reason: "",
        status: "scheduled",
      });
      setPatient(undefined);
    } catch (err) {
      console.error("Error al crear el turno", err);
    }
  };

  console.log("🚀 ~ CreateDoctorsAForm ~ medicalStudies:", medicalStudies);
  return (
    <div className="p-6 bg-white rounded shadow space-y-4 max-w-md mx-auto">
      <GenericSearchInput<Patient>
        onSearch={fetchPatients}
        onSelect={(patient: Patient) => {
          setPatient(patient);
          setForm((prev) => ({
            ...prev,
            patientId: patient._id,
          }));
        }}
        renderItem={(patient: Patient) => (
          <span>
            {patient.dni} - {patient.firstName} {patient.lastName}
          </span>
        )}
        placeholder="Buscar paciente..."
      />

      {patient && (
        <div className="bg-gray-50 border rounded p-3 text-sm text-gray-700">
          <p>
            <strong>DNI:</strong> {patient.dni}
          </p>
          <p>
            <strong>Nombre:</strong> {patient.firstName}
          </p>
          <p>
            <strong>Apellido:</strong> {patient.lastName}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ Select dinámico */}
        <div>
          <label className="block font-semibold mb-1">Estudio médico:</label>
          <select
            name="medicalStudyId"
            value={form.medicalStudyId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Selecciona un estudio</option>
            {Array.isArray(medicalStudies) &&
              medicalStudies.map((study) => (
                <option key={study._id} value={study._id}>
                  {study.name} ({study.duration} min)
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Fecha y hora:</label>
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Motivo:</label>
          <input
            type="text"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Estado:</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="scheduled">Programada</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Crear cita
        </button>
      </form>
    </div>
  );
};

export default CreateDoctorsAForm;
