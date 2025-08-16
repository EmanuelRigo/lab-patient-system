import Link from "next/link";
import labStaffApi from "@/services/labStaff.api";
import GenericList from "@/components/generics/GenericList";
import GenericCard from "@/components/generics/GenericCard";
import { LabStaff } from "../../../types/labStaff.types";
const Page = async () => {
  const labStaff = await labStaffApi.getAll();

  return (
    <div className="bg-sky-800/80 h-2/3 w-2/3 rounded-s-xl p-4 animate-slide">
      <div className="text-black h-full overflow-y-auto flex flex-col">
        <Link
          href="/labstaff/add-staff"
          className="bg-sky-600 p-2 rounded-lg mb-4 text-white inline-block"
        >
          Agregar personal
        </Link>

        <GenericList<LabStaff>
          items={labStaff}
          getKey={(p) => p._id!}
          emptyMessage="No hay pacientes registrados."
          className="scrollbar-hidden overflow-y-auto"
          Card={({ data }) => (
            <GenericCard
              item={data}
              title="firstName"
              id="_id"
              fields={["role", "username"]}
              basePath="labstaff/"
            />
          )}
        />
      </div>
    </div>
  );
};

export default Page;
