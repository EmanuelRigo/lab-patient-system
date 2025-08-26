import labStaffApi from "@/services/labStaff.api";
import LabStaffCard from "@/components/labstaff/LabStaffCard";

const Page = async ({ params }: { params: Promise<{ lid: string }> }) => {
  const { lid } = await params;
  const labstaff = await labStaffApi.getById(lid);

  return (
    <>
      {labstaff ? (
        <LabStaffCard staff={labstaff} />
      ) : (
        <p className="text-red-500">
          No se encontró el personal de laboratorio.
        </p>
      )}
    </>
  );
};

export default Page;
