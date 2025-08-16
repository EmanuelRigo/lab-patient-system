import React from "react";
import GenericList from "@/components/generics/GenericList";
import GenericCard from "@/components/generics/GenericCard";
import talonApi from "@/services/talon.api";
import { Talon } from "../../../../types/talon.types";

const Page = async () => {
  const talons = await talonApi.getAll();

  return (
    <div className="bg-sky-800/80 h-2/3 w-2/3 rounded-s-xl p-4 animate-slide">
      <div className="text-black h-full overflow-y-auto flex flex-col">
        <GenericList<Talon>
          items={talons}
          getKey={(p) => p._id!}
          emptyMessage="No hay talones registrados."
          className="scrollbar-hidden overflow-y-auto"
          Card={({ data }) => (
            <GenericCard
              item={data}
              title="_id"
              id="_id"
              fields={["createdAt"]}
              basePath="lab-dashboard/talon/"
            />
          )}
        />
      </div>
    </div>
  );
};

export default Page;
