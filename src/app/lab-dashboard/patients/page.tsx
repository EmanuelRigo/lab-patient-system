import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users } from "lucide-react";

const Page = async () => {
  return (
    <Card className="w-2/3 h-2/3 mx-auto rounded-xl  bg-sky-900/80 text-neutral-100 animate-slide">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-white">
          Pacientes
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Link href="/lab-dashboard/patients/add-patient">
          <Button
            variant="secondary"
            className="w-full flex items-center gap-2 bg-sky-200 text-sky-900 hover:bg-sky-300"
          >
            <PlusCircle className="h-4 w-4" />
            Agregar paciente
          </Button>
        </Link>

        <Link href="/lab-dashboard/patients/patient-list">
          <Button
            variant="secondary"
            className="w-full flex items-center gap-2 bg-sky-200 text-sky-900 hover:bg-sky-300"
          >
            <Users className="h-4 w-4" />
            Ver pacientes
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Page;
