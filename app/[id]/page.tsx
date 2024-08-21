"use client";
import { usePathname } from "next/navigation";
import React from "react";

const RouteDynamic = () => {
  const pathname = usePathname();
  return <h1>{pathname}</h1>;
};

export default RouteDynamic;
