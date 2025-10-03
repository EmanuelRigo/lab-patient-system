import { metadata } from "@/app/layout";
import LinkPanel from "@/components/patientsPage/LinkPanel";

const Page = async () => {
  metadata.title = "Citas - Lab Dashboard";
  metadata.description = "Doctors Appointments page for Lab Dashboard";
  return <LinkPanel />;
};

export default Page;
