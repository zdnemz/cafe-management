"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/auth-store";

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <header
      className={cn(
        "sticky top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-3 transition-all duration-300 md:px-12",
      )}
    >
      {/* Logo */}
      <div>
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold">EduVerse</span>
        </Link>
      </div>

      {/* Auth Button */}
      {!isAuthenticated ? (
        <Button asChild>
          <Link href="/auth/login">
            <span className="font-semibold">Login</span>
          </Link>
        </Button>
      ) : (
        <Button>
          <span className="font-semibold">Login</span>
        </Button>
      )}
    </header>
  );
}
