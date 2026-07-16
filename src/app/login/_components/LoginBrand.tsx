import React from "react";
import { FlaskConical, Shield } from "lucide-react";

const LoginBrand = () => {
  return (
    <div className="relative hidden md:flex md:w-[40%] h-full flex-col overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80')",
        }}
      />

      {/* Overlay institucional */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950/95 via-primary-900/90 to-primary-800/85" />

      {/* Curva elegante hacia la derecha */}
      <div className="absolute -right-1 top-0 h-full w-24 bg-background" style={{
        clipPath: "ellipse(100% 50% at 100% 50%)",
      }} />

      {/* Contenido institucional */}
      <div className="relative z-10 flex flex-col h-full px-10 py-12">
        {/* Logo + nombre */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-500 shadow-lg">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white tracking-wide leading-none">
              LABSYSTEM
            </span>
            <span className="text-[10px] text-primary-300 tracking-widest uppercase leading-none mt-0.5">
              Gestión de Laboratorio
            </span>
          </div>
        </div>

        {/* Tagline central */}
        <div className="flex flex-col flex-1 justify-center gap-6">
          <div>
            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight tracking-tight">
              Sistema Integral
              <br />
              <span className="text-primary-300">de Laboratorio</span>
            </h1>
            <p className="mt-4 text-sm text-primary-200/80 leading-relaxed max-w-xs">
              Gestiona pacientes, estudios, resultados y personal desde
              una plataforma segura y centralizada.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-col gap-2">
            {["Gestión de pacientes", "Resultados en tiempo real", "Control de personal"].map(
              (feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs text-primary-100/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                  {feat}
                </div>
              )
            )}
          </div>
        </div>

        {/* Footer institucional */}
        <div className="flex items-start gap-2 text-xs text-primary-300/60 max-w-xs">
          <Shield className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary-400/70" />
          <span>
            Sistema seguro y confiable para la gestión integral del laboratorio.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginBrand;
