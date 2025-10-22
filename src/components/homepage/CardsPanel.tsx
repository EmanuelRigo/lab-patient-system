import React from "react";
import LinkCard from "../LinkCard";
import { FaCalendarPlus, FaUserFriends, FaMoneyCheckAlt } from "react-icons/fa";

const CardsPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto  flex-grow w-full">
      <LinkCard
        Icon={FaCalendarPlus}
        title="Crear Nuevo Turno"
        buttonText="Programar Turno"
        href="/lab-dashboard/doctors-appointment/create-appointment"
      />
      <LinkCard
        Icon={FaUserFriends}
        title="Agregar Paciente"
        buttonText="Ir al Formulario"
        href="/lab-dashboard/patients/add-patient"
      />
      <LinkCard
        Icon={FaMoneyCheckAlt}
        title="Cobros Pendientes"
        buttonText="Ver Cobros"
        href="/cobros"
      />{" "}
      <LinkCard
        Icon={FaCalendarPlus}
        title="Crear Nuevo Turno"
        buttonText="Programar Turno"
        href="/lab-dashboard/doctors-appointment/create-appointment"
      />
      <LinkCard
        Icon={FaUserFriends}
        title="Agregar Paciente"
        buttonText="Ir al Formulario"
        href="/lab-dashboard/patients/add-patient"
      />
      <LinkCard
        Icon={FaMoneyCheckAlt}
        title="Cobros Pendientes"
        buttonText="Ver Cobros"
        href="/cobros"
      />
    </div>
  );
};

export default CardsPanel;
