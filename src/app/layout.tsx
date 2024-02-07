import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ptBR } from '@clerk/localizations'
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from '@/components/Model-provider'
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import { CrispProvider } from "@/components/Crisp-provider";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindMerge",
  description: "Ai plataform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          {children}
          <Toaster />
          </body>
      </html>
    </ClerkProvider>
  );
}
