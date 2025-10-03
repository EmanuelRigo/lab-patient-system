import { metadata } from "@/app/layout";
import LinkPanel from "@/components/patientsPage/LinkPanel";
const Page = async () => {
  metadata.title = "Talon - Lab Dashboard";
  metadata.description = "Talon page for Lab Dashboard";
  return <LinkPanel />;
};

export default Page;
