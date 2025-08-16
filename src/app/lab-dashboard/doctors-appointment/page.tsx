import Link from "next/link";
import doctorsAppointmentApi from "@/services/doctorsAppointment.api";
import GenericList from "@/components/generics/GenericList";
import GenericCard from "@/components/generics/GenericCard";
import { DoctorsAppointment } from "../../../../types/doctorsAppointment.types";
import RoleWrapper from "@/components/generics/RoleWrapper";

const Page = async () => {
  const doctorsAppointment = await doctorsAppointmentApi.getAll();

  return (
    <div className="bg-sky-800/80 h-2/3 w-2/3 rounded-s-xl p-4 animate-slide">
      <div className="text-black h-full overflow-y-auto flex flex-col">
        <RoleWrapper allowedRoles={["Receptionist"]}>
          <Link
            href="/lab-dashboard/doctors-appointment/create-appointment"
            className="bg-sky-600 p-2 rounded-lg mb-4 text-white inline-block"
          >
            Crear nueva cita
          </Link>
        </RoleWrapper>

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
    </div>
  );
};

export default Page;
