"use client";
import { useLabSystemContext } from "@/context/LabContext";

type toasProps = {
  message: string;
  color?: "green" | "red" | "blue" | "yellow";
  visible: boolean;
};

const colorMap = {
  green: "bg-green-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
};

export const Toast: React.FC<toasProps> = ({ color = "blue" }) => {
  const { showToast, mesaggeToast } = useLabSystemContext();
  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg transition-all duration-300 ease-in-out
        ${
          showToast
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-20 pointer-events-none"
        }
        ${colorMap[color]}
      `}
    >
      {mesaggeToast}
    </div>
  );
};
