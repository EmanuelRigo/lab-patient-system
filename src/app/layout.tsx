import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Aside from "@/components/Aside";
import "./globals.css";
import LabSystemProvider from "@/context/LabContext";

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
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh w-full flex`}
        style={{
          backgroundImage: "url('/images/image4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <LabSystemProvider>
          <div className="h-full w-3/6 bg-neutral-100 p-4 text-black min-w-[480px]">
            {" "}
            {children}
          </div>

          <Aside />
        </LabSystemProvider>
      </body>
    </html>
  );
}
