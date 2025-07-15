import Link from "next/link";
import { getAllDoctorsAppointment } from "@/services/doctorsAppointment.api";
import GenericList from "@/components/generics/GenericList";
import GenericCard from "@/components/generics/GenericCard";
import { DoctorsAppointment } from "../../../types/doctorsAppointment.types";

const Page = async () => {
  const doctorsAppointments = await getAllDoctorsAppointment();

  return (
    <div className="text-black h-full overflow-y-auto flex flex-col">
      <Link
        href="/lab-dashboard/patients/add-patient"
        className="bg-sky-600 p-2 rounded-lg mb-4 text-white inline-block"
      >
        Agregar paciente
      </Link>

      <GenericList<DoctorsAppointment>
        items={doctorsAppointments}
        getKey={(p) => p._id!}
        emptyMessage="No hay pacientes registrados."
        className="scrollbar-hidden overflow-y-auto"
        Card={({ data }) => (
          <GenericCard item={data} title="firstName" fields={["role"]} />
        )}
      />
    </div>
  );
};

export default Page;
