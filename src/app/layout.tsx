import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import AsideWrapper from "@/components/aside/AsideWrapper";
import Topbar from "@/components/topbar";

import LabSystemProvider from "@/context/LabContext";
import OnlineStatus from "@/utils/OnlineStatus";

import { Toast } from "@/components/atomics/Toast";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lab Patient System",
  description: "Sistema de gestión de laboratorio clínico y pacientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("🎨 [RootLayout] Rendered");

  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <LabSystemProvider>
          <OnlineStatus>
            <div className="flex h-dvh w-full overflow-hidden bg-background">
              <Toast
                message="Paciente agregado con éxito!"
                color="green"
                visible={false}
              />

              {/* Sidebar */}
              <AsideWrapper />

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col">
                {/* Topbar */}
                <Topbar />

                {/* Main */}
                <main className="flex-1 overflow-y-auto">
                  <div className="mx-auto flex w-full max-w-full flex-col h-full">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </OnlineStatus>
        </LabSystemProvider>
      </body>
    </html>
  );
}
