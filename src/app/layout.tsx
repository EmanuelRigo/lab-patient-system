import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Aside from "@/components/aside/Aside";
import Topbar from "@/components/topbar";

import LabSystemProvider from "@/context/LabContext";
import OnlineStatus from "@/utils/OnlineStatus";

import { Toast } from "@/components/atomics/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lab Patient System",
  description: "Laboratory Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LabSystemProvider>
          <OnlineStatus>
            <div
              className="flex h-dvh w-full overflow-hidden
            bg-background
             
             "
            >
              <Toast
                message="Paciente agregado con éxito!"
                color="green"
                visible={false}
              />

              {/* Sidebar */}
              <Aside />

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col">
                {/* Topbar */}
                <Topbar />

                {/* Main */}
                <main className="flex-1 overflow-y-auto ">
                  <div className="mx-auto flex w-full max-w-full flex-col ">
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
