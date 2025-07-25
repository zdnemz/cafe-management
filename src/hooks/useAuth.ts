"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useAuthStore } from "@/store/auth-store";
import { getCurrentUser } from "@/app/actions/auth";

export const useAuthCheck = () => {
  const { setUser, clearUser, setLoading, setInitialized } = useAuthStore();

  React.useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);

        const user = await getCurrentUser();
        if (user) {
          setUser(user);
        } else {
          clearUser();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        clearUser();
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    checkAuthStatus();
  }, [setUser, clearUser, setLoading, setInitialized]);
};

export const useRequireAuth = (redirectTo: string = "/auth/login") => {
  const { isAuthenticated, isInitialized, user } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isInitialized, router, redirectTo]);

  return { isAuthenticated, isInitialized, user };
};

export const useRequireGuest = (redirectTo: string = "/") => {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isInitialized, router, redirectTo]);

  return { isAuthenticated, isInitialized };
};
