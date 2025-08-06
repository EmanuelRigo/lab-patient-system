import resultApi from "@/services/result.api";
import CardResult from "@/components/results/CardResult";

const Page = async ({ params }: { params: Promise<{ rid: string }> }) => {
  const { rid } = await params;
  const result = await resultApi.getById(rid);

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
