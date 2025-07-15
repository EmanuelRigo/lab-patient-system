import medicalStudiesApi from "@/services/medicalStudies.api";

interface PageProps {
  params: { studyId: string };
}

const Page = async ({ params }: PageProps) => {
  const decodedName = decodeURIComponent(params.studyId); // 👈 importante
  const mStudy = await medicalStudiesApi.getByName(decodedName);
  console.log("🚀 ~ page ~ mStudy:", mStudy);

  console.log("🚀 ~ Page ~ params:", params.studyId);
  return <div>Hola</div>;
};

export default Page;
