import React from "react";
import resultApi from "@/services/result.api";
import CardResult from "@/components/results/CardResult";

interface PageProps {
  params: { rid: string };
}

const Page = async ({ params }: PageProps) => {
  const result = await resultApi.getById(params.rid);

  if (!result) {
    return <div className="text-red-500">Resultado no encontrado</div>;
  }

  return (
    <div className="text-black h-full overflow-y-auto p-6">
      <CardResult result={result} />
    </div>
  );
};

export default Page;
