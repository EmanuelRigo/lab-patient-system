import labStaffApi from "@/services/labStaff.api";
import { LabStaff } from "../../../../types/labStaff.types";
import LabStaffCard from "@/components/labstaff/LabStaffCard";

interface PageProps {
  params: { lid: string };
}

const Page = async ({ params }: PageProps) => {
  const labstaff: LabStaff = await labStaffApi.getById(params.lid);

  return (
    <div className="p-6 text-black">
      <LabStaffCard staff={labstaff}></LabStaffCard>
    </div>
  );
};

export default Page;
