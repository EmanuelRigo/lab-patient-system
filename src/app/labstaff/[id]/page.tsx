import { getById } from "@/services/labStaff.api";
import { LabStaff } from "../../../../types/labStaff.types";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const labstaff: LabStaff = await getById(params.id);

  return (
    <div className="text-black p-6 space-y-2">
      <h1 className="text-2xl font-bold text-sky-700">Detalle del Personal</h1>
      <p>
        <strong>Nombre:</strong> {labstaff.firstName} {labstaff.lastName}
      </p>
      <p>
        <strong>Usuario:</strong> {labstaff.username}
      </p>
      <p>
        <strong>Email:</strong> {labstaff.email}
      </p>
      <p>
        <strong>Teléfono:</strong> {labstaff.phone}
      </p>
      <p>
        <strong>Rol:</strong> {labstaff.role}
      </p>
      <p>
        <strong>Estado:</strong> {labstaff.isOnline ? "Online" : "Offline"}
      </p>
    </div>
  );
};

export default Page;
