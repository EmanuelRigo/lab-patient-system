import doctorsAppointmentApi from "@/services/doctorsAppointment.api";

interface PageProps {
  params: { did: string };
}

const Page = async ({ params }: PageProps) => {
  const dAppointment = await doctorsAppointmentApi.getById(params.did);

  return (
    <div className="text-black h-full overflow-y-auto p-6">
      <div className="max-w-md mx-auto bg-white border border-gray-300 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sky-800 mb-4">Turno Médico</h2>

        <p className="text-sm text-gray-700">
          <strong>ID del doctor:</strong> {dAppointment.doctorId}
        </p>
        <p className="text-sm text-gray-700">
          <strong>DNI del paciente:</strong> {dAppointment.patientDNI}
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
    </div>
  );
};

export default Page;
