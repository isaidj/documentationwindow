"use client";
import { ReactNode } from "react";

import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Admin Area</h1>
      {children}
    </div>
  );
}
