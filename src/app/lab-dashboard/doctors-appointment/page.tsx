import Link from "next/link";
import doctorsAppointmentApi from "@/services/doctorsAppointment.api";
import GenericList from "@/components/generics/GenericList";
import GenericCard from "@/components/generics/GenericCard";
import { DoctorsAppointment } from "../../../../types/doctorsAppointment.types";

const Page = async () => {
  const doctorsAppointment = await doctorsAppointmentApi.getAll();

  return (
    <div className="text-black h-full overflow-y-auto flex flex-col">
      <Link
        href="/lab-dashboard/patients/add-patient"
        className="bg-sky-600 p-2 rounded-lg mb-4 text-white inline-block"
      >
        Agregar paciente
      </Link>

      <GenericList<DoctorsAppointment>
        items={doctorsAppointment}
        getKey={(p) => p._id!}
        emptyMessage="No hay pacientes registrados."
        className="scrollbar-hidden overflow-y-auto"
        Card={({ data }) => (
          <GenericCard
            item={data}
            title="reason"
            id="_id"
            fields={["status", "date"]}
            basePath="lab-dashboard/doctors-appointment/"
          />
        )}
      />
    </div>
  );
};

export default Page;
