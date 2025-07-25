"use client";

import { useAuthCheck } from "@/hooks/useAuth";

export default function AuthInitializer() {
  useAuthCheck();

  return null;
}
