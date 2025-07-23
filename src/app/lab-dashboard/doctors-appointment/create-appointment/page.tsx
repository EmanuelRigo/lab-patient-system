"use client";
import { useState } from "react";
import CreateDoctorsAForm from "@/components/doctorsAppointments/CreateDoctorsAForm";
import { DoctorsAppointment } from "../../../../../types/doctorsAppointment.types";
import CreatedAppointmentsList from "@/components/doctorsAppointments/CreatedAppointmentsList";

const Page = () => {
  const [appointments, setAppointments] = useState<DoctorsAppointment[]>([]);
  const [checkedAppointments, setCheckedAppointments] = useState<string[]>([]);

  const handleAddAppointment = (appointment: DoctorsAppointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const toggleChecked = (id: string) => {
    setCheckedAppointments((prev) =>
      prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 space-y-8">
      <CreateDoctorsAForm onCreated={handleAddAppointment} />

      <CreatedAppointmentsList
        appointments={appointments}
        checkedAppointments={checkedAppointments}
        toggleChecked={toggleChecked}
      />
    </div>
  );
};

export default Page;
