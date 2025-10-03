import { metadata } from "@/app/layout";
import LinkPanel from "@/components/patientsPage/LinkPanel";
const Page = async () => {
  metadata.title = "Patients - Lab Dashboard";
  metadata.description = "Patients page for Lab Dashboard";
  return <LinkPanel />;
};

export default Page;
