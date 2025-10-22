import React from "react";
import Link from "next/link";
// En tu entorno real, necesitarías:
// import Link from "next/link";
// Y el componente Link tendría que estar definido o importado.

// 1. Definición de la interfaz de propiedades (Props)
interface LinkCardProps {
  Icon: React.ElementType; // Tipo para componentes como los íconos de Lucide
  title: string;
  description?: string;
  buttonText: string;
  href: string;
}

// 2. Aplicación de la interfaz al componente
const LinkCard: React.FC<LinkCardProps> = ({
  Icon,
  title,
  description,
  buttonText,
  href,
}) => {
  // Asegura que CardIcon sea siempre un componente válido
  const CardIcon = Icon || (() => <div className="w-8 h-8" />);

  return (
    <div className="flex flex-col p-4 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-sky-100">
      {/* Contenedor del Ícono */}
      <div className="flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-2 mx-auto">
        <CardIcon className="w-8 h-8 text-sky-600" />
      </div>

      {/* Contenido de Texto */}
      <h3 className="text-lg font-bold text-gray-800 text-center pb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 text-center flex-grow">
        {description}
      </p>

      {/* Botón de Navegación con next/link */}
      <Link
        href={href}
        className="w-full py-2 text-center rounded-lg bg-sky-900/80 hover:bg-sky-600 text-white font-semibold transition-colors shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default LinkCard;
