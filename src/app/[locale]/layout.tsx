import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ptBR } from '@clerk/localizations'
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from '@/components/Model-provider'
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import { CrispProvider } from "@/components/Crisp-provider";
import { ThemeProvider } from "@/components/Theme-provider"
import { NextIntlClientProvider } from 'next-intl'
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindMerge",
  description: "Ai plataform",
};

interface IRootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}


export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<IRootLayoutProps>) {
  let messages = (await import(`../../../messages/${locale}.json`)).default
  return (
    <ClerkProvider localization={locale === 'pt' ? ptBR : undefined}>
      <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang="pt-BR">
        <Head>
          <link rel="icon" href="/brand/brand.png" />
        </Head>
        <CrispProvider />
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
          >
            <ModalProvider />
            {children}
            <Toaster />
          </ThemeProvider>
          </body>
      </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
