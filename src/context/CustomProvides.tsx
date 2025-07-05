"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { MedicalStudy } from "../../types/medicalStudy.types";

interface CustomContextProps {
  //   updateCardMovie: (movie: Movie) => void;
  medicalStudiesList: MedicalStudy[];
  setMedicalStudiesList: (medicalStudy: MedicalStudy[]) => void;
}

export const context = createContext<CustomContextProps | undefined>(undefined);

export const useCart = () => {
  const contextValue = useContext(context);

  if (!contextValue) {
    throw new Error("useCart debe ser usado dentro de un CustomProvider");
  }

  return contextValue;
};

interface CustomProviderProps {
  children: ReactNode;
}

const CustomProvider = ({ children }: CustomProviderProps) => {
  const [medicalStudiesList, setMedicalStudiesList] = useState<MedicalStudy[]>(
    []
  );

  const contextValue = { medicalStudiesList, setMedicalStudiesList };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default CustomProvider;
