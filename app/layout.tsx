"use client";

import { Inter } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import DocumentationDrawerProvider from "@/context/DocumentationDrawerContext";
import DocumentationDrawer from "@/composables/DocumentationDrawer";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { useApolloClient } from "@/hooks/useApolloClient";
import AuthenticatedApolloProvider from "@/context/AuthenticatedApolloProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AuthenticatedApolloProvider>
            <DocumentationDrawerProvider>
              {children}
              <DocumentationDrawer />
            </DocumentationDrawerProvider>
          </AuthenticatedApolloProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
