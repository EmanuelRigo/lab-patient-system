import Link from "next/link";
import React from "react";
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

const Aside = () => {
  const params = usePathname();
  console.log("params", params);

  return (
    <div className="flex-grow flex  justify-between overflow-hidden">
      <aside className=" bg-sky-800 opacity-80 text-white py-3 h-full transition-all duration-300 w-16 hover:w-52 flex flex-col items-start justify-between overflow-hidden">
        <div className="flex flex-col  w-40">
          <Link
            href={"/patients"}
            className={`flex items-center my-1 space-x-2 hover:outline  hover:bg-white ps-5 py-2 w-full rounded-e group ${
              params === "/login" ? "hidden" : ""
            }`}
          >
            <FaUser className="text-2xl me-4 group-hover:text-sky-700" />
            <p className="text-white ps-2   group-hover:text-sky-700">
              Pacientes
            </p>
          </Link>
          <Link
            href={"/locations"}
            className="flex items-center my-1 space-x-2 hover:outline  hover:bg-white ps-5 py-2 w-full rounded-e group"
          >
            <FaClinicMedical className="text-2xl me-4 group-hover:text-sky-700" />
            <p className="text-white ps-2  group-hover:text-sky-700">
              Sucursales
            </p>
          </Link>
          <Link
            href={"/analysis"}
            className="flex items-center my-1 space-x-2 hover:outline  hover:bg-white ps-5 py-2 w-full rounded-e group"
          >
            <FaVials className="text-2xl me-4 group-hover:text-sky-700" />
            <p className="text-white ps-2  group-hover:text-sky-700">
              Análisis
            </p>
          </Link>
        </div>
        <div className="flex flex-col  w-40">
          <Link
            href={"/"}
            className="flex items-center my-1 space-x-2 hover:outline  hover:bg-white ps-5 py-2 w-full rounded-e group"
          >
            <FaArrowLeft className="text-2xl me-4 group-hover:text-sky-700" />
            <p className="text-white ps-2  group-hover:text-sky-700">Volver</p>
          </Link>
          <div
            className={`flex items-center my-1 space-x-2 hover:outline  hover:bg-white ps-5 py-2 w-full rounded-e group ${
              params === "/login" ? "hidden" : ""
            }`}
          >
            <FaSignOutAlt className="text-2xl me-4 group-hover:text-sky-700" />
            <p className="text-white ps-2  group-hover:text-sky-700">Logout</p>
          </div>
        </div>
      </aside>
      {/* <Locations /> */}
      {/* <PatientsInfo /> */}
      <AnalysisInfo />
    </div>
  );
};

export default Aside;
