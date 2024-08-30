"use client";

import { Inter } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import DocumentationDrawerProvider from "@/context/DocumentationDrawerContext";
import DocumentationDrawer from "@/composables/DocumentationDrawer";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { useApolloClient } from "@/hooks/useApolloClient";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = useApolloClient();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ApolloProvider client={client}>
            <DocumentationDrawerProvider>
              {children}
              <DocumentationDrawer />
            </DocumentationDrawerProvider>
          </ApolloProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
