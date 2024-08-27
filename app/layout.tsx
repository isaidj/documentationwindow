"use client";

import { Inter } from "next/font/google";

import DocumentationDrawerProvider from "@/context/DocumentationDrawerContext";
import DocumentationDrawer from "@/composables/DocumentationDrawer";
import "./globals.css";

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
