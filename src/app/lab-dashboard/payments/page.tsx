import { metadata } from "@/app/layout";
import LinkPanel from "@/components/patientsPage/LinkPanel";
const Page = async () => {
  metadata.title = "Payments - Lab Dashboard";
  metadata.description = "Payments page for Lab Dashboard";
  return <LinkPanel />;
};

export default Page;
