"use client";

import { ReactNode } from "react";
import { useLabSystemContext } from "@/context/LabContext";
import { Role } from "../../../types/frontend.types";

type RoleWrapperProps = {
  allowedRoles: Role[];
  children: ReactNode;
};

const RoleWrapper = ({ allowedRoles, children }: RoleWrapperProps) => {
  const { role } = useLabSystemContext();

  if (!allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
};

export default RoleWrapper;
