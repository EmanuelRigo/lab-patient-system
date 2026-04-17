"use client";

import { Calendar, ClipboardList, User, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddTalonButton from "./AddTalonButton";

import patientApi from "@/services/patients.api";
import doctorsAppointmentApi from "@/services/doctorsAppointment.api";
import { Patient } from "../../../types/patient.types";
import TalonForm from "../talon/TalonForm";

import { useEffect, useState, useReducer, useLayoutEffect } from "react";
import { useLabSystemContext } from "@/context/LabContext";

/* ----------------------------------------------
   🔧 Initial State & Reducer
------------------------------------------------*/
const initialState = {
  talonId: "",
  patientId: "",
  receptionistId: "",
  date: "",
  reason: "",
};

function getCookie(name: string) {
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="));
  return cookie?.split("=")[1];
}

function turnoReducer(state: any, action: any) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

/* ----------------------------------------------
🧩 Main Component
------------------------------------------------*/
export default function TurnoForm() {
  const [turnoData, dispatch] = useReducer(turnoReducer, initialState);
  useEffect(() => {
    console.log("🚀 ~ TurnoForm ~ initialState:", turnoData);
  }, [turnoData]);
  const [talonId, setTalonId] = useState<string | null>(null);
  const [creatingAppointment, setCreatingAppointment] = useState(false);
  const [appointmentCreated, setAppointmentCreated] = useState(false);

  const { userLabData, setUserLabData } = useLabSystemContext();

  const [patientText, setPatientText] = useState("");
  const [results, setResults] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  /* ----------------------------------------------
      👤 Load User on Mount
  ------------------------------------------------*/
  useLayoutEffect(() => {
    const token = getCookie("infoUserToken");
    if (!token) return;

    const decoded = JSON.parse(atob(token.split(".")[1]));
    setUserLabData(decoded);

    dispatch({
      type: "SET_FIELD",
      field: "receptionistId",
      value: decoded._id,
    });

    if (talonId) {
      dispatch({
        type: "SET_FIELD",
        field: "talonId",
        value: talonId,
      });
    }
  }, [talonId]);

  /* ----------------------------------------------
      🔍 Patient Search (Debounce)
  ------------------------------------------------*/
  useEffect(() => {
    if (patientText.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await patientApi.getByNameLastName(patientText);
        setResults(res);
      } catch (err) {
        console.error("Error buscando pacientes:", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [patientText]);

  /* ----------------------------------------------
      ✔ Select Patient
  ------------------------------------------------*/
  const handleSelectPatient = (p: Patient) => {
    dispatch({ type: "SET_FIELD", field: "patientId", value: p._id });
    setPatientText(`${p.firstname} ${p.lastname}`);
    setResults([]);
  };

  const formDisabled = !talonId;

  /* ----------------------------------------------
      🎨 UI
  ------------------------------------------------*/
  return (
    <div className="h-full relative flex flex-col items-center mx-auto overflow-hidden rounded-4xl">
      {/* 🔘 Crear Talón */}
      <div className="w-full flex justify-center mt-4">
        <AddTalonButton
          onSuccess={setTalonId}
          receptionistId={userLabData?._id}
        />
      </div>

      {/* 🧾 Encabezado */}
      <header className="pt-12 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-700/80">
          Crear Nuevo Turno Médico
        </h1>
      </header>

      {/* 📄 Contenido */}
      <div className="w-full flex gap-10 justify-center">
        {/* 📝 Formulario */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setCreatingAppointment(true);
              // send the current turnoData to the API
              const created = await doctorsAppointmentApi.create(turnoData);
              console.log("Turno creado:", created);
              setAppointmentCreated(true);
              // optionally set talonId if backend returns a talonId
              if (created.talonId) {
                setTalonId(created.talonId);
              }
            } catch (err) {
              console.error("Error creando turno:", err);
              setAppointmentCreated(false);
              alert(
                "No se pudo crear el turno. Revisa los datos e intenta nuevamente."
              );
            } finally {
              setCreatingAppointment(false);
            }
          }}
          className={`w-4/6 bg-white rounded-2xl shadow-xl border p-10 flex flex-col gap-10 transition-all ${
            formDisabled ? "opacity-40 pointer-events-none" : ""
          }`}
        >
          {/* 👤 Paciente */}
          <div className="relative">
            <Label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
              <User className="w-4 h-4 text-sky-600" /> Paciente
            </Label>

            <Input
              placeholder="Buscar paciente..."
              className="rounded-lg"
              value={patientText}
              onChange={(e) => setPatientText(e.target.value)}
            />

            {/* Dropdown resultados */}
            {results.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                {results.map((p) => (
                  <div
                    key={p._id}
                    className="p-3 hover:bg-sky-100 cursor-pointer"
                    onClick={() => handleSelectPatient(p)}
                  >
                    {p.firstname} {p.secondname} {p.lastname} — {p.dni}
                  </div>
                ))}
              </div>
            )}

            {loading && (
              <p className="absolute top-full mt-1 w-full text-sm text-center text-gray-500">
                Buscando...
              </p>
            )}
          </div>

          {/* 📅 Fecha */}
          <div>
            <Label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
              <Calendar className="w-4 h-4 text-sky-600" />
              Fecha y Hora
            </Label>
            <Input
              type="datetime-local"
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "date",
                  value: e.target.value,
                })
              }
            />
          </div>

          {/* 🖊 Motivo */}
          <div>
            <Label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
              <FileText className="w-4 h-4 text-sky-600" />
              Motivo del Turno
            </Label>
            <Input
              placeholder="Motivo del turno..."
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "reason",
                  value: e.target.value,
                })
              }
            />
          </div>

          {/* Botón Final */}
          <Button
            type="submit"
            className="py-6 text-lg rounded-lg bg-sky-900 hover:bg-sky-700 text-white flex items-center justify-center gap-3"
          >
            <ClipboardList className="w-6 h-6" />
            Crear Turno
          </Button>
        </form>

        {/* 📘 Talón */}
        <TalonForm enabled={appointmentCreated} />
      </div>
    </div>
  );
}
