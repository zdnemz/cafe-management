"use client";
"use client";
import Footer from "@/components/Footer";
import RootLayout from "@/components/layouts/RootLayout";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <RootLayout header={<Navbar />} footer={<Footer />}>
      <section>
        <h1>Hello World</h1>
        {!isAuthenticated ? (
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/admin/dashboard">Dashboard</Link>
          </Button>
        )}
      </section>
    </RootLayout>
  );
}
