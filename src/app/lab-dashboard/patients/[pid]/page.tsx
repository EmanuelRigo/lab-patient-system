import patientsApi from "@/services/patients.api";
import PatientCard from "@/components/patientsPage/PatientCard";

const Page = async ({ params }: { params: Promise<{ pid: string }> }) => {
  const { pid } = await params;
  const patient = await patientsApi.getById(pid);
  if (!patient) {
    return <div className="text-red-500">Paciente no encontrado.</div>;
  }
  return (
    <PatientCard
      patient={patient}
      onEdit={() => console.log("Editar")}
      onView={() => console.log("Ver")}
    />
  );
};

export default Page;
