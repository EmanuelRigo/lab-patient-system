import patientsApi from "@/services/patients.api";

interface PageProps {
  params: { pid: string };
}

const Page = async ({ params }: PageProps) => {
  const patient = await patientsApi.getById(params.pid);

  return (
    <div className="text-black h-full overflow-y-auto p-6">
      <div className="max-w-md mx-auto bg-white border border-gray-300 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sky-800 mb-4">{patient.name}</h2>

        <p className="text-sm text-gray-700">
          <strong>Edad:</strong> {patient.age}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Email:</strong> {patient.email || "No especificado"}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Teléfono:</strong> {patient.phone}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Dirección:</strong> {patient.address}
        </p>
        <p className="text-sm text-gray-700 mt-2">
          <strong>Creado:</strong>{" "}
          {new Date(patient.createdAt!).toLocaleString()}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Actualizado:</strong>{" "}
          {new Date(patient.updatedAt!).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Page;
