import labStaffApi from "@/services/labStaff.api";
import LabStaffCard from "@/components/labstaff/LabStaffCard";

const Page = async ({ params }: { params: Promise<{ lid: string }> }) => {
  const { lid } = await params;
  const labstaff = await labStaffApi.getById(lid);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-sky-800">
        Detalles del Personal de Laboratorio
      </h1>
      {labstaff ? (
        <LabStaffCard staff={labstaff} />
      ) : (
        <p className="text-red-500">
          No se encontró el personal de laboratorio.
        </p>
      )}
    </div>
  );
};

export default Page;
