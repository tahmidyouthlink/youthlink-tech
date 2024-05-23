"use client";
import { AuthContext } from "@/utils/Provider/AuthProvider";
import { useContext } from "react";

export default function useAuth() {
  const authInfo = useContext(AuthContext);
  return authInfo;
}
