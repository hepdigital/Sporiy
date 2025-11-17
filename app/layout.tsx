import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConditionalLayout } from "@/components/conditional-layout";
import { DevAuthToggle } from "@/components/dev-auth-toggle";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sporiy - Su Sporları Platformu",
  description: "Spor kulüpleri, eğitmenler ve sporcuları bir araya getiren profesyonel platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <DevAuthToggle />
      </body>
    </html>
  );
}
