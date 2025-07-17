"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaClinicMedical,
  FaVials,
  FaArrowLeft,
  FaSignOutAlt,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import Locations from "@/components/Locations";
import PatientsInfo from "./PatientsInfo";
import AnalysisInfo from "./AnalysisInfo";

import AsideMenu from "./aside/AsideMenu";

import sessionApi from "@/services/session.api";

import { useLabSystemContext } from "@/context/LabContext";

import { useRouter } from "next/navigation";

const Aside = () => {
  const router = useRouter();

  function logOut() {
    sessionApi.logout().then(() => {
      console.log("Logged out successfully");
      router.push("/login");
    });
  }

  const { role } = useLabSystemContext();
  console.log("🚀 ~ role - -- aside:", role);
  const pathname = usePathname();

  const [selectedView, setSelectedView] = useState("patients");

  return (
    <div className="flex-grow flex justify-between overflow-hidden relative w-full">
      <aside className="bg-sky-800 opacity-80 text-white py-3 h-full transition-all duration-300 w-16 hover:w-52 flex flex-col items-start justify-between overflow-hidden z-20">
        <AsideMenu
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          isLoginPath={pathname === "/login"}
          role={role}
        />

        <div className="flex flex-col w-40">
          <button
            onClick={() => setSelectedView("home")}
            className="flex items-center my-1 space-x-2 hover:outline hover:bg-white ps-5 py-2 w-full rounded-e group"
          >
            <FaArrowLeft className="text-2xl me-4 group-hover:text-sky-700" />
            <p className="text-white ps-2 group-hover:text-sky-700">Volver</p>
          </button>

          <button
            onClick={() => logOut()}
            className={`flex items-center my-1 space-x-2 hover:outline hover:bg-white ps-5 py-2 w-full rounded-e group ${
              pathname === "/login" ? "hidden" : ""
            }`}
          >
            <FaSignOutAlt className="text-2xl me-4 group-hover:text-sky-700" />
            <p className="text-white ps-2 group-hover:text-sky-700">Logout</p>
          </button>
        </div>
      </aside>

      <div className="flex-grow justify-end flex absolute w-full items-center h-full  z-10">
        {selectedView === "patients" && <PatientsInfo />}
        {selectedView === "locations" && <Locations />}
        {selectedView === "analysis" && <AnalysisInfo />}
        {selectedView === "home" && (
          <div className="p-8 text-center text-xl text-gray-700">
            Selecciona una opción
          </div>
        )}
      </div>
    </div>
  );
};

export default Aside;
