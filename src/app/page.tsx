import RootLayout from "@/components/layouts/RootLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <RootLayout>
      <section>
        <h1>Hello World</h1>
        <Button asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      </section>
    </RootLayout>
  );
}
