"use client";

import { useRequireAuth, useRequireGuest } from "@/hooks/useAuth";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeftCircle } from "lucide-react";

export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  redirectTo: string = "/auth/login",
  roles?: string[],
) => {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isInitialized, user } = useRequireAuth(redirectTo);

    if (!isInitialized) {
      return <Loading />;
    }

    if (roles && (!user?.role || !roles.includes(user.role))) {
      return (
        <div className="flex min-h-screen w-full items-center justify-center text-center">
          <div className="space-y-3">
            <h1 className="text-xl font-semibold">
              You do not have permission to view this page.
            </h1>
            <Button asChild>
              <Link href="/">
                <ChevronLeftCircle />
                <span>Back to Home</span>
              </Link>
            </Button>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
};

export const withGuest = <P extends object>(
  Component: React.ComponentType<P>,
  redirectTo: string = "/",
) => {
  return function GuestComponent(props: P) {
    const { isAuthenticated, isInitialized } = useRequireGuest(redirectTo);

    if (!isInitialized) {
      return <Loading />;
    }

    if (isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
};
