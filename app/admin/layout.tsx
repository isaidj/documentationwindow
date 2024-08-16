"use client";
import DocumentationDrawer from "@/components/DocumentationDrawer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const currentPath = usePathname();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav className="my-8 bg-white dark:bg-neutral-900/30 rounded-xl p-4 shadow-lg dark:shadow-2xl">
        <ul className="flex space-x-6 text-lg font-semibold">
          <li>
            <Link
              href="/"
              className={`text-red-400 hover:text-red-600 transition-colors ${
                currentPath === "/" ? "underline" : ""
              }`}
            >
              Back
            </Link>
          </li>
          <li>
            <Link
              href="/admin"
              className={`text-blue-600 hover:text-blue-800 transition-colors ${
                currentPath === "/admin" ? "underline" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/admin/prueba"
              className={`text-blue-600 hover:text-blue-800 transition-colors ${
                currentPath === "/admin/prueba" ? "underline" : ""
              }`}
            >
              Prueba
            </Link>
          </li>
          <li>
            <Link
              href="/admin/started"
              className={`text-blue-600 hover:text-blue-800 transition-colors ${
                currentPath === "/admin/started" ? "underline" : ""
              }`}
            >
              Getting Started
            </Link>
          </li>
        </ul>
      </nav>
      {children}
      <DocumentationDrawer />
    </div>
  );
};

export default layout;
