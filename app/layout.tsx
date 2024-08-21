"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import DocumentationDrawer from "@/components/DocumentationDrawer";
import DocumentationDrawerProvider from "@/context/DocumentationDrawerContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DocumentationDrawerProvider>
          {children}
          <DocumentationDrawer />
        </DocumentationDrawerProvider>
      </body>
    </html>
  );
}
