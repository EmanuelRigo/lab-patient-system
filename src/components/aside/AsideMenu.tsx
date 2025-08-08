"use client";

import React from "react";
import { FaUser, FaClinicMedical, FaVials } from "react-icons/fa";
import { Role } from "../../../types/frontend.types";

type Props = {
  selectedView: string;
  setSelectedView: (view: string) => void;
  isLoginPath: boolean;
  role: Role;
};

const AsideMenu = ({ setSelectedView, isLoginPath, role }: Props) => {
  return (
    <div className="flex flex-col w-40">
      {/* Pacientes: visible para todos */}
      <button
        onClick={() => setSelectedView("patients")}
        className={`flex items-center my-1 space-x-2 hover:outline hover:bg-white ps-5 py-2 w-full rounded-e group ${
          isLoginPath ? "hidden" : ""
        }`}
      >
        <FaUser className="text-2xl me-4 group-hover:text-sky-700" />
        <p className="text-white ps-2 group-hover:text-sky-700">Pacientesss</p>
      </button>

      {/* Sucursales: solo para Admin */}
      {role === "Admin" && (
        <button
          onClick={() => setSelectedView("locations")}
          className="flex items-center my-1 space-x-2 hover:outline hover:bg-white ps-5 py-2 w-full rounded-e group"
        >
          <FaClinicMedical className="text-2xl me-4 group-hover:text-sky-700" />
          <p className="text-white ps-2 group-hover:text-sky-700">Sucursales</p>
        </button>
      )}

      {/* Análisis: Admin y LabTechnician */}
      {(role === "Admin" || role === "LabTechnician") && (
        <button
          onClick={() => setSelectedView("analysis")}
          className="flex items-center my-1 space-x-2 hover:outline hover:bg-white ps-5 py-2 w-full rounded-e group"
        >
          <FaVials className="text-2xl me-4 group-hover:text-sky-700" />
          <p className="text-white ps-2 group-hover:text-sky-700">Análisis</p>
        </button>
      )}
    </div>
  );
};

export default AsideMenu;
