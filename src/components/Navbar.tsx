"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/auth-store";

const NAV_ITEMS = [
  { href: "/menu", label: "Menu", authRequired: false },
  { href: "/booking", label: "Booking", authRequired: false },
  { href: "/orders", label: "Orders", authRequired: true },
];

export default function Navbar() {
  const { isAuthenticated, user } = useAuthStore();

  const authButton = !isAuthenticated
    ? { href: "/auth/login", label: "Login" }
    : user?.role === "admin"
      ? { href: "/dashboard", label: "Dashboard" }
      : { href: "/profile", label: "Profile" };

  return (
    <header
      className={cn(
        "bg-background/80 sticky top-0 z-50 flex w-full items-center justify-between border-b py-3 backdrop-blur-sm",
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold">CafeX</span>
      </Link>

      <nav>
        <ul className="flex items-center gap-4 text-sm font-medium">
          {NAV_ITEMS.map(
            (item) =>
              (!item.authRequired || isAuthenticated) && (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
          )}
        </ul>
      </nav>

      <Button asChild>
        <Link href={authButton.href}>
          <span className="font-semibold">{authButton.label}</span>
        </Link>
      </Button>
    </header>
  );
}
