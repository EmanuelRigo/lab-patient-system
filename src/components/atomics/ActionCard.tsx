// components/ActionCard.tsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react"; // Importa LucideIcon para tipar el icono

interface ActionCardProps {
  icon: LucideIcon; // El componente de icono de Lucide (ej. PlusCircle, Users)
  title: string;
  description: string;
  href: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  icon: Icon, // Renombramos 'icon' a 'Icon' para usarlo como componente JSX
  title,
  description,
  href,
}) => {
  return (
    <Link href={href} passHref>
      <Card className="flex flex-col items-center justify-center p-6 bg-sky-100 text-sky-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer h-full w-full">
        <CardHeader className="p-0 mb-3 flex justify-center items-center flex-col w-full">
          {/* Contenedor del icono con el círculo celeste */}
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-sky-300/70 mb-3">
            <Icon className="h-10 w-10 text-sky-50" />{" "}
            {/* Usamos 'Icon' aquí */}
          </div>
          <CardTitle className="text-xl font-bold text-center w-full">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-center text-gray-600">
          <p className="text-sm">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ActionCard;
