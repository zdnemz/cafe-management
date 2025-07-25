"use client";

import Footer from "@/components/Footer";
import RootLayout from "@/components/layouts/RootLayout";
import Navbar from "@/components/Navbar";
import { withAuth } from "@/hoc/withAuth";
import { useAuthStore } from "@/store/auth-store";
import * as React from "react";

export default withAuth(function () {
  const { user } = useAuthStore();

  return (
    <RootLayout header={<Navbar />} footer={<Footer />}>
      <section>
        <h1 className="text-2xl font-semibold">
          Hello, {user?.name || "There"}
        </h1>
        {user?.role === "admin" && (
          <div>
            <p>Admin-only content visible</p>
          </div>
        )}
      </section>
    </RootLayout>
  );
});
