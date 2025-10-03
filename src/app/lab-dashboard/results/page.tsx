import { metadata } from "@/app/layout";
import LinkPanel from "@/components/patientsPage/LinkPanel";
const Page = async () => {
  metadata.title = "Results - Lab Dashboard";
  metadata.description = "Results page for Lab Dashboard";
  return <LinkPanel />;
};

export default Page;
