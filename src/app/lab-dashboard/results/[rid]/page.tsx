import React from "react";
import resultApi from "@/services/result.api";

interface PageProps {
  params: { rid: string };
}

const Page = async ({ params }: PageProps) => {
  const result = await resultApi.getById(params.rid);

  return (
    <div className="text-black h-full overflow-y-auto p-6">
      <div className="max-w-md mx-auto bg-white border border-gray-300 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sky-800 mb-4">
          {result.IdLabTechnician}
        </h2>

        <p className="text-sm text-gray-700">
          <strong>estatus:</strong> {result.status}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Dia de extraccion:</strong>{" "}
          {result.extractionDate
            ? new Date(result.extractionDate).toDateString()
            : "No especificada"}
        </p>

        <p className="text-sm text-gray-700">
          <strong>Hora de extraccion:</strong>{" "}
          {result.extractionTime ? result.extractionTime : "No especificada"}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Bioquimico:</strong> {result.IdBiochemist || "No asignado"}
        </p>
      </div>
    </div>
  );
};

export default Page;
