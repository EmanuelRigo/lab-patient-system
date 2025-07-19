import patientsApi from "@/services/patients.api";
import PatientCard from "@/components/patientsPage/PatientCard";

interface PageProps {
  params: { pid: string };
}

const Page = async ({ params }: PageProps) => {
  const patient = await patientsApi.getById(params.pid);
  if (!patient) {
    return <div className="text-red-500">Paciente no encontrado.</div>;
  }
  return <PatientCard patient={patient}></PatientCard>;
};

export default Page;
