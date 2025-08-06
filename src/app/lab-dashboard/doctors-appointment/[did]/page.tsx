import doctorsAppointmentApi from "@/services/doctorsAppointment.api";
import DoctorAppointmentCard from "@/components/doctorsAppointments/DoctorAppointmentCard";

const Page = async ({ params }: { params: Promise<{ did: string }> }) => {
  const { did } = await params;
  const dAppointment = await doctorsAppointmentApi.getById(did);

  if (!dAppointment) {
    return (
      <div className="text-center text-gray-700 p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Turno no encontrado
        </h2>
        <p>Verificá el ID del turno o intentá nuevamente más tarde.</p>
      </div>
    );
  }

  return (
    <div className="text-black h-full overflow-y-auto p-6">
      <DoctorAppointmentCard appointment={dAppointment} />
    </div>
  );
};

export default Page;
