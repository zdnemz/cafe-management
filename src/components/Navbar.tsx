"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/auth-store";

const NAV_ITEMS = {
  GUEST: [
    { href: "/menu", label: "Menu" },
    { href: "/booking", label: "Booking" },
  ],
  CUSTOMER: [
    { href: "/menu", label: "Menu" },
    { href: "/booking", label: "Booking" },
    { href: "/orders", label: "Orders" },
  ],
  STAFF: [
    { href: "/staff/tables", label: "Tables" },
    { href: "/staff/orders", label: "Orders" },
  ],
  ADMIN: [
    { href: "/admin/users", label: "Users" },
    { href: "/admin/menus", label: "Menus" },
    { href: "/admin/bookings", label: "Bookings" },
    { href: "/admin/orders", label: "Orders" },
  ],
};

export default function Navbar() {
  const { isAuthenticated, user } = useAuthStore();

  const role = user?.role || "GUEST";

  const navItems =
    role === "ADMIN"
      ? NAV_ITEMS.ADMIN
      : role === "STAFF"
        ? NAV_ITEMS.STAFF
        : isAuthenticated
          ? NAV_ITEMS.CUSTOMER
          : NAV_ITEMS.GUEST;

  const authButton = !isAuthenticated
    ? { href: "/auth/login", label: "Login" }
    : role === "ADMIN"
      ? { href: "/admin/dashboard", label: "Dashboard" }
      : role === "STAFF"
        ? { href: "/staff/dashboard", label: "Dashboard" }
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
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
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
