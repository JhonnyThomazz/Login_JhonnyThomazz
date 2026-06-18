import type { Metadata } from "next";
import "./globals.css";
import "./components/navbar"

export const metadata: Metadata = {
  title: "Projeto login",
  description: "Criando um projeto que une Backend e Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        {children}
        </body>
    </html>
  );
}
