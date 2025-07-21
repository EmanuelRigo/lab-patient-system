import doctorsAppointmentApi from "@/services/doctorsAppointment.api";
import Link from "next/link";

interface PageProps {
  params: { did: string };
}

const Page = async ({ params }: PageProps) => {
  const dAppointment = await doctorsAppointmentApi.getById(params.did);

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
      <div className="max-w-md mx-auto bg-white border border-gray-300 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sky-800 mb-4">Turno Médico</h2>

        <p className="text-sm text-gray-700">
          <strong>ID del paciente:</strong> {dAppointment.patientId}
        </p>

        <p className="text-sm text-gray-700">
          <strong>Fecha del turno:</strong>{" "}
          {new Date(dAppointment.date).toLocaleString()}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Motivo:</strong> {dAppointment.reason}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Estado:</strong> {dAppointment.status}
        </p>

        <p className="text-sm text-gray-700 mt-2">
          <strong>Creado:</strong>{" "}
          {new Date(dAppointment.createdAt!).toLocaleString()}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Actualizado:</strong>{" "}
          {new Date(dAppointment.updatedAt!).toLocaleString()}
        </p>
      </div>
      <Link
        href="/lab-dashboard/doctors-appointment/edit"
        className="mt-4 inline-block bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
      >
        Editar
      </Link>
    </div>
  );
};
export default Page;
