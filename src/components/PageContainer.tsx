"use client";

import React from "react";

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  return (
    <div className="h-full relative flex flex-col items-center justify-center mx-auto overflow-hidden rounded-4xl opacity-0 animate-fade-in">
      {/* Título fijo */}
      <div className="w-full flex flex-col items-center pt-10 mb-8 z-10">
        <h1 className="text-2xl 2xl:text-4xl font-bold text-sky-100/70 absolute top-16 2xl:top-40">
          {title}
        </h1>
      </div>

      {/* Contenido principal con fondo neutro */}
      <div className="2xl:w-3/4 mx-auto bg-red-700  max-h-3/4 2xl:max-h-2/4">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
