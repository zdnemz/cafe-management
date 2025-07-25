"use client";

import RootLayout from "@/components/layouts/RootLayout";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/auth-store";
import * as React from "react";

export default function Users() {
  const { user } = useAuthStore();

  return (
    <RootLayout header={<Navbar />}>
      <section>
        <h1 className="text-2xl font-semibold">Hello, Admin {user!.name}</h1>
        <div>
          <p>Admin-only content visible</p>
        </div>
      </section>
    </RootLayout>
  );
}
